"use client";

import { useEffect, useState } from "react";
import { MdOutlinedTextField } from "@/wrapper/text-field";
import { MdFilledSelect, MdSelectOption } from "@/wrapper/select";
import BitMapper, { BitFormat } from "@/app/bitset/lib/bitset";
import FilledCard from "@/components/card";

function Bit({ bit, index }: { bit: string; index: number }) {
  return (
    <FilledCard className="font-bold w-full h-max" disabled={bit === "0"}>
      {index}
    </FilledCard>
  );
}

export default function Bitset() {
  const [content, setContent] = useState<string>("");
  const [format, setFormat] = useState<BitFormat>("hex");

  const [bits, setBits] = useState<String>("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setBits(BitMapper.bit(content, format) ?? "");
    }, 500);

    return () => clearTimeout(timeout);
  }, [content, format]);

  return (
    <div className="w-full h-full flex flex-col">
      <MdOutlinedTextField
        label="Content"
        className="w-full h-16 my-2"
        id="content"
        value={content}
        onInput={(e) => {
          const target = e.target;

          if (target != null && "id" in target && "value" in target) {
            if (target.id === "content") {
              setContent(target.value as string);
            }
          }
        }}
        pattern={format === "hex" ? "^[0-9a-f]+$" : "^[01]+$"}
      >
        <MdFilledSelect
          id="format"
          className="w-24"
          slot="trailing-icon"
          value={format}
          onChange={(e) => {
            const target = e.target as HTMLSelectElement;

            setFormat(target.value as BitFormat);
          }}
        >
          <MdSelectOption value="hex">Hex</MdSelectOption>
          <MdSelectOption value="bin">Bin</MdSelectOption>
        </MdFilledSelect>
      </MdOutlinedTextField>

      <div className="w-full grid grid-cols-8 max-h-96 overflow-y-scroll gap-[16px]">
        {bits.split("").map((bit, index) => (
          <Bit key={index} bit={bit} index={index + 1} />
        ))}
      </div>
    </div>
  );
}
