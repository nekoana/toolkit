use tauri::{AppHandle, Manager, Runtime};

pub(crate) trait OnConnect: Send + Sync + Clone + 'static {
    fn on_connect(&self, client: &str);
}


#[derive(Clone, Debug)]
pub(crate) struct OnConnectHandler<R> (R);

impl<R> OnConnectHandler<R> {
    pub(crate) fn new(r: R) -> Self {
        Self(r)
    }
}

impl<F> OnConnect for F
    where
        F: Fn(&str) + Send + Sync + Clone + 'static,
{
    fn on_connect(&self, client: &str) {
        self(client);
    }
}

impl<R: Runtime> OnConnect for OnConnectHandler<AppHandle<R>> {
    fn on_connect(&self, client: &str) {
        let _ = self.0.emit("tcp-server://on-connect", client);
    }
}