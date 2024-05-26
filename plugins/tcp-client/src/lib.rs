use tauri::{
  plugin::{Builder, TauriPlugin},
  Manager, Runtime,
};

use std::{collections::HashMap, sync::Mutex};

pub use models::*;

#[cfg(desktop)]
mod desktop;
#[cfg(mobile)]
mod mobile;

mod commands;
mod error;
mod models;

pub use error::{Error, Result};

#[cfg(desktop)]
use desktop::TcpClient;
#[cfg(mobile)]
use mobile::TcpClient;

#[derive(Default)]
struct MyState(Mutex<HashMap<String, String>>);

/// Extensions to [`tauri::App`], [`tauri::AppHandle`] and [`tauri::Window`] to access the tcp-client APIs.
pub trait TcpClientExt<R: Runtime> {
  fn tcp_client(&self) -> &TcpClient<R>;
}

impl<R: Runtime, T: Manager<R>> crate::TcpClientExt<R> for T {
  fn tcp_client(&self) -> &TcpClient<R> {
    self.state::<TcpClient<R>>().inner()
  }
}

/// Initializes the plugin.
pub fn init<R: Runtime>() -> TauriPlugin<R> {
  Builder::new("tcp-client")
    .invoke_handler(tauri::generate_handler![commands::execute])
    .setup(|app, api| {
      #[cfg(mobile)]
      let tcp_client = mobile::init(app, api)?;
      #[cfg(desktop)]
      let tcp_client = desktop::init(app, api)?;
      app.manage(tcp_client);

      // manage state so it is accessible by the commands
      app.manage(MyState::default());
      Ok(())
    })
    .build()
}
