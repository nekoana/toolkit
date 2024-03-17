function FormatRadio({
  checked,
  label,
  onChange,
}: {
  checked: boolean;
  label: string;
  onChange: () => void;
}) {
  return (
    <>
      <div className="w-12  p-0.5 rounded flex flex-row justify-stretch bg-neutral-400">
        <input
          type="radio"
          name="format"
          value="hex"
          id="format-hex"
          checked={checked}
          onChange={onChange}
        />
        <label>{label}</label>
      </div>
    </>
  );
}

function FormatSelector({
  format,
  onFormatChange,
}: {
  format: "hex" | "bin";
  onFormatChange: (format: "hex" | "bin") => void;
}) {
  return (
    <div className="w-24 h-full flex flex-col items-center gap-1">
      <FormatRadio
        checked={format === "hex"}
        label="Hex"
        onChange={() => onFormatChange("hex")}
      />
      <FormatRadio
        checked={format === "bin"}
        label="Bin"
        onChange={() => onFormatChange("bin")}
      />
    </div>
  );
}

export default FormatSelector;
