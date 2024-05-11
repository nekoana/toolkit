"use client";

import { MdOutlinedTextField } from "@/wrapper/text-field";
import React, { useMemo, useState } from "react";
import { editor } from "monaco-editor";
import { MdFilledIconButton } from "@/wrapper/icon-button";
import { MdIcon } from "@/wrapper/icon";
import Image from "next/image";
import JsEditor from "../../components/js-editor";
import AnalysisFeedback from "./components/analysis-feedback";
import { functionTemplate } from "@/app/bytes-analysis/components/function-template";

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

  const handleRunAnalyze = () => {
    setAnalyzeCode(editorRef.current?.getValue() ?? "");

    setShowDialog(true);
  };

  return (
    <div className="h-full w-full flex flex-col content-center items-center gap-y-[16px] px-2">
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

      <JsEditor
        className="flex-1"
        onEditorDidMount={(editor) => {
          editorRef.current = editor;
        }}
        functionTemplate={functionTemplate}
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
