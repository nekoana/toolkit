use tauri::{
    Manager,
    plugin::{Builder, TauriPlugin}, Runtime,
};
use tokio::runtime::Handle;
use tokio::sync::Mutex;

pub use error::{Error, Result};

use crate::tcp_server::TcpServer;

mod commands;
mod error;
mod tcp_server;
mod on_connect;

struct TcpServerState(Mutex<TcpServer>);

impl Drop for TcpServerState {
    fn drop(&mut self) {
        Handle::current().block_on(async {
            let mut server = self.0.lock().await;

            let _ = server.stop().await;
        });
    }
}


/// Initializes the plugin.
pub fn init<R: Runtime>() -> TauriPlugin<R> {
    Builder::new("tcp-server")
        .invoke_handler(tauri::generate_handler![commands::listen,commands::stop,commands::write,commands::read,commands::close])
        .setup(|app, _api| {
            // manage state so it is accessible by the commands
            app.manage(TcpServerState(Mutex::new(TcpServer::new())));
            Ok(())
        })
        .build()
}
