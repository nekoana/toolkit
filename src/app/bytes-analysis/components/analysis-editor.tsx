"use client";

import React, { useEffect } from "react";
import { editor } from "monaco-editor";
import Editor, { loader, Monaco } from "@monaco-editor/react";
import { functionTemplate } from "./function-template";
import { register, unregister } from "@tauri-apps/plugin-global-shortcut";
import { jetBrains } from "../../localfonts";

export default function AnalysisJsEditor({
  onEditorDidMount,
}: {
  // eslint-disable-next-line no-unused-vars
  readonly onEditorDidMount: (editor: editor.IStandaloneCodeEditor) => void;
}) {
  loader.config({ paths: { vs: "/vs" } });

  const editorRef = React.useRef<editor.IStandaloneCodeEditor>();

  const handleEditorDidMount = (
    editor: editor.IStandaloneCodeEditor,
    monaco: Monaco,
  ) => {
    monaco.editor.defineTheme("BytesAnalysisTheme", {
      base: "vs",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#fff8f3",
      },
    });

    monaco.editor.setTheme("BytesAnalysisTheme");

    editorRef.current = editor;

    onEditorDidMount(editor);
  };

  useEffect(() => {
    //set shortcut to select all text
    register("CmdOrCtrl+A", () => {
      const editor = editorRef.current;
      if (editor) {
        const range = editor.getModel()?.getFullModelRange();
        if (range) {
          editor.setSelection(range);
        }
      }
    });

    //set shortcut to undo
    register("CmdOrCtrl+Z", () => {
      editorRef.current?.trigger("undo", "undo", null);
    });

    //set shortcut to redo
    register("CmdOrCtrl+Y", () => {
      editorRef.current?.trigger("redo", "redo", null);
    });

    //set shortcut to delete
    register("CmdOrCtrl+D", () => {
      editorRef.current?.trigger("deleteRight", "deleteRight", null);
    });

    // Unregister the shortcut when the component is unmounted
    return () => {
      unregister("CmdOrCtrl+A");
      unregister("CmdOrCtrl+Z");
      unregister("CmdOrCtrl+Y");
      unregister("CmdOrCtrl+D");
    };
  });

  return (
    <div className="w-full h-[58vh] overflow-hidden py-2 transition shadow-[0px_0px_0px_1px_rgb(121,89,26)] hover:shadow-[0px_0px_0px_3px_rgb(121,89,26)] rounded">
      <Editor
        onMount={handleEditorDidMount}
        defaultLanguage="javascript"
        defaultValue={functionTemplate}
        options={{
          minimap: { enabled: false },
          lineNumbers: "on",
          wordWrap: "on",
          scrollBeyondLastLine: false,
          automaticLayout: true,
          fontSize: 14,
          fontFamily: jetBrains.style.fontFamily,
          scrollbar: { vertical: "hidden", horizontal: "hidden" },
          contextmenu: false,
        }}
      />
    </div>
  );
}
