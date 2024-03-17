function Bit({ bit, index }: { bit: "0" | "1"; index: number }) {
  return (
    <div
      className={`w-16 h-8 flex items-center justify-center text-center shadow hover:scale-95 transition rounded ${bit === "1" ? "bg-emerald-500" : "bg-slate-300"}`}
    >
      <span>{index}</span>
    </div>
  );
}

export default Bit;
