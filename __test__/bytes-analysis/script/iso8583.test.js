/**
 * @type {{[key:number]:{name:string,format:string,pad:string,align: "L" | "R"}}} fields
 */
const fields = {
  2: {
    name: "Primary Account Number (PAN)",
    format: "N..19",
    pad: "0",
    align: "L",
  },
  3: {
    name: "Processing Code",
    format: "N6",
    pad: "0",
    align: "L",
  },
  4: {
    name: "Amount, Transaction",
    format: "N12",
    pad: "0",
    align: "L",
  },
  5: {
    name: "Amount, Settlement",
    format: "N12",
    pad: "0",
    align: "L",
  },
  6: {
    name: "Amount, Cardholder Billing",
    format: "N12",
    pad: "0",
    align: "L",
  },
  7: {
    name: "Transmission Date & Time",
    format: "N10",
    pad: "0",
    align: "L",
  },
  8: {
    name: "Amount, Cardholder Billing Fee",
    format: "N8",
    pad: "0",
    align: "L",
  },
  9: {
    name: "Conversion Rate, Settlement",
    format: "N8",
    pad: "0",
    align: "L",
  },
  10: {
    name: "Conversion Rate, Cardholder Billing",
    format: "N8",
    pad: "0",
    align: "L",
  },
  11: {
    name: "System Trace Audit Number (STAN)",
    format: "N6",
    pad: "0",
    align: "L",
  },
  12: {
    name: "Time, Local Transaction",
    format: "N6",
    pad: "0",
    align: "L",
  },
  13: {
    name: "Date, Local Transaction",
    format: "N4",
    pad: "0",
    align: "L",
  },
  14: {
    name: "Date, Expiration",
    format: "N4",
    pad: "0",
    align: "L",
  },
  15: {
    name: "Date, Settlement",
    format: "N4",
    pad: "0",
    align: "L",
  },
  16: {
    name: "Date, Conversion",
    format: "N4",
    pad: "0",
    align: "L",
  },
  17: {
    name: "Date, Capture",
    format: "N4",
    pad: "0",
    align: "L",
  },
  18: {
    name: "Merchant Type",
    format: "N4",
    pad: "0",
    align: "L",
  },
  19: {
    name: "Acquiring Institution Country Code",
    format: "N3",
    pad: "0",
    align: "L",
  },
  20: {
    name: "PAN Extended, Country Code",
    format: "N3",
    pad: "0",
    align: "L",
  },
  21: {
    name: "Forwarding Institution Country Code",
    format: "N3",
    pad: "0",
    align: "L",
  },
  22: {
    name: "Point of Service Entry Mode",
    format: "N3",
    pad: "0",
    align: "L",
  },
  23: {
    name: "Application PAN Sequence Number",
    format: "N3",
    pad: "0",
    align: "L",
  },
  24: {
    name: "Function Code",
    format: "N3",
    pad: "0",
    align: "L",
  },
  25: {
    name: "Point of Service Condition Code",
    format: "N2",
    pad: "0",
    align: "L",
  },
  26: {
    name: "Point of Service PIN Capture Code",
    format: "N2",
    pad: "0",
    align: "L",
  },
  27: {
    name: "Authorizing Identification Response Length",
    format: "N1",
    pad: "0",
    align: "L",
  },
  28: {
    name: "Amount, Transaction Fee",
    format: "N8",
    pad: "0",
    align: "L",
  },
  29: {
    name: "Amount, Settlement Fee",
    format: "N8",
    pad: "0",
    align: "L",
  },
  30: {
    name: "Amount, Transaction Processing Fee",
    format: "N8",
    pad: "0",
    align: "L",
  },
  31: {
    name: "Amount, Settlement Processing Fee",
    format: "N8",
    pad: "0",
    align: "L",
  },
  32: {
    name: "Acquiring Institution Identification Code",
    format: "N..11",
    pad: "0",
    align: "L",
  },
  33: {
    name: "Forwarding Institution Identification Code",
    format: "N..11",
    pad: "0",
    align: "L",
  },
  34: {
    name: "Primary Account Number, Extended",
    format: "N..28",
    pad: "0",
    align: "L",
  },
  35: {
    name: "Track 2 Data",
    format: "Z..37",
    pad: " ",
    align: "L",
  },
  36: {
    name: "Track 3 Data",
    format: "Z..104",
    pad: " ",
    align: "L",
  },
  37: {
    name: "Retrieval Reference Number",
    format: "AN12",
    pad: " ",
    align: "L",
  },
  38: {
    name: "Authorization Identification Response",
    format: "AN6",
    pad: " ",
    align: "L",
  },
  39: {
    name: "Response Code",
    format: "AN2",
    pad: " ",
    align: "L",
  },
  40: {
    name: "Service Restriction Code",
    format: "AN3",
    pad: " ",
    align: "L",
  },
  41: {
    name: "Card Acceptor Terminal Identification",
    format: "ANS8",
    pad: " ",
    align: "L",
  },
  42: {
    name: "Card Acceptor Identification Code",
    format: "ANS15",
    pad: " ",
    align: "L",
  },
  43: {
    name: "Card Acceptor Name/Location",
    format: "ANS40",
    pad: " ",
    align: "L",
  },
  44: {
    name: "Additional Response Data",
    format: "ANS25",
    pad: " ",
    align: "L",
  },
  45: {
    name: "Track 1 Data",
    format: "ANS76",
    pad: " ",
    align: "L",
  },
  46: {
    name: "Additional Data - ISO",
    format: "ANS...999",
    pad: " ",
    align: "L",
  },
  47: {
    name: "Additional Data - National",
    format: "ANS...999",
    pad: " ",
    align: "L",
  },
  48: {
    name: "Additional Data - Private",
    format: "ANS...999",
    pad: " ",
    align: "L",
  },
  49: {
    name: "Currency Code, Transaction",
    format: "AN3",
    pad: " ",
    align: "L",
  },
  50: {
    name: "Currency Code, Settlement",
    format: "AN3",
    pad: " ",
    align: "L",
  },
  51: {
    name: "Currency Code, Cardholder Billing",
    format: "AN3",
    pad: " ",
    align: "L",
  },
  52: {
    name: "Personal Identification Number (PIN) Data",
    format: "B64",
    pad: " ",
    align: "L",
  },
  53: {
    name: "Security-Related Control Information",
    format: "N16",
    pad: "0",
    align: "L",
  },
  54: {
    name: "Additional Amounts",
    format: "AN120",
    pad: " ",
    align: "L",
  },
  55: {
    name: "Reserved ISO",
    format: "ANS..999",
    pad: " ",
    align: "L",
  },
  56: {
    name: "Reserved ISO",
    format: "ANS...999",
    pad: " ",
    align: "L",
  },
  57: {
    name: "Reserved National",
    format: "ANS...999",
    pad: " ",
    align: "L",
  },
  58: {
    name: "Reserved National",
    format: "ANS...999",
    pad: " ",
    align: "L",
  },
  59: {
    name: "Reserved National",
    format: "ANS...999",
    pad: " ",
    align: "L",
  },
  60: {
    name: "Reserved Private",
    format: "ANS...999",
    pad: " ",
    align: "L",
  },
  61: {
    name: "Reserved Private",
    format: "ANS...999",
    pad: " ",
    align: "L",
  },
  62: {
    name: "Reserved Private",
    format: "ANS...999",
    pad: " ",
    align: "L",
  },
  63: {
    name: "Reserved Private",
    format: "ANS...999",
    pad: " ",
    align: "L",
  },
  64: {
    name: "Message Authentication Code (MAC)",
    format: "B64",
    pad: " ",
    align: "L",
  },
};
const utils = {
  /**
   * @type {TextDecoder}
   * @private
   */
  textDecoder: new TextDecoder(),

  /**
   * Converts a number or string to a Binary Coded Decimal (BCD) ArrayBuffer.
   *
   * @param {number | string} value
   * @returns {ArrayBuffer}
   */
  toBcdBuffer: (value) => {
    value = String(value);

    if (value.length % 2 !== 0) {
      value = "0" + value;
    }

    const length = value.length / 2;
    const buffer = new ArrayBuffer(length);
    const view = new DataView(buffer);

    for (let i = 0; i < length; i++) {
      const substring = value.substring(i * 2, i * 2 + 2);
      const byte = Number.parseInt(substring, 16);
      view.setUint8(i, byte);
    }

    return buffer;
  },

  /**
   * Converts a Binary Coded Decimal (BCD) ArrayBuffer to a string.
   *
   * @param {DataView} view
   * @returns {string}
   */
  toBcdString: (view) => {
    return utils.toHexString(view);
  },

  /**
   * Converts a DataView to a hexadecimal string.
   * @param {DataView} view
   * @returns {string}
   */
  toHexString: (view) => {
    const length = view.byteLength;
    let value = "";

    for (let i = 0; i < length; i++) {
      const byte = view.getUint8(i);
      value += byte.toString(16).padStart(2, "0");
    }

    return value;
  },

  /**
   * Decodes a buffer into a string using a TextDecoder.
   *
   * @param {DataView} view
   * @returns {string}
   */
  decodeBuffer: (view) => {
    return utils.textDecoder.decode(view);
  },
  /**
   * Decodes a buffer into a string using a TextDecoder.
   *
   * @param {DataView} view
   * @returns {string}
   */
  N: (view) => {
    return utils.decodeBuffer(view);
  },
  /**
   * Decodes a buffer into a string using a TextDecoder.
   *
   * @param {DataView} view
   * @returns {string}
   */
  Z: (view) => {
    return utils.decodeBuffer(view);
  },
  /**
   * Decodes a buffer into a string using a TextDecoder.
   *
   * @param {DataView} view
   * @returns {string}
   */
  AN: (view) => {
    return utils.decodeBuffer(view);
  },
  /**
   * Decodes a buffer into a string using a TextDecoder.
   *
   * @param {DataView} view
   * @returns {string}
   */
  ANS: (view) => {
    return utils.decodeBuffer(view);
  },
  /**
   * Decodes a buffer into a string using a TextDecoder.
   *
   * @param {DataView} view
   * @returns {string}
   */
  B: (view) => {
    return utils.decodeBuffer(view);
  },
};
const iso8583 = {
  fields: fields,
  utils: utils,
  /**
   *
   * @param {DataView} view
   * @returns {number[]}
   */
  bitmap: (view) => {
    const bitmap = [];

    for (let i = 0; i < view.byteLength; i++) {
      const byte = view.getUint8(i);

      for (let j = 0; j < 8; j++) {
        if (byte & (1 << (8 - 1 - j))) {
          bitmap.push(i * 8 + j + 1);
        }
      }
    }

    return bitmap;
  },

  /**
   *
   * @param {{name:string,format:string,pad:string,align: "L" | "R"}} field
   * @param {DataView} view
   * @returns {DataView}
   */
  lengthView: (field, view) => {
    const format = field.format;

    /**
     * @type {"." | ".." | "..." | ""}
     */
    const varlena = format.replace(/[^.]/g, "");

    /**
     * @type {ArrayBuffer}
     */
    let lengthBuffer;
    switch (varlena) {
      case ".":
      case "..":
        lengthBuffer = new ArrayBuffer(1);
        break;
      case "...":
        lengthBuffer = new ArrayBuffer(2);
        break;
      default:
        lengthBuffer = new ArrayBuffer(0);
    }

    let offset = 0;

    const lengthView = new DataView(lengthBuffer);

    for (let i = 0; i < lengthBuffer.byteLength; i++) {
      lengthView.setUint8(i, view.getUint8(offset++));
    }

    return lengthView;
  },

  /**
   *
   * @param {DataView} view
   */
  values: (view) => {
    let offset = 0;

    const bitmapView = new DataView(view.buffer, offset, 8);

    offset += 8;

    const bitmap = iso8583.bitmap(bitmapView);

    for (const bit of bitmap) {
      const field = fields[bit];

      if (field) {
        const lengthView = iso8583.lengthView(
          field,
          new DataView(view.buffer, offset),
        );
        offset += lengthView.byteLength;

        const lengthBcdString = iso8583.utils.toBcdString(lengthView);
        let length = parseInt(lengthBcdString);

        /**
         * @type {"N" | "Z" | "AN" | "ANS" | "B"}
         */
        const type = format.replace(/[0-9.]/g, "");
        switch (type) {
          //bcd
          case "N":
            length = Math.ceil(length / 2);
            break;
          //binary
          case "B":
            length = Math.ceil(length / 8);
            break;
          //ascii
          case "Z":
          case "AN":
          case "ANS":
          //no need to do anything
        }
      }
    }
  },
};

test("utils.bcd", () => {
  const bcdBuffer = utils.toBcdBuffer(1234);

  const bcdView = new DataView(bcdBuffer);

  const hexBcdBuffer = utils.toHexString(bcdView);

  expect(hexBcdBuffer).toBe("1234");

  const bcdString = utils.toBcdString(bcdView);

  expect(bcdString).toBe("1234");
});

test("iso8583.bitmap", () => {
  const bs = [Number.parseInt("10101010", 2), 0, 0, 0, 0, 0, 0, 0];
  const bsBuffer = new Uint8Array(bs).buffer;

  const bsView = new DataView(bsBuffer);

  const bitmap = iso8583.bitmap(bsView);

  expect(bitmap).toEqual([1, 3, 5, 7]);
});
