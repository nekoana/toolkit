"use client";

import React from "react";
import { editor } from "monaco-editor";
import Editor, { loader, Monaco } from "@monaco-editor/react";
import { functionTemplate } from "./function-template";
import { register, unregister } from "@tauri-apps/plugin-global-shortcut";
import { jetBrains } from "../../localfonts";
import clsx from "clsx";

export default function AnalysisJsEditor({
  onEditorDidMount,
  className,
}: {
  // eslint-disable-next-line no-unused-vars
  readonly onEditorDidMount: (editor: editor.IStandaloneCodeEditor) => void;
  readonly className?: string | undefined;
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

    editor.onDidBlurEditorWidget(() => {
      unregisterShortcuts();
    });

    editor.onDidFocusEditorWidget(() => {
      registerShortcuts();
    });

    onEditorDidMount(editor);
  };

  const CmdOrCtrl_A = () => {
    const editor = editorRef.current;
    if (editor) {
      const range = editor.getModel()?.getFullModelRange();
      if (range) {
        editor.setSelection(range);
      }
    }
  };

  const CmdOrCtrl_Z = () => {
    editorRef.current?.trigger("undo", "undo", null);
  };

  const CmdOrCtrl_Y = () => {
    editorRef.current?.trigger("redo", "redo", null);
  };

  const CmdOrCtrl_D = () => {
    editorRef.current?.trigger("deleteRight", "deleteRight", null);
  };

  const registerShortcuts = async () => {
    await unregisterShortcuts();
    //set shortcut to select all text
    await register("CmdOrCtrl+A", CmdOrCtrl_A);

    //set shortcut to undo
    await register("CmdOrCtrl+Z", CmdOrCtrl_Z);

    //set shortcut to redo
    await register("CmdOrCtrl+Y", CmdOrCtrl_Y);

    //set shortcut to delete
    await register("CmdOrCtrl+D", CmdOrCtrl_D);
  };

  const unregisterShortcuts = async () => {
    await unregister("CmdOrCtrl+A");
    await unregister("CmdOrCtrl+Z");
    await unregister("CmdOrCtrl+Y");
    await unregister("CmdOrCtrl+D");
  };

  return (
    <div
      className={clsx(
        "w-full",
        "h-[58vh]",
        "overflow-hidden",
        "py-2",
        "transition",
        "shadow-[0px_0px_0px_1px_rgb(121,89,26)]",
        "hover:shadow-[0px_0px_0px_3px_rgb(121,89,26)]",
        "rounded",
        className,
      )}
    >
      <Editor
        onMount={handleEditorDidMount}
        defaultLanguage="javascript"
        defaultValue={functionTemplate}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: jetBrains.style.fontFamily,
          contextmenu: false,
          stickyScroll: {
            enabled: false,
          },
        }}
      />
    </div>
  );
}
