use std::time::Duration;

use tauri::{AppHandle, command, Runtime, State, Window};

use crate::{Error, Result};
use crate::on_connect::OnConnectHandler;
use crate::TcpServerState;

#[command]
pub(crate) async fn listen<R: Runtime>(
    app: AppHandle<R>,
    _window: Window<R>,
    state: State<'_, TcpServerState>,
    port: String,
) -> Result<()> {
    let port = port.parse::<u16>().map_err(|_| Error::InvalidPort)?;

    let mut state = state.0.lock().await;

    state.listen(port, OnConnectHandler::new(app.clone())).await?;

    Ok(())
}

#[command]
pub(crate) async fn stop<R: Runtime>(
    _app: AppHandle<R>,
    _window: Window<R>,
    state: State<'_, TcpServerState>,
) -> Result<()> {
    let mut state = state.0.lock().await;

    state.stop().await?;

    Ok(())
}

#[command]
pub(crate) async fn write<R: Runtime>(
    _app: AppHandle<R>,
    _window: Window<R>,
    state: State<'_, TcpServerState>,
    addr: &str,
    data: &[u8],
) -> Result<()> {
    let state = state.0.lock().await;

    state.write(addr, data).await?;

    Ok(())
}

#[command]
pub(crate) async fn read<R: Runtime>(
    _app: AppHandle<R>,
    _window: Window<R>,
    state: State<'_, TcpServerState>,
    addr: &str,
    size: usize,
    timeout: u64,
) -> Result<Vec<u8>> {
    let state = state.0.lock().await;

    let ret = state.read(addr, size, Duration::from_secs(timeout)).await?;

    Ok(ret)
}

#[command]
pub(crate) async fn close<R: Runtime>(
    _app: AppHandle<R>,
    _window: Window<R>,
    state: State<'_, TcpServerState>,
    addr: &str,
) -> Result<()> {
    let state = state.0.lock().await;

    state.close(addr).await?;

    Ok(())
}