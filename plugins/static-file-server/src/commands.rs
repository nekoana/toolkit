use tauri::{command, AppHandle, Runtime, State, Window};

use crate::logcat::HttpLogcat;
use crate::server::StaticFileServer;
use crate::{Result, StaticFileServerState};

#[command]
pub(crate) async fn start<R: Runtime>(
    app: AppHandle<R>,
    _window: Window<R>,
    state: State<'_, StaticFileServerState>,
    path: String,
    port: String,
) -> Result<()> {
    let port = port.parse::<u16>().expect("Invalid port");

    let key = format!("{}:{}", path, port);

    println!("Starting server: {}", key);

    // Check if the server is already running
    let mut servers = state.0.lock().await;

    if servers.contains_key(&key) {
        return Ok(());
    }

    let logcat = HttpLogcat::new(app);

    let server = StaticFileServer::new(&path, port)?;

    server.start(logcat).await?;

    servers.insert(key.clone(), server);

    Ok(())
}

#[command]
pub(crate) async fn close<R: Runtime>(
    _app: AppHandle<R>,
    _window: Window<R>,
    state: State<'_, StaticFileServerState>,
    path: String,
    port: String,
) -> Result<()> {
    let port = port.parse::<u16>().expect("Invalid port");

    let key = format!("{}:{}", path, port);

    println!("Closing server: {}", key);

    let mut servers = state.0.lock().await;

    if let Some(server) = servers.remove(&key) {
        server.shutdown().await;
    }

    Ok(())
}
