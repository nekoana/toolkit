use std::fmt::{Display, Formatter};
use std::path::{Path, PathBuf};

use axum::response::Html;
use axum::{
    extract::{OriginalUri, State},
    response::IntoResponse,
    routing::get,
    Router,
};
use tokio::net::TcpListener;
use tokio::spawn;
use tokio::sync::{oneshot, Mutex};
use tower_http::services::ServeDir;
use tracing::debug;

use crate::logcat::{HttpLogcatLayer, Logcat};

struct Uri(Vec<String>);

impl Uri {
    fn new() -> Self {
        Self(Vec::new())
    }

    fn push(&mut self, path: &str) -> &mut Self {
        //移除前后的斜杠
        let path = path.trim_start_matches('/').trim_end_matches('/');

        if !path.is_empty() {
            self.0.push(path.to_string());
        }

        self
    }
}

impl Display for Uri {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        write!(f, "/{}", self.0.join("/"))
    }
}

pub struct StaticFileServer {
    path: PathBuf,
    port: u16,
    signal: Mutex<Option<oneshot::Sender<()>>>,
}

impl StaticFileServer {
    pub fn new(path: impl AsRef<Path>, port: u16) -> Result<Self, std::io::Error> {
        Ok(Self {
            path: path.as_ref().to_path_buf(),
            port,
            signal: Mutex::new(None),
        })
    }

    pub async fn start(&self, logcat: impl Logcat + Clone + Send + 'static) -> std::io::Result<()> {
        let (tx, rx) = oneshot::channel();

        let mut guard = self.signal.lock().await;
        guard.replace(tx);

        self.start_app(rx, logcat).await
    }

    pub async fn shutdown(&self) {
        let mut guard = self.signal.lock().await;
        if let Some(tx) = guard.take() {
            if let Err(()) = tx.send(()) {
                eprintln!("shutdown error");
            }

            println!("talk to shutdown")
        }
    }

    async fn start_app(
        &self,
        signal: oneshot::Receiver<()>,
        logcat: impl Logcat + Clone + Send + 'static,
    ) -> std::io::Result<()> {
        let app = Router::new()
            .fallback(get(Self::root_handler))
            .with_state(self.path.clone())
            .nest_service("/static", ServeDir::new(self.path.clone()))
            .layer(HttpLogcatLayer::new(logcat));

        let listener = TcpListener::bind(format!("0.0.0.0:{}", self.port)).await?;

        let server = axum::serve(listener, app).with_graceful_shutdown(async {
            if let Err(_) = signal.await {
                eprintln!("shutdown error");
            }

            println!("shutdown received");
        });

        spawn(async move {
            if let Err(e) = server.await {
                eprintln!("server error: {}", e);
            }

            println!("server end");
        });

        Ok(())
    }

    async fn root_handler(
        State(parent): State<PathBuf>,
        OriginalUri(child): OriginalUri,
    ) -> impl IntoResponse {
        debug!(name:"root_handler",uri = ?child);

        let sub_path = child.path();

        debug!(name:"root_handler",sub_path = ?sub_path);

        let mut file_list = String::from("<ul>");

        if let Ok(files) = Self::load_files(parent, sub_path).await {
            for file in files {
                let name = match file.file_name() {
                    Some(name) => name.to_string_lossy(),
                    None => continue,
                };

                let mut uri = Uri::new();

                if file.is_file() {
                    uri.push("static");
                }

                uri.push(sub_path).push(&name);

                file_list.push_str(&format!("<li><a href=\"{}\">{}</a></li>", uri, name));
            }
        }

        file_list.push_str("</ul>");

        Html(file_list)
    }

    async fn load_files(
        parent: impl AsRef<Path>,
        child: impl AsRef<Path>,
    ) -> std::io::Result<Vec<PathBuf>> {
        let mut files = Vec::new();

        let path = parent
            .as_ref()
            .join(child.as_ref().strip_prefix("/").unwrap_or(&Path::new("")));

        let mut dir = tokio::fs::read_dir(path).await?;

        while let Some(entry) = dir.next_entry().await? {
            files.push(entry.path());
        }

        Ok(files)
    }
}
