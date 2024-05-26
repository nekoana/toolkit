"use client";

import JsEditor from "../../components/js-editor";
import { MdFilledButton } from "@/wrapper/button";
import { functionTemplate } from "@/app/tcp-server/components/function-template";
import { useEffect } from "react";
import { TcpServerService } from "@/app/tcp-server/services/tcpserver";

export default function TcpServer() {
  useEffect(() => {
    let server = TcpServerService.new("8080", (addr) => {
      console.log(addr);
    });

    server.listen();

    return () => {
      server.stop();
    };
  }, []);

  return (
    <div className="h-full w-full flex flex-col content-center items-center gap-y-[16px] px-2">
      <JsEditor
        className="flex-1"
        onEditorDidMount={(editor) => {}}
        functionTemplate={functionTemplate}
      />

      <MdFilledButton>Next</MdFilledButton>
    </div>
  );
}
