class ViewWrapper {
  /**
   * @constructor
   * @param {DataView} view
   * @param {number | undefined} offset
   */
  constructor(view, offset) {
    this.view = view;
    this.offset = offset || 0;
  }

  getUint8() {
    return this.view.getUint8(this.offset++);
  }

  /**
   *
   * @param {number} length
   * @returns {DataView}
   */
  getView(length) {
    const view = new DataView(this.view.buffer, this.offset, length);
    this.offset += length;
    return view;
  }

  /**
   * @returns {number}
   */
  remaining() {
    return this.view.byteLength - this.offset;
  }

  /**
   * @returns {boolean}
   */
  eof() {
    return this.offset >= this.view.byteLength;
  }
}

const iso8583 = {
  /**
   * @type {{tpdu: {name: string, format: string} | undefined,msgid:{name:string,format:string} | undefined, [key: number]: {name: string, format: string, pad: string | undefined, align: "L" | "R" | undefined}}}
   */
  fields: {
    tpdu: {
      name: "TPDU",
      format: "N10",
    },
    msgid: {
      name: "Message Type Identifier",
      format: "N4",
    },
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
      format: "ANS...999",
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
  },
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
    return iso8583.toHexString(view);
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
   *
   * @param {string} hex string
   * @returns {DataView}
   */
  toDataView: (hex) => {
    const length = hex.length / 2;
    const buffer = new ArrayBuffer(length);
    const view = new DataView(buffer);

    for (let i = 0; i < length; i++) {
      const substring = hex.substring(i * 2, i * 2 + 2);
      const byte = Number.parseInt(substring, 16);
      view.setUint8(i, byte);
    }

    return view;
  },

  /**
   * Decodes a buffer into a string using a TextDecoder.
   *
   * @param {DataView} view
   * @returns {string}
   */
  decodeBuffer: (view) => {
    return iso8583.textDecoder.decode(view);
  },
  /**
   * Decodes a buffer into a string using a TextDecoder.
   *
   * @param {DataView} view
   * @returns {string}
   */
  N: (view) => {
    return iso8583.toBcdString(view);
  },
  /**
   * Decodes a buffer into a string using a TextDecoder.
   *
   * @param {DataView} view
   * @returns {string}
   */
  Z: (view) => {
    return iso8583.toHexString(view);
  },
  /**
   * Decodes a buffer into a string using a TextDecoder.
   *
   * @param {DataView} view
   * @returns {string}
   */
  AN: (view) => {
    return iso8583.decodeBuffer(view);
  },
  /**
   * Decodes a buffer into a string using a TextDecoder.
   *
   * @param {DataView} view
   * @returns {string}
   */
  ANS: (view) => {
    return iso8583.decodeBuffer(view);
  },
  /**
   * Decodes a buffer into a string using a TextDecoder.
   *
   * @param {DataView} view
   * @returns {string}
   */
  B: (view) => {
    return iso8583.toHexString(view);
  },
  /**
   *
   * @param {ViewWrapper} view
   * @returns {number[]}
   */
  bitmap: (view) => {
    const bitmap = [];

    for (let i = 0; i < 8; i++) {
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
   * @param {{name: string, format: string}} field
   * @param {ViewWrapper} view
   * @returns {string}
   */
  value: (field, view) => {
    const format = field.format;

    /**
     * @type {"." | ".." | "..." | ""}
     */
    const varlena = format.replace(/[^.]/g, "");

    let length;
    switch (varlena) {
      case ".":
      case "..":
      case "...":
        const lengthBuffer = new ArrayBuffer((varlena.length + 1) / 2);
        const lengthView = new DataView(lengthBuffer);
        for (let i = 0; i < lengthView.byteLength; i++) {
          lengthView.setUint8(i, view.getUint8());
        }
        length = parseInt(iso8583.toBcdString(lengthView));
        break;
      default:
        length = parseInt(format.replace(/\D/g, ""));
    }

    /**
     * @type {"N" | "Z" | "AN" | "ANS" | "B"}
     */
    const type = format.replace(/[0-9.]/g, "");
    switch (type) {
      //bcd
      case "N":
      case "Z":
        length = Math.ceil(length / 2);
        break;
      //binary
      case "B":
        length = Math.ceil(length / 8);
        break;
      //ascii
      case "AN":
      case "ANS":
      //no need to do anything
    }

    const valueView = view.getView(length);

    return iso8583[type](valueView);
  },

  /**
   *
   * @param {DataView} view
   * @param {number} offset
   * @returns {[string]}
   */
  values: (view) => {
    const rets = [];

    view = new ViewWrapper(view);

    const fields = iso8583.fields;

    if (fields.tpdu) {
      const tpdu = iso8583.value(fields.tpdu, view);
      rets.push(tpdu);
    }

    if (fields.msgid) {
      const msgid = iso8583.value(fields.msgid, view);
      rets.push(msgid);
    }

    const bitmap = iso8583.bitmap(view);

    for (const bit of bitmap) {
      const field = fields[bit];

      if (field) {
        const value = iso8583.value(field, view);
        rets.push(value);
      }
    }
    return rets;
  },
};



//=========================================================================
// Field: h, (header)
// Format: N10;  Value type:N;  Len type: FIXED;  Len: 10
// Padding pos: null;  Padding char:null;  Var len format field:null
// Format: null;  Value type:N;  Len type: FIXED;  Len: 10
// Padding pos: null;  Padding char:null;  Var len format field:null
// Value
// [6000000002]

// 36 30 30 30 30 30 30 30 30 32 
// ------------------------
// Field: m, (msg_id)
// Format: N4;  Value type:N;  Len type: FIXED;  Len: 4
// Padding pos: null;  Padding char:null;  Var len format field:null
// Format: null;  Value type:N;  Len type: FIXED;  Len: 4
// Padding pos: null;  Padding char:null;  Var len format field:null
// Value
// [0210]

// 30 32 31 30 
// ------------------------
// Field: 3, (交易处理码(Transaction Processing Code))
// Format: N6;  Value type:N;  Len type: FIXED;  Len: 6
// Padding pos: null;  Padding char:null;  Var len format field:null
// Format: null;  Value type:N;  Len type: FIXED;  Len: 6
// Padding pos: null;  Padding char:null;  Var len format field:null
// Value
// [000000]

// 30 30 30 30 30 30 
// ------------------------
// Field: 4, (交易金额(Amount Of Transactions))
// Format: N12;  Value type:N;  Len type: FIXED;  Len: 12
// Padding pos: null;  Padding char:null;  Var len format field:null
// Format: null;  Value type:N;  Len type: FIXED;  Len: 12
// Padding pos: null;  Padding char:null;  Var len format field:null
// Value
// [000000050000]

// 30 30 30 30 30 30 30 35 30 30 30 30 
// ------------------------
// Field: 11, (受卡方系统跟踪号(System Trace Audit Number))
// Format: N6;  Value type:N;  Len type: FIXED;  Len: 6
// Padding pos: null;  Padding char:null;  Var len format field:null
// Format: null;  Value type:N;  Len type: FIXED;  Len: 6
// Padding pos: null;  Padding char:null;  Var len format field:null
// Value
// [038649]

// 30 33 38 36 34 39 
// ------------------------
// Field: 12, (受卡方所在地时间(Local Time Of Transaction))
// Format: N6;  Value type:N;  Len type: FIXED;  Len: 6
// Padding pos: null;  Padding char:null;  Var len format field:null
// Format: null;  Value type:N;  Len type: FIXED;  Len: 6
// Padding pos: null;  Padding char:null;  Var len format field:null
// Value
// [135928]

// 31 33 35 39 32 38 
// ------------------------
// Field: 13, (受卡方所在地日期(Local Date Of Transaction))
// Format: N4;  Value type:N;  Len type: FIXED;  Len: 4
// Padding pos: null;  Padding char:null;  Var len format field:null
// Format: null;  Value type:N;  Len type: FIXED;  Len: 4
// Padding pos: null;  Padding char:null;  Var len format field:null
// Value
// [0409]

// 30 34 30 39 
// ------------------------
// Field: 24, (NII)
// Format: N3;  Value type:N;  Len type: FIXED;  Len: 3
// Padding pos: null;  Padding char:null;  Var len format field:null
// Format: null;  Value type:N;  Len type: FIXED;  Len: 3
// Padding pos: null;  Padding char:null;  Var len format field:null
// Value
// [002]

// 30 30 32 
// ------------------------
// Field: 37, (检索参考号(Retrieval Reference Number))
// Format: AN12;  Value type:AN;  Len type: FIXED;  Len: 12
// Padding pos: null;  Padding char:null;  Var len format field:null
// Format: null;  Value type:AN;  Len type: FIXED;  Len: 12
// Padding pos: null;  Padding char:null;  Var len format field:null
// Value
// [240409038649]

// 32 34 30 34 30 39 30 33 38 36 34 39 
// ------------------------
// Field: 38, (授权标识应答码(Authorization Identification Response Code))
// Format: AN6;  Value type:AN;  Len type: FIXED;  Len: 6
// Padding pos: null;  Padding char:null;  Var len format field:null
// Format: null;  Value type:AN;  Len type: FIXED;  Len: 6
// Padding pos: null;  Padding char:null;  Var len format field:null
// Value
// [135928]

// 31 33 35 39 32 38 
// ------------------------
// Field: 39, (应答码(Response Code))
// Format: AN2;  Value type:AN;  Len type: FIXED;  Len: 2
// Padding pos: null;  Padding char:null;  Var len format field:null
// Format: null;  Value type:AN;  Len type: FIXED;  Len: 2
// Padding pos: null;  Padding char:null;  Var len format field:null
// Value
// [00]

// 30 30 
// ------------------------
// Field: 41, (受卡机终端标识码(Card Acceptor Terminal Identification))
// Format: ANS8;  Value type:ANS;  Len type: FIXED;  Len: 8
// Padding pos: null;  Padding char:null;  Var len format field:null
// Format: null;  Value type:ANS;  Len type: FIXED;  Len: 8
// Padding pos: null;  Padding char:null;  Var len format field:null
// Value
// [UOB-ONUS]
// 55 4f 42 2d 4f 4e 55 53 
//=========================================================================

const testHex1 =
  "60000000020210303801000E800000000000000000050000038649135928040900023234303430393033383634393133353932383030554F422D4F4E5553";

const testView1 = iso8583.toDataView(testHex1);

const rets1 = iso8583.values(testView1);

console.log(rets1);

//==========================================================================
// Field: h, (header)
// Format: N10;  Value type:N;  Len type: FIXED;  Len: 10
// Padding pos: null;  Padding char:null;  Var len format field:null
// Format: null;  Value type:null;  Len type: null;  Len: 0
// Padding pos: null;  Padding char:null;  Var len format field:null
// Value
// [6000020000]

// 36 30 30 30 30 32 30 30 30 30 
// ------------------------
// Field: m, (msg_id)
// Format: N4;  Value type:N;  Len type: FIXED;  Len: 4
// Padding pos: null;  Padding char:null;  Var len format field:null
// Format: null;  Value type:null;  Len type: null;  Len: 0
// Padding pos: null;  Padding char:null;  Var len format field:null
// Value
// [0200]

// 30 32 30 30 
// ------------------------
// Field: 3, (交易处理码(Transaction Processing Code))
// Format: N6;  Value type:N;  Len type: FIXED;  Len: 6
// Padding pos: null;  Padding char:null;  Var len format field:null
// Format: null;  Value type:null;  Len type: null;  Len: 0
// Padding pos: null;  Padding char:null;  Var len format field:null
// Value
// [000000]

// 30 30 30 30 30 30 
// ------------------------
// Field: 4, (交易金额(Amount Of Transactions))
// Format: N12;  Value type:N;  Len type: FIXED;  Len: 12
// Padding pos: null;  Padding char:null;  Var len format field:null
// Format: null;  Value type:null;  Len type: null;  Len: 0
// Padding pos: null;  Padding char:null;  Var len format field:null
// Value
// [50000]

// 35 30 30 30 30 
// ------------------------
// Field: 11, (受卡方系统跟踪号(System Trace Audit Number))
// Format: N6;  Value type:N;  Len type: FIXED;  Len: 6
// Padding pos: null;  Padding char:null;  Var len format field:null
// Format: null;  Value type:null;  Len type: null;  Len: 0
// Padding pos: null;  Padding char:null;  Var len format field:null
// Value
// [038649]

// 30 33 38 36 34 39 
// ------------------------
// Field: 12, (受卡方所在地时间(Local Time Of Transaction))
// Format: N6;  Value type:N;  Len type: FIXED;  Len: 6
// Padding pos: null;  Padding char:null;  Var len format field:null
// Format: null;  Value type:null;  Len type: null;  Len: 0
// Padding pos: null;  Padding char:null;  Var len format field:null
// Value
// [135918]

// 31 33 35 39 31 38 
// ------------------------
// Field: 13, (受卡方所在地日期(Local Date Of Transaction))
// Format: N4;  Value type:N;  Len type: FIXED;  Len: 4
// Padding pos: null;  Padding char:null;  Var len format field:null
// Format: null;  Value type:null;  Len type: null;  Len: 0
// Padding pos: null;  Padding char:null;  Var len format field:null
// Value
// [0409]

// 30 34 30 39 
// ------------------------
// Field: 22, (服务点输入方式码(Point Of Service Entry Mode))
// Format: N3;  Value type:N;  Len type: FIXED;  Len: 3
// Padding pos: PADDING_LEFT;  Padding char:null;  Var len format field:null
// Format: null;  Value type:null;  Len type: null;  Len: 0
// Padding pos: null;  Padding char:null;  Var len format field:null
// Value
// [051]

// 30 35 31 
// ------------------------
// Field: 23, (卡序列号(Card Sequence Number))
// Format: N3;  Value type:N;  Len type: FIXED;  Len: 3
// Padding pos: null;  Padding char:null;  Var len format field:null
// Format: null;  Value type:null;  Len type: null;  Len: 0
// Padding pos: null;  Padding char:null;  Var len format field:null
// Value
// [01]

// 30 31 
// ------------------------
// Field: 24, (NII)
// Format: N3;  Value type:N;  Len type: FIXED;  Len: 3
// Padding pos: null;  Padding char:null;  Var len format field:null
// Format: null;  Value type:null;  Len type: null;  Len: 0
// Padding pos: null;  Padding char:null;  Var len format field:null
// Value
// [002]

// 30 30 32 
// ------------------------
// Field: 25, (服务点条件码(Point Of Service Condition Mode))
// Format: N2;  Value type:N;  Len type: FIXED;  Len: 2
// Padding pos: null;  Padding char:null;  Var len format field:null
// Format: null;  Value type:null;  Len type: null;  Len: 0
// Padding pos: null;  Padding char:null;  Var len format field:null
// Value
// [00]

// 30 30 
// ------------------------
// Field: 35, (2磁道数据(Track 2 Data))
// Format: Z..37;  Value type:Z;  Len type: LLVAR;  Len: 37
// Padding pos: null;  Padding char:null;  Var len format field:null
// Format: null;  Value type:null;  Len type: null;  Len: 0
// Padding pos: null;  Padding char:null;  Var len format field:null
// Value
// [4341021234567895D28101211282736000000]

// 34 33 34 31 30 32 31 32 33 34 35 36 37 38 39 35 
// 44 32 38 31 30 31 32 31 31 32 38 32 37 33 36 30 
// 30 30 30 30 30 
// ------------------------
// Field: 41, (受卡机终端标识码(Card Acceptor Terminal Identification))
// Format: ANS8;  Value type:ANS;  Len type: FIXED;  Len: 8
// Padding pos: null;  Padding char:null;  Var len format field:null
// Format: null;  Value type:null;  Len type: null;  Len: 0
// Padding pos: null;  Padding char:null;  Var len format field:null
// Value
// [UOB-ONUS]

// 55 4f 42 2d 4f 4e 55 53 
// ------------------------
// Field: 42, (受卡方标识码(Card Acceptor Identification Code))
// Format: ANS15;  Value type:ANS;  Len type: FIXED;  Len: 15
// Padding pos: null;  Padding char:null;  Var len format field:null
// Format: null;  Value type:null;  Len type: null;  Len: 0
// Padding pos: null;  Padding char:null;  Var len format field:null
// Value
// [000000000000000]

// 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 
// ------------------------
// Field: 55, (IC卡数据域(Integrated Circuit Card System Related Data))
// Format: ANS...255;  Value type:ANS;  Len type: LLLVAR;  Len: 255
// Padding pos: null;  Padding char:null;  Var len format field:null
// Format: null;  Value type:null;  Len type: null;  Len: 0
// Padding pos: null;  Padding char:null;  Var len format field:null
// Value
// [�&2�yM/�j̟'������7����6��??� �??�$	�??�??????????_*�8??��????????????�3�ȟ4??�5"�51055165��??????�	??��A??�I_4�SR]

// 9f 26 08 32 e5 79 4d 2f cd 6a cc 9f 27 01 80 9f 
// 10 07 06 01 12 03 a0 f8 fa 9f 37 04 b5 8a 03 bf 
// 9f 36 02 05 9e 95 05 00 80 20 80 00 9a 03 24 04 
// 09 9c 01 00 9f 02 06 00 00 00 05 00 00 5f 2a 02 
// 07 02 82 02 38 00 9f 1a 02 07 02 9f 03 06 00 00 
// 00 00 00 00 9f 33 03 e0 b0 c8 9f 34 03 1e 03 00 
// 9f 35 01 22 9f 1e 08 35 31 30 35 35 31 36 35 84 
// 07 a0 00 00 00 03 10 10 9f 09 02 00 96 9f 41 04 
// 00 03 86 49 5f 34 01 01 9f 53 01 52 
// ------------------------
// Field: 62, (自定义域(Reserved Private))
// Format: ANS...999;  Value type:ANS;  Len type: LLLVAR;  Len: 999
// Padding pos: null;  Padding char:null;  Var len format field:null
// Format: null;  Value type:null;  Len type: null;  Len: 0
// Padding pos: null;  Padding char:null;  Var len format field:null
// Value
// [018376            000001-038649-018376]

// 30 31 38 33 37 36 20 20 20 20 20 20 20 20 20 20 
// 20 20 30 30 30 30 30 31 2d 30 33 38 36 34 39 2d 
// 30 31 38 33 37 36 
// ------------------------
//==========================================================================
const testHex2 =
  "600002000002003038078020C00204000000000000050000038649135918040900510001000200374341021234567895D281012112827360000000554F422D4F4E555330303030303030303030303030303001409F260832E5794D2FCD6ACC9F2701809F100706011203A0F8FA9F3704B58A03BF9F3602059E950500802080009A032404099C01009F02060000000500005F2A020702820238009F1A0207029F03060000000000009F3303E0B0C89F34031E03009F3501229F1E0835313035353136358407A00000000310109F090200969F4104000386495F3401019F53015200383031383337362020202020202020202020203030303030312D3033383634392D303138333736";
const testView2 = iso8583.toDataView(testHex2);

const rets2 = iso8583.values(testView2);

console.log(rets2);
