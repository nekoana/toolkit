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
  analyzeFun?: (data: Blob) => Promise<string[]>;
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
          "Invalid hex contentm, only contains whitespace or no content",
        );
      }

      const bs = new Uint8Array(array.map((x) => parseInt(x, 16)));

      const data = new Blob([bs], { type: "application/octet-stream" });

      const result = await analyze(data);
      // Log the result
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
    <MdDialog open={showFeedback} onClose={handleFeedbackClose}>
      <span slot="headline">
        <span className="flex-1">Dialog Title</span>
        <MdIconButton value="close" type="submit" onClick={handleFeedbackClose}>
          <MdIcon>
            <Image src="/close.svg" width={24} height={24} alt="Close" />
          </MdIcon>
        </MdIconButton>
      </span>
      <form slot="content" method="dialog">
        {feedback && feedback.map((line, index) => <p key={index}>{line}</p>)}
      </form>
    </MdDialog>
  );
}

export default function BytesAnalysis() {
  const [analyzeHex, setAnalyzeHex] = useState<string>("");
  const [showDialog, setShowDialog] = useState(false);
  const [analyzeCode, setAnalyzeCode] = useState<string>("");

  const analyzeFun = useMemo(() => {
    try {
      // eslint-disable-next-line no-unused-vars
      return eval(`(${analyzeCode})`) as (data: Blob) => Promise<string[]>;
    } catch (error) {
      null;
    }
  }, [analyzeCode]);

  const editorRef = React.useRef<editor.IStandaloneCodeEditor>();

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
