const bitMap: { [key: string]: string } = {
  "0": "0000",
  "1": "0001",
  "2": "0010",
  "3": "0011",
  "4": "0100",
  "5": "0101",
  "6": "0110",
  "7": "0111",
  "8": "1000",
  "9": "1001",
  a: "1010",
  b: "1011",
  c: "1100",
  d: "1101",
  e: "1110",
  f: "1111",
};

export type BitFormat = "hex" | "bin";

class BitMapper {
  static bit(text: string, format: BitFormat): string | null {
    if (!text || text.length == 0) return null;

    text = text.replace(/\s/g, "");

    text = text.toLowerCase();

    if (format === "hex") {
      if (!BitMapper.isValidHex(text)) return null;
      return BitMapper.toBinary(text);
    } else {
      if (!BitMapper.isValidBinary(text)) return null;
      return text.padEnd(Math.ceil(text.length / 8) * 8, "0");
    }
  }

  static toBinary(hex: string): string | null {
    if (!hex) return null;

    const binary = hex
      .split("")
      .map((c) => bitMap[c])
      .join("");

    return binary.padEnd(Math.ceil(binary.length / 8) * 8, "0");
  }

  static isValidHex(hex: string): boolean {
    return /^[0-9a-f]+$/.test(hex);
  }

  static isValidBinary(bin: string): boolean {
    return /^[01]+$/.test(bin);
  }
}

export default BitMapper;
