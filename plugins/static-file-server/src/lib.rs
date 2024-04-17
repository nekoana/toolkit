use std::{collections::HashMap};

use tauri::{
    Manager,
    plugin::{Builder, TauriPlugin}, Runtime,
};
use tauri::async_runtime::Mutex;

pub use error::{Error, Result};
use crate::server::StaticFileServer;

mod commands;
mod server;
mod error;

#[derive(Default)]
struct StaticFileServerState(Mutex<HashMap<String, StaticFileServer>>);

/// Initializes the plugin.
pub fn init<R: Runtime>() -> TauriPlugin<R> {
    Builder::new("static-file-server")
        .invoke_handler(tauri::generate_handler![commands::listen])
        .setup(|app, _api| {
            // manage state so it is accessible by the commands
            app.manage(StaticFileServerState::default());

            Ok(())
        })
        .build()
}
