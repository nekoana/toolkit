use tauri::{AppHandle, command, Runtime, State, Window};

use crate::{Result, StaticFileServerState};
use crate::server::StaticFileServer;

#[command]
pub(crate) async fn listen<R: Runtime>(
    _app: AppHandle<R>,
    _window: Window<R>,
    state: State<'_, StaticFileServerState>,
    path: String,
    port: u16,
) -> Result<()> {
    let key = format!("{}:{}", path, port);

    // Check if the server is already running
    let mut servers = state.0.lock().await;

    if servers.contains_key(&key) {
        return Ok(());
    }

    let server = StaticFileServer::new(&path, port)?;

    server.start().await?;

    servers.insert(key.clone(), server);

    Ok(())
}

#[command]
pub(crate) async fn close<R: Runtime>(
    _app: AppHandle<R>,
    _window: Window<R>,
    state: State<'_, StaticFileServerState>,
    path: String,
    port: u16,
) -> Result<()> {
    let key = format!("{}:{}", path, port);

    let mut servers = state.0.lock().await;

    if let Some(server) = servers.remove(&key) {
        server.shutdown().await;
    }

    Ok(())
}