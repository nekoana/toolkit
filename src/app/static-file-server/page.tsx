"use client";

import { MdOutlinedButton } from "@/wrapper/button";
import Image from "next/image";
import { MdOutlinedTextField } from "@/wrapper/text-field";
import { MdSwitch } from "@/wrapper/switch";
import { useEffect, useReducer, useState } from "react";
import { MdDivider } from "@/wrapper/divider";
import { MdOutlinedCard } from "@/wrapper/labs/card";
import { open } from "@tauri-apps/plugin-dialog";
import { close, start } from "tauri-plugin-static-file-server-api";
import { listen } from "@tauri-apps/api/event";

function AttachFileButton({
  disabled,
  selectedFile,
  onSelectedFile,
  className,
}: {
  disabled?: boolean | undefined;
  selectedFile: string | undefined;
  onSelectedFile: (file: string) => void;
  className?: string | undefined;
}) {
  const chooseFile = async () => {
    const result = await open({
      multiple: false,
      directory: true,
      filter: "All Files",
    });

    if (result) {
      onSelectedFile(result);
    }
  };

  return (
    <>
      <MdOutlinedButton
        disabled={disabled}
        trailingIcon
        className={className}
        onClick={chooseFile}
      >
        <Image
          slot="icon"
          src="/attach_file_black_24dp.svg"
          alt="attach file"
          width={24}
          height={24}
        />
        <span>{selectedFile || "Attach File"}</span>
      </MdOutlinedButton>
    </>
  );
}

function PortTextField({
  disabled,
  port,
  onPortChange,
  className,
}: {
  disabled?: boolean | undefined;
  port: string;
  onPortChange: (port: string) => void;
  className?: string | undefined;
}) {
  const [error, setError] = useState(false);

  const handlePortError = (port: string) => {
    try {
      //only allow port number between 1024 and 65535
      //first check if the port number is a number
      const portNumber = Number(port);

      setError(!portNumber || portNumber < 1024 || portNumber > 65535);
    } catch {
      setError(true);
    }
  };

  useEffect(() => {
    handlePortError(port);
  }, [port]);

  return (
    <>
      <MdOutlinedTextField
        disabled={disabled}
        value={port}
        className={className}
        label="Port"
        pattern="[0-9]*"
        error={error}
        required
        onInput={(e) => {
          const target = e.target as HTMLInputElement;

          onPortChange(target.value);
        }}
      />
    </>
  );
}

type State = {
  file: string | undefined;
  port: string;
};

const InitialState: State = {
  file: undefined,
  port: "8080",
};

type Action = {
  type: "SET_FILE" | "SET_PORT" | "TOGGLE_RUNNING";
  payload: any;
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "SET_FILE":
      return { ...state, file: action.payload };
    case "SET_PORT":
      return { ...state, port: action.payload };
    default:
      return state;
  }
}

function StaticFileServer() {
  const [state, dispatch] = useReducer(reducer, InitialState);

  const [runServer, setRunServer] = useState(false);

  const startServer = async () => {
    if (state.file) {
      await start(state.file, state.port);
    }
  };

  const stopServer = async () => {
    //stop server
    if (state.file) {
      await close(state.file, state.port);
    }
  };

  useEffect(() => {
    if (runServer) {
      //start server
      startServer().catch((e) => {
        console.error(e);
        setRunServer(false);
      });
    } else {
      //stop server
      stopServer().catch((e) => {
        console.error(e);
      });
    }

    return () => {
      //stop server
      stopServer().catch((e) => {
        console.error(e);
      });
    };
  }, [runServer]);

  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const listener = listen("static-file-server://logcat", (event) => {
      console.log(event.payload);

      const newLog = [...logs, event.payload] as string[];

      if (newLog.length > 100) {
        newLog.shift();
      }

      setLogs(newLog);
    });

    return () => {
      listener.then((l) => l());
    };
  });

  return (
    <div className="w-full h-full flex flex-col p-4 gap-y-[16px]">
      <div className="w-full flex flex-row justify-center items-center gap-x-[20px] px-8">
        <AttachFileButton
          disabled={runServer}
          selectedFile={state.file}
          onSelectedFile={(file) =>
            dispatch({ type: "SET_FILE", payload: file })
          }
          className="h-full flex-1 text-ellipsis overflow-hidden"
        />

        <PortTextField
          disabled={runServer}
          port={state.port}
          onPortChange={(port) => dispatch({ type: "SET_PORT", payload: port })}
          className="w-24"
        />

        <MdSwitch
          disabled={!state.file || !state.port}
          selected={runServer}
          onInput={() => {
            setRunServer(!runServer);
          }}
        />
      </div>
      <MdDivider className="w-full" />

      <MdOutlinedTextField
        className="flex-1 p-4 whitespace-pre-line"
        readOnly
        value={logs.join("\n>>>>-_-<<<<\n")}
        type="textarea"
      />
    </div>
  );
}

export default StaticFileServer;
