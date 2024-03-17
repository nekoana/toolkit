"use client";

import { useEffect, useState } from "react";
import ContentInput from "./components/content-input";
import Link from "next/link";

export default function Bitset() {
  const [content, setContent] = useState<string>("");
  const [format, setFormat] = useState<"hex" | "bin">("hex");

  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log(content);
    }, 500);

    return () => clearTimeout(timeout);
  }, [content, format]);
  return (
    <div className="flex flex-col justify-center content-center items-center">
      <div className="w-full flex flex-row justify-center">
        <ContentInput value={content} onChange={setContent} />
      </div>
      <Link href="/bitset/hello">h</Link>
    </div>
  );
}
