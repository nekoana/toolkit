

function StaticFileServer() {
  return (
    <div>
      <h1>Static File Server</h1>
      <p>
        This is a simple static file server that serves files from the{' '}
        <code>public</code> directory.
      </p>
      <p>
        <a href="/public/hello.txt">/public/hello.txt</a>
      </p>
    </div>
  );
}

export default StaticFileServer;