const COMMANDS: &[&str] = &["listen", "stop", "read", "write","close"];

fn main() {
    tauri_plugin::Builder::new(COMMANDS)
        .build();
}
