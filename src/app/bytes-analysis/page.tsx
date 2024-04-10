"use client";

import { MdOutlinedTextField } from "@/wrapper/text-field";
import React, { useEffect, useMemo, useState } from "react";
import { editor } from "monaco-editor";
import Editor, { loader, Monaco } from "@monaco-editor/react";
import { MdFilledIconButton, MdIconButton } from "@/wrapper/icon-button";
import { MdIcon } from "@/wrapper/icon";
import Image from "next/image";
import { functionTemplate } from "./function-template";
import { MdDialog } from "@/wrapper/labs/dialog";
import { register, unregister } from "@tauri-apps/plugin-global-shortcut";
import { jetBrains } from "../localfonts";

function AnalysisJsEditor({
  onEditorDidMount,
}: {
  // eslint-disable-next-line no-unused-vars
  readonly onEditorDidMount: (editor: editor.IStandaloneCodeEditor) => void;
}) {
  loader.config({ paths: { vs: "/vs" } });

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

    onEditorDidMount(editor);
  };

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

function AnalysisFeedback({
  analyzeFun,
  analyzeHex,
  showFeedback,
  onCloseFeedback,
}: {
  // eslint-disable-next-line no-unused-vars
  analyzeFun: (data: Blob) => Promise<string[]>;
  analyzeHex: string;
  showFeedback: boolean;
  onCloseFeedback: () => void;
}) {
  const [feedback, setFeedback] = useState<string[]>([]);

  const handleFeedbackClose = () => {
    onCloseFeedback();
  };

  const handleAnalyze = async () => {
    try {
      // eslint-disable-next-line no-unused-vars
      const analyze = analyzeFun;

      if (!analyze) {
        throw new Error("Invalid analyze function");
      }

      const hex = analyzeHex.replace(/\s/g, "");

      if (hex.length % 2 !== 0) {
        throw new Error(
          "Invalid hex content length, must be even number of characters",
        );
      }

      const array = hex.match(/.{1,2}/g);
      if (array === null) {
        throw new Error(
          "Invalid hex content, only contains whitespace or hex characters",
        );
      }

      const bs = new Uint8Array(array.map((x) => parseInt(x, 16)));

      const data = new Blob([bs], { type: "application/octet-stream" });

      const result = await analyze(data);
      if (!result) {
        throw new Error("Invalid analyze function");
      }
      setFeedback(result);
    } catch (error) {
      const e = error as Error;
      setFeedback(["Failed to analyze hex content:", e.message]);
    }
  };

  useEffect(() => {
    handleAnalyze();
  }, [analyzeFun, analyzeHex]);

  return (
    <MdDialog
      className="w-[80%] h-[80%]"
      open={showFeedback}
      onClose={handleFeedbackClose}
    >
      <span slot="headline">
        <span className="flex-1">Feedback</span>
        <MdIconButton value="close" type="submit" onClick={handleFeedbackClose}>
          <MdIcon>
            <Image src="/close.svg" width={24} height={24} alt="Close" />
          </MdIcon>
        </MdIconButton>
      </span>
      <div slot="content" className="flex flex-col items-center">
        <div>
          {feedback && feedback.map((line, index) => <p key={index}>{line}</p>)}
        </div>
      </div>
    </MdDialog>
  );
}

export default function BytesAnalysis() {
  const [analyzeHex, setAnalyzeHex] = useState<string>("");
  const [showDialog, setShowDialog] = useState(false);
  const [analyzeCode, setAnalyzeCode] = useState<string>("");

  const editorRef = React.useRef<editor.IStandaloneCodeEditor>();

  const analyzeFun = useMemo(() => {
    try {
      // eslint-disable-next-line no-unused-vars
      return eval(`(${analyzeCode})`) as (data: Blob) => Promise<string[]>;
    } catch (error) {
      return function () {
        throw new Error("Invalid analyze function");
      };
    }
  }, [analyzeCode]);

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

  const handleRunAnalyze = () => {
    setAnalyzeCode(editorRef.current?.getValue() ?? "");

    setShowDialog(true);
  };

  return (
    <div className="container p-12 h-screen overflow-y-scroll flex flex-col content-center items-center gap-y-[16px]">
      <MdOutlinedTextField
        label="Hex Content"
        className="w-full h-16"
        id="content"
        onInput={(e) => {
          const target = e.target as HTMLInputElement;

          setAnalyzeHex(target.value);
        }}
        value={analyzeHex}
      />

      <AnalysisJsEditor
        onEditorDidMount={(editor) => {
          editorRef.current = editor;
        }}
      />

      <MdFilledIconButton className="w-24 h-12" onClick={handleRunAnalyze}>
        <MdIcon>
          <Image
            src="/play-arrow.svg"
            width={28}
            height={28}
            alt="Go Forward"
          />
        </MdIcon>
      </MdFilledIconButton>

      <AnalysisFeedback
        analyzeFun={analyzeFun}
        analyzeHex={analyzeHex}
        showFeedback={showDialog}
        onCloseFeedback={() => setShowDialog(false)}
      />
    </div>
  );
}
