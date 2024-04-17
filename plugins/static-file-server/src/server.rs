use std::fmt::{Display, Formatter};
use std::path::{Path, PathBuf};

use axum::{
    extract::{OriginalUri, State},
    response::IntoResponse,
    Router,
    routing::get,
};
use axum::response::Html;
use tokio::net::TcpListener;
use tokio::sync::{Mutex, oneshot};
use tower_http::{services::ServeDir, trace::TraceLayer};
use tracing::debug;
use tracing_subscriber::layer::SubscriberExt;
use tracing_subscriber::util::SubscriberInitExt;

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


impl Drop for StaticFileServer {
    fn drop(&mut self) {
        let _ = self.shutdown();
    }
}

impl StaticFileServer {
    pub fn new(path: impl AsRef<Path>, port: u16) -> Result<Self, std::io::Error> {
        Ok(Self {
            path: path.as_ref().to_path_buf(),
            port,
            signal: Mutex::new(None),
        })
    }

    pub async fn start(&self) -> std::io::Result<()> {
        let (tx, rx) = oneshot::channel();

        let mut guard = self.signal.lock().await;
        guard.replace(tx);


        self.start_app(rx).await
    }

    pub async fn shutdown(&self) {
        let mut guard = self.signal.lock().await;
        if let Some(tx) = guard.take() {
            let _ = tx.send(());
        }
    }

    async fn start_app(&self, signal: oneshot::Receiver<()>) -> std::io::Result<()> {
        let _ = tracing_subscriber::registry()
            .with(
                tracing_subscriber::EnvFilter::try_from_default_env()
                    .unwrap_or_else(|_| "static-file-server-lib=debug,tower_http=debug".into()),
            )
            .with(tracing_subscriber::fmt::layer())
            .try_init();

        debug!(name:"start_app",path = ?self.path, port = self.port);

        let app = Router::new()
            .fallback(get(Self::root_handler))
            .with_state(self.path.clone())
            .nest_service("/static", ServeDir::new(self.path.clone()))
            .layer(TraceLayer::new_for_http());

        let listener = TcpListener::bind(format!("0.0.0.0:{}", self.port)).await?;

        axum::serve(listener, app)
            .with_graceful_shutdown(async { signal.await.unwrap_or_default() })
            .await?;

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

#[cfg(test)]
mod test {
    #[tokio::test]
    async fn test_file_server() {
        let server = super::StaticFileServer::new("../", 8000).unwrap();
        server.start().await.unwrap();
    }
}
