use std::collections::HashMap;

use tauri::async_runtime::Mutex;
use tauri::{
    plugin::{Builder, TauriPlugin},
    Manager, Runtime,
};

use crate::server::StaticFileServer;
pub use error::{Error, Result};

mod commands;
mod error;
mod server;
mod logcat;

#[derive(Default)]
struct StaticFileServerState(Mutex<HashMap<String, StaticFileServer>>);

/// Initializes the plugin.
pub fn init<R: Runtime>() -> TauriPlugin<R> {
    Builder::new("static-file-server")
        .invoke_handler(tauri::generate_handler![commands::start,commands::close])
        .setup(|app, _api| {
            // manage state so it is accessible by the commands
            app.manage(StaticFileServerState::default());

            Ok(())
        })
        .build()
}
