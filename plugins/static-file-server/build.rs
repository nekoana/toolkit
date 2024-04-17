const COMMANDS: &[&str] = &["listen", "close"];

fn main() {
  tauri_plugin::Builder::new(COMMANDS)
    .build();
}
