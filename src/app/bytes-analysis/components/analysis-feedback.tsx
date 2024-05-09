"use client";

import React, { useEffect, useState } from "react";
import { MdIconButton } from "@/wrapper/icon-button";
import { MdIcon } from "@/wrapper/icon";
import Image from "next/image";
import { MdDialog } from "@/wrapper/labs/dialog";
import { FeedbackDetail } from "./feedback-detail";

export default function AnalysisFeedback({
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
      setFeedback([
        "<p>Failed to analyze hex content: <strong>" +
          e.message +
          "</strong></p>",
      ]);
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
      <div slot="content" className="flex flex-col items-center gap-y-[8px]">
        {feedback &&
          feedback.map((line, index) => (
            <FeedbackDetail key={index} detail={line} className="w-full" />
          ))}
      </div>
    </MdDialog>
  );
}
