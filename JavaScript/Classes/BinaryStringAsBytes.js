/**********************************************************************************************************************\
 *  BinaryStringAsBytes class
 * --------------------------------------------------------------------------------------------------------------------
 *  For easily working with (and efficiently storing) a long string of 0s and 1s.
 * 
 *  WARNING: This was imported from an old lab experiment, and not yet ready for production!
 * 
 *  Old Notes:
 *    For easily working with (and efficiently storing) a long string of 0s and 1s.
 *    Ex. "11111111" stored in 1B (as 255) instead of 8B.
 *    Ex. "1111111111111111" stored in 2B (as 65,535) instead of 16B.
 *    Ex. "11111111111111111111111111111111" stored in 4B (as 4,294,967,295), not 32B.
 *    How to use:
 *      1) Create an empty instance of specific size
 *      2) Populate the instance with your data (ex. setFromBinaryString('101'))
 *      3) Use your data as needed (ex. toBinaryString() -> '101')
 *    Example Usage:
 *      const binaryString = new BinaryStringAsBytes(numOfElements);
 *      binaryString.setFromBinaryString('01101001');
 *      console.log(binaryString.toBinaryString());
 * ____________________________________________________________________________________________________________________
 *
 *  Copyright 2022 Chris Rider (csrider@gmail.com)                               
 *
 *  This Source Code Form is subject to the terms of the Mozilla Public License v. 2.0. If a copy of the MPL was not 
 *  distributed with this file, you can obtain one at http://mozilla.org/MPL/2.0/. 
 *
\**********************************************************************************************************************/

class BinaryStringAsBytes {

  constructor(numOfBits) {
    this.MAX_SIZE = 32;
    this._name = BinaryStringAsBytes.name;
    if (numOfBits <= 8) {
      this.maxBitsAllowed = 8;
      this._dataRaw = new ArrayBuffer(1);
      this._dataInterface = new Uint8Array(this._dataRaw);
    } else if (numOfBits <= 16) {
      this.maxBitsAllowed = 16;
      this._dataRaw = new ArrayBuffer(2);
      this._dataInterface = new Uint16Array(this._dataRaw);
    } else if (numOfBits <= 32) {
      this.maxBitsAllowed = 32;
      this._dataRaw = new ArrayBuffer(4);
      this._dataInterface = new Uint32Array(this._dataRaw);
    } else {
      console.error(`${this._name}(${numOfBits}): ${this.MAX_SIZE} is max supported!`);
      this._initialized = false;
      return null;
    }
    this._numOfBits = numOfBits;
    this.maxAllowedDecimal = Math.pow(2, this.maxBitsAllowed) - 1;
    this._hasDataBeenSet = false;
    this._initialized = true;
    return this;
  }

  isInitialized() {
    if (!this._initialized) {
      console.error(`${this._name}: Did not initialize. Cannot use!`);
      return false;
    }
    return true;
  }

  hasBeenSet() {
    if (!this._hasDataBeenSet) {
      console.error(`${this._name}: Has no data. Be sure to set data!`)
      return false;
    }
    return true;
  }

  getSizeBytes() {
    if (!this.isInitialized()) return 0;
    return this._dataInterface.byteLength;
  }

  setFromBinaryString(str) {
    if (!this.isInitialized()) return;
    if (str.length > this.maxBitsAllowed) {
      console.error(`${this._name}: Input too big! (len ${str.length} !> ${this.maxBitsAllowed})`);
      return;
    }
    if (str.length === 0) {
      this._dataInterface[0] = null;
      this._hasDataBeenSet = false;
      return;
    }
    this._dataInterface[0] = this.binaryStrToIntByte(str);
    this._hasDataBeenSet = true;
    return this._dataInterface[0];
  }

  setFromDecimal(num) {
    if (!this.isInitialized()) return 0;
    if (num > this.maxAllowedDecimal) {
      console.error(`${this._name}: Input too big! (${num} !> ${this.maxAllowedDecimal})`);
      return 0;
    }
    this._dataInterface[0] = num;
    this._hasDataBeenSet = true;
    //return this.toBinaryString();
    return this.toNumberArray();
  }

  toBinaryString(boolPad) {
    if (!this.isInitialized() || !this.hasBeenSet()) return "";
    if (boolPad) {
      const padAmount = this._dataInterface.byteLength * 8;
      return this.intByteToBinaryStr(this._dataInterface).padStart(padAmount,'0');
    }
    return this.intByteToBinaryStr(this._dataInterface).padStart(this._numOfBits,'0');
  }

  toDecimalNumber() {
    if (!this.isInitialized() || !this.hasBeenSet()) return -1;
    return this._dataInterface[0];
  }

  toNumberArray() {
    if (!this.isInitialized() || !this.hasBeenSet()) return [];
    return this.toCharArray().reduce((arr,char) => {
      arr.push(Number.parseInt(char));
      return arr;
    }, []);
  }

  toCharArray() {
    if (!this.isInitialized() || !this.hasBeenSet()) return [];
    return this.binaryStrToCharArray(this.toBinaryString());
  }

  /** Helper functions... */
  intByteToBinaryStr(intByte, boolPad) {
    if (boolPad)
      return Number(intByte).toString(2).padStart(8,'0');
    return Number(intByte).toString(2);
  }
  binaryStrToIntByte(binStr) {
    return Number.parseInt(binStr,2);
  }
  binaryStrToCharArray(binStr) {
    return String(binStr).split('');
  }
}