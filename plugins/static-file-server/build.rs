const COMMANDS: &[&str] = &["start", "close"];

fn main() {
  tauri_plugin::Builder::new(COMMANDS)
    .build();
}
