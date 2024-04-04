function ContentInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <>
      <input
        type="text"
        className="w-full h-16 border p-4 font-bold leading-normal shadow hover:shadow-lg transition rounded"
        id="content"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </>
  );
}

export default ContentInput;
