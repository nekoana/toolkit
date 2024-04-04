import BitMapper from "@/app/bitset/lib/bitset";
import { expect } from "@jest/globals";

test("BitMapper.toBinary", () => {
  expect(BitMapper.toBinary("AA")).toBe("10101010");

  expect(BitMapper.toBinary("A")).toBe("10100000");

  expect(BitMapper.toBinary("X")).toBe(null);

  expect(BitMapper.toBinary("")).toBe(null);

  expect(BitMapper.toBinary("0")).toBe("00000000");

  expect(BitMapper.toBinary("1")).toBe("00010000");
});
