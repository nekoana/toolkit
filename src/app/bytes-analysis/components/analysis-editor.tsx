"use client";

import React from "react";
import { editor } from "monaco-editor";
import Editor, { loader, Monaco } from "@monaco-editor/react";
import { functionTemplate } from "./function-template";
import { register, unregister } from "@tauri-apps/plugin-global-shortcut";
import { jetBrains } from "../../localfonts";
import { fetch } from "@tauri-apps/plugin-http";
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

  // eslint-disable-next-line no-unused-vars
  function debounce(func: (...args: any[]) => void, wait: number) {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  const handleRemoteScriptUrl = debounce((uri: string) => {
    console.log("Fetching remote script", uri);
    fetch(uri)
      .then((response) => {
        if (response.ok) {
          response.text().then((text) => {
            editorRef.current?.setValue(text);
          });
        } else {
          editorRef.current?.setValue(
            `// Failed to fetch remote script, ${response.status}: ${uri}, ${response.statusText}`,
          );
        }
      })
      .catch((error) => {
        editorRef.current?.setValue(
          `// Failed to fetch remote script: ${uri}, ${error}`,
        );
      });
  }, 1000 * 2);

  const handleCursorPositionChange = debounce(
    (e: editor.ICursorPositionChangedEvent) => {
      if (e.position.lineNumber === 1) {
        const model = editorRef.current?.getModel();
        if (model) {
          const firstLine = model.getLineContent(1);
          const match = firstLine.match(/\/\/@remote:(.+)/);
          if (match) {
            handleRemoteScriptUrl(match[1]);
          }
        }
      }
    },
    500,
  ); // Wait for 500ms before executing the function

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
      unregisterShortcuts().then(() => console.log("Shortcuts unregistered"));
    });

    editor.onDidFocusEditorWidget(() => {
      registerShortcuts().then(() => console.log("Shortcuts registered"));
    });

    editor.onDidChangeCursorPosition(handleCursorPositionChange);

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
