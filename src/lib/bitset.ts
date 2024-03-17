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
class BitMapper {
  static toBinary(hex: string): string | null {
    if (!hex) return null;

    hex = hex.toLowerCase();

    // Check if the input is a valid hex string
    if (!/^[0-9a-f]+$/.test(hex)) return null;

    const binary = hex.split("").reduce((acc, c) => acc + bitMap[c], "");

    // Pad the binary string with zeros to make its length a multiple of 8
    return binary.padEnd(Math.ceil(binary.length / 8) * 8, "0");
  }
}

export default BitMapper;
