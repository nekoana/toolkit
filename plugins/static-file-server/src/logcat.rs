use tauri::{AppHandle, Manager, Runtime};
use tower::{Layer, Service};

pub(crate) trait Logcat {
    fn log(&self, message: impl AsRef<str>);
}

pub(crate) struct HttpLogcat<R: Runtime>(AppHandle<R>);

impl<R: Runtime> HttpLogcat<R> {
    pub(crate) fn new(app: AppHandle<R>) -> Self {
        Self(app)
    }
}

impl<R: Runtime> Logcat for HttpLogcat<R> {
    fn log(&self, message: impl AsRef<str>) {
        let _ = self.0.emit("static-file-server://logcat", message.as_ref());
    }
}

impl<R:Runtime> Clone for HttpLogcat<R> {
    fn clone(&self) -> Self {
        Self(self.0.clone())
    }
}

unsafe impl<R: Runtime> Send for HttpLogcat<R> {}

#[derive(Clone, Debug)]
pub(crate) struct HttpLogcatLayer<L>(L);

impl<L: Logcat + Send + Clone> HttpLogcatLayer<L> {
    pub fn new(logcat: L) -> Self {
        Self(logcat)
    }
}

impl<S, L> Layer<S> for HttpLogcatLayer<L>
where
    L: Clone + Send + 'static,
{
    type Service = HttpLogcatService<S, L>;

    fn layer(&self, service: S) -> Self::Service {
        HttpLogcatService(service, self.0.clone())
    }
}

#[derive(Clone, Debug)]
pub(crate) struct HttpLogcatService<S, L>(S, L);

impl<S, L, Request> Service<Request> for HttpLogcatService<S, L>
where
    S: Service<Request>,
    L: Logcat + Clone + Send + 'static,
    Request: std::fmt::Debug,
{
    type Response = S::Response;
    type Error = S::Error;
    type Future = S::Future;

    fn poll_ready(
        &mut self,
        cx: &mut std::task::Context<'_>,
    ) -> std::task::Poll<Result<(), Self::Error>> {
        self.0.poll_ready(cx)
    }

    fn call(&mut self, req: Request) -> Self::Future {
        self.1.log(format!("{:?}", req));

        self.0.call(req)
    }
}
