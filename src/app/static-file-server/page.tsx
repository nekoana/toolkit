"use client";

import { MdOutlinedButton } from "@/wrapper/button";
import Image from "next/image";
import { MdOutlinedTextField } from "@/wrapper/text-field";
import { MdSwitch } from "@/wrapper/switch";
import { useState } from "react";
import { MdDivider } from "@/wrapper/divider";
import { MdOutlinedCard } from "@/wrapper/labs/card";

function AttachFileButton() {
  return (
    <>
      <MdOutlinedButton trailingIcon className="flex-1 h-full">
        <Image
          slot="icon"
          src="/attach_file_black_24dp.svg"
          alt="attach file"
          width={24}
          height={24}
        />
        <span>Attach File</span>
      </MdOutlinedButton>
    </>
  );
}

function PortTextField() {
  const [error, setError] = useState(false);

  return (
    <>
      <MdOutlinedTextField
        className="w-32"
        label="Port"
        pattern="[0-9]*"
        error={error}
        required
      />
    </>
  );
}

function StaticFileServer() {
  return (
    <div className="w-full h-full flex flex-col p-4 gap-y-[16px]">
      <div className="w-full flex flex-row justify-center items-center gap-x-[20px]">
        <AttachFileButton />
        <PortTextField />

        <MdSwitch selected />
      </div>
      <MdDivider className="w-full" />

      <MdOutlinedCard className="flex-1" />
    </div>
  );
}

export default StaticFileServer;
