use serde::de::DeserializeOwned;
use tauri::{plugin::PluginApi, AppHandle, Runtime};

use crate::models::*;

pub fn init<R: Runtime, C: DeserializeOwned>(
  app: &AppHandle<R>,
  _api: PluginApi<R, C>,
) -> crate::Result<TcpClient<R>> {
  Ok(TcpClient(app.clone()))
}

/// Access to the tcp-client APIs.
pub struct TcpClient<R: Runtime>(AppHandle<R>);

impl<R: Runtime> TcpClient<R> {
  pub fn ping(&self, payload: PingRequest) -> crate::Result<PingResponse> {
    Ok(PingResponse {
      value: payload.value,
    })
  }
}
