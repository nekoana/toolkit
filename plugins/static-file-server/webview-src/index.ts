import { invoke } from "@tauri-apps/api/core";

// eslint-disable-next-line no-unused-vars
export async function listen(path: string, port: number) {
  await invoke("plugin:static-file-server|listen", { path, port });
}

export async function close(path: string, port: number) {
  await invoke("plugin:static-file-server|close", { path, port });
}
