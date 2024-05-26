import { listen as tauriListen } from "@tauri-apps/api/event";
import { close, listen, read, stop, write } from "tauri-plugin-tcp-server-api";

export class TcpServerService {
  private connections: Set<string>;
  private readonly port: string;
  private readonly onConnection: (addr: string) => void;
  private unListen: (() => void) | undefined;

  constructor(port: string, onConnection: (addr: string) => void) {
    this.port = port;
    this.onConnection = onConnection;
    this.connections = new Set();

    this.listenEvents().then((r) => r);
  }

  private async listenEvents() {
    this.unListen = await tauriListen<string>(
      "tcp-server://on-connect",
      (event) => {
        this.connections.add(event.payload);
        this.onConnection(event.payload);
      },
    );
  }

  async listen() {
    console.log("Listening on port: ", this.port);
    await listen(this.port);
  }

  async stop() {
    await stop();
    if (this.unListen) {
      this.unListen();
    }

    this.connections.clear();
  }

  async write(addr: string, data: Uint8Array) {
    if (!this.connections.has(addr)) {
      throw new Error(`Connection not found: ${addr}`);
    }
    await write(addr, data);
  }

  async read(addr: string, size: number, timeout: number | undefined) {
    if (!this.connections.has(addr)) {
      throw new Error(`Connection not found: ${addr}`);
    }

    if (!timeout) {
      timeout = 10;
    }

    return await read(addr, size, timeout);
  }

  async close(addr: string) {
    if (!this.connections.has(addr)) {
      throw new Error(`Connection not found: ${addr}`);
    }
    await close(addr);
  }

  static new(port: string, onConnection: (addr: string) => void) {
    return new TcpServerService(port, onConnection);
  }
}
