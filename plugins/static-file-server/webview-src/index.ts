import { invoke } from "@tauri-apps/api/core";

// eslint-disable-next-line no-unused-vars
export async function start(path: string, port: string) {
  await invoke("plugin:static-file-server|start", { path, port });
}

export async function close(path: string, port: string) {
  await invoke("plugin:static-file-server|close", { path, port });
}
