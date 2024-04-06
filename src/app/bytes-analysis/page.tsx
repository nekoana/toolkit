"use client";

import { MdOutlinedTextField } from "@/wrapper/text-field";
import { useState } from "react";
import { editor } from "monaco-editor";
import Editor, { Monaco, loader } from "@monaco-editor/react";
import React from "react";
import clsx from "clsx";
import { MdFilledIconButton } from "@/wrapper/icon-button";
import { MdIcon } from "@/wrapper/icon";
import Image from "next/image";
import { functionTemplate } from "./function-template";

export default function BytesAnalysis() {
  const [hexContent, setHexContent] = useState<string>("");

  const editorRef = React.useRef<editor.IStandaloneCodeEditor | null>(null);

  loader.config({ paths: { vs: "/vs" } });

  const handleEditorDidMount = (
    editor: editor.IStandaloneCodeEditor,
    monaco: Monaco,
  ) => {
    editorRef.current = editor;

    monaco.editor.defineTheme("BytesAnalysisTheme", {
      base: "vs",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#fff8f3",
      },
    });

    monaco.editor.setTheme("BytesAnalysisTheme");
  };

  const handleRun = async () => {
    try {
      // Parse content as function
      const functionCode = editorRef.current?.getValue() || "";
      const parsedFunction = eval(`(${functionCode})`);

      // Create a Blob from the hex content
      const hexString = hexContent.replace(/\s/g, "");

      if (hexString.length % 2 !== 0) {
        throw new Error(
          "Invalid hex content length, must be even number of characters",
        );
      }

      const hexArray = hexString.match(/.{1,2}/g);
      if (hexArray === null) {
        throw new Error(
          "Invalid hex contentm, only contains whitespace or no content",
        );
      }

      const byteArray = new Uint8Array(hexArray.map((x) => parseInt(x, 16)));

      const data = new Blob([byteArray], { type: "application/octet-stream" });

      const result = parsedFunction(data);
      // Log the result
      console.log("Result:", result);
    } catch (error) {
      console.error("Failed to run analyze function:", error);
    }
  };

  return (
    <div className="container p-12 h-screen overflow-y-scroll flex flex-col content-center items-center gap-y-[16px]">
      <MdOutlinedTextField
        label="Hex Content"
        className="w-full h-16"
        id="content"
        onInput={(e) => {
          const target = e.target as HTMLInputElement;

          setHexContent(target.value);
        }}
        value={hexContent}
      ></MdOutlinedTextField>

      <div
        className={clsx(
          "w-full",
          "h-[58vh]",
          "overflow-hidden",
          "py-2",
          "transition",
          "shadow-[0px_0px_0px_1px_rgb(121,89,26)]", //7f5700
          "hover:shadow-[0px_0px_0px_3px_rgb(121,89,26)]",
          "rounded-md",
        )}
      >
        <Editor
          onMount={handleEditorDidMount}
          defaultLanguage="javascript"
          defaultValue={functionTemplate}
        />
      </div>

      <MdFilledIconButton className="w-24 h-12" onClick={handleRun}>
        <MdIcon>
          <Image
            src="/play-arrow.svg"
            width={28}
            height={28}
            alt="Go Forward"
          />
        </MdIcon>
      </MdFilledIconButton>
    </div>
  );
}
