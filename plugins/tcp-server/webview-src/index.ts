import { invoke } from "@tauri-apps/api/core";

export async function listen(port: string) {
  await invoke("plugin:tcp-server|listen", { port });
}

export async function stop() {
  await invoke("plugin:tcp-server|stop");
}

export async function write(addr: string, data: Uint8Array) {
  await invoke("plugin:tcp-server|write", { addr, data });
}

export async function read(addr: string, size: number, timeout: number) {
  return await invoke("plugin:tcp-server|read", { addr, size, timeout });
}

export async function close(addr: string) {
  await invoke("plugin:tcp-server|close", { addr });
}
