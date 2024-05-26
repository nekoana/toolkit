use std::collections::HashMap;
use std::sync::Arc;
use std::time::Duration;

use tokio::io::{AsyncReadExt, AsyncWriteExt};
use tokio::net::{TcpListener, TcpStream};
use tokio::sync::Mutex;
use tokio::task::JoinHandle;
use tokio::time;

use crate::on_connect::OnConnect;

pub(crate) struct TcpServer {
    job: Option<JoinHandle<()>>,
    connections: Arc<Mutex<HashMap<String, TcpStream>>>,
}


impl TcpServer {
    pub(crate) fn new() -> Self {
        Self {
            job: None,
            connections: Arc::new(Mutex::new(HashMap::new())),
        }
    }

    pub(crate) async fn listen(&mut self, port: u16, on_connect: impl OnConnect) -> Result<(), std::io::Error> {
        let listener = TcpListener::bind(format!("0.0.0.0:{}", port)).await?;

        let job = self.accept_connections(listener, on_connect)?;

        self.job = Some(job);
        
        println!("Server started on port {}", port);

        Ok(())
    }

    pub(crate) async fn stop(&mut self) -> Result<(), std::io::Error> {
        if let Some(job) = self.job.take() {
            job.abort();
        }

        let mut connections = self.connections.lock().await;

        for (_, stream) in connections.iter_mut() {
            let _ = stream.shutdown();
        }

        connections.clear();
        
        println!("Server stopped");

        Ok(())
    }

    fn accept_connections(&mut self, listener: TcpListener, on_connect: impl OnConnect) -> Result<JoinHandle<()>, std::io::Error> {
        let connections = Arc::clone(&self.connections);
        let job = tokio::spawn(async move {
            while let Ok((stream, socket)) = listener.accept().await {
                let remote_addr = format!("{}:{}", socket.ip().to_string(), socket.port());

                let mut connections = connections.lock().await;

                if let Some(stream) = connections.get_mut(&remote_addr) {
                    let _ = stream.shutdown();
                }

                on_connect.on_connect(&remote_addr);

                connections.insert(remote_addr, stream);
            }
        });

        Ok(job)
    }


    pub(crate) async fn read(&self, remote_addr: &str, size: usize, timeout: Duration) -> Result<Vec<u8>, std::io::Error> {
        let mut connections = self.connections.lock().await;

        let stream = connections.get_mut(remote_addr).ok_or_else(|| std::io::Error::new(std::io::ErrorKind::NotFound, "Connection not found"))?;

        let mut buffer = vec![0; size];

        let read_future = stream.read(&mut buffer);

        match time::timeout(timeout, read_future).await {
            Ok(Ok(n)) => {
                buffer.truncate(n);
                Ok(buffer)
            }

            Ok(Err(e)) => Err(e),

            Err(_) => Err(std::io::Error::new(std::io::ErrorKind::TimedOut, "Read timed out")),
        }
    }

    pub(crate) async fn write(&self, remote_addr: &str, data: &[u8]) -> Result<(), std::io::Error> {
        let mut connections = self.connections.lock().await;

        let stream = connections.get_mut(remote_addr).ok_or_else(|| std::io::Error::new(std::io::ErrorKind::NotFound, "Connection not found"))?;

        stream.write_all(data).await?;

        Ok(())
    }

    pub(crate) async fn close(&self, remote_addr: &str) -> Result<(), std::io::Error> {
        let mut connections = self.connections.lock().await;

        let mut stream = connections.remove(remote_addr).ok_or_else(|| std::io::Error::new(std::io::ErrorKind::NotFound, "Connection not found"))?;

        let _ = stream.shutdown();

        Ok(())
    }
}

#[cfg(test)]
mod test {
    use tokio::time::sleep;

    use super::*;

    #[tokio::test]
    async fn test_tcp_server() -> Result<(), std::io::Error> {
        const HOST: &str = "127.0.0.1";

        let mut server = TcpServer::new();

        let data = b"Hello, world!";

        let on_connect = |client: &str| {
            assert_eq!(client, HOST)
        };

        server.listen(8080, on_connect).await?;

        let mut client = TcpStream::connect(format!("{HOST}:8080")).await?;

        client.write_all(data).await?;

        //delay to ensure the server has received the data
        sleep(Duration::from_secs(2)).await;

        let buffer = server.read(HOST, data.len(), Duration::from_secs(5)).await?;

        assert_eq!(buffer, data);

        Ok(())
    }
}