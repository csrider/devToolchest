'use strict'
/**********************************************************************************************************************\
 *  NUMERICAL CODE SNIPPETS FOR JAVASCRIPT
 * --------------------------------------------------------------------------------------------------------------------
 *  Usage:
 *    It's meant that you copy/paste these functions as snippets.
 *    If you execute this file, tests may run and be output to the console.
 *
 *  Index:
 *    GENERATION          Tools for generating and creating numbers, digits, etc.
 *    COUNTING            Tools for counting and related.
 *    PARSING             Tools for parsing and extracting digits and parts.
 *    CONVERSION          Tools for converting in various ways.
 *    MANIPULATION        Tools for modifying and manipulating numbers.
 *    CALCULATION         Tools for calculating things of various nature.
 *    LAB & EXPERIMENTS   Experimental/playing-around kind of stuff.
 * ____________________________________________________________________________________________________________________
 *
 *  Copyright 2022 Chris Rider (csrider@gmail.com)                               
 *
 *  This Source Code Form is subject to the terms of the Mozilla Public License v. 2.0. If a copy of the MPL was not 
 *  distributed with this file, you can obtain one at http://mozilla.org/MPL/2.0/. 
 *
\**********************************************************************************************************************/
import test from "./_test_driver.js";


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////\
///~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\
//| GENERATION
//|   Tools for generating and creating numbers, digits, etc.
//|
//| Index:
//|   genBinPerms_asCharArrays        Generate All Unique Permutations of a Binary String (as character array).
//|____________________________________________________________________________________________________________________/

/**
 * Generate All Unique Permutations of a Binary String (as character array).
 * Iterative approach, converts integer to binary string and pads as needed.
 * WARNING: This will have VERY HIGH time complexity with large n-values!
 * TC: O((2^N)*2), SC: O(N)
 * @param {number} n - Number of binary digits to generate.
 * @param {array} result - Reference of array to save generated data to.
 */
function genBinPerms_asCharArrays(n, result) {
  //[ ['0','0','0','0','1'], ... ]
  const numPerms = Math.pow(2, n);
  const arrPerm = new Array(n).fill(0);
  for (let i = 0; i < numPerms; i++) {
    // Convert each i into its binary representation.
    // This not only guarantees uniqueness, but also gives us strings in order.
    const strPerm = i.toString(2);

    const arrPerm = new Array(n - strPerm.length).fill("0");
    arrPerm.push(...strPerm.split(""));
    result.push(arrPerm);
  }
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////\
///~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\
//| COUNTING
//|   Tools for counting and related.
//|
//| Index:
//|   getNumberOfPlaces               Determine how many place-values (digits) are in the provided number.
//|____________________________________________________________________________________________________________________/

/**
 * Determine how many place-values (digits) are in the provided number.
 * Mathematical Formula:  floor(log(|x|)) + 1
 * @param {Number} num The numerical value to count number of place-values for.
 * @return {Number} The number of place-values (digits) in the provided number.
 */
function getNumberOfPlaces(num) {
  // Input validatation and normalization
  if (num === undefined) return 0;
  if (num < 0) num = Math.abs(num); //We only want to work with positive numbers

  // Work and return the result
  return Math.floor(Math.log10(num)) + 1;
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////\
///~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\
//| PARSING
//|   Tools for parsing and extracting digits and parts.
//|
//| Index:
//|   getRightmostDigit               Uses arithmetic to find and returns the right-most digit of an integer.
//|   findNextBinNum_forDec_getDecInt Find the next binary number of a decimal and return its decimal version.
//|   findNextBinNum_forDec_getBinStr Find the next binary number of a decimal and return its binary string.
//|____________________________________________________________________________________________________________________/

/**
 * Uses arithmetic to find and returns the right-most digit of an integer.
 * @param {number} numInteger An integer to get the right-most digit of.
 * @param {number} [numBase=10] The base system to use (e.g. decimal=10, binary=2). Defaults to 10.
 * @returns {number|null} The right-most digit of the provided integer, or null.
 */
function getRightmostDigit(numInteger, numBase) {
  // Input validation and normalization
  if (!numInteger || !Number.isInteger(numInteger)) return null;
  if (!numBase || !Number.isInteger(numBase)) numBase = 10;

  // Work and return the result
  return numInteger % numBase;
}

/**
 * Find the next binary number of a decimal and return its decimal version.
 * Ex. Next of 4 (100) is 8 (1000)
 */
function findNextBinNum_forDec_getDecInt(x) {
  //const numBinDigits = Math.log(x) / Math.log(2);
  //console.log(`Finding next binary number for decimal input of x = ${x}`);
  //console.log(`Binary of input: ${x.toString(2).padStart(numBinDigits+2,'0')} (${x})`);
  const smallest = x & -x;
  const ripple = x + smallest;
  const newSmallest = ripple & -ripple;
  const ones = ((newSmallest / smallest) >> 1) - 1;
  //console.log(`         RETURN: ${(ripple|ones).toString(2)} (${ripple | ones})`);
  return ripple | ones;
}

/**
 * Find the next binary number of a decimal and return its binary string.
 * Ex. Next of 4 (100) is 1000 (8)
 */
function findNextBinNum_forDec_getBinStr(x, numCharsToPadDesired) {
  let numBinDigits = Math.log(x) / Math.log(2) + 2; //answer will add 1 digit
  if (numBinDigits <= numCharsToPadDesired)
    numBinDigits = numBinDigits + (numCharsToPadDesired - numBinDigits);
  //NOTE: Only works for first level doubling!
  else
    numBinDigits =
      numBinDigits +
      (numCharsToPadDesired - (numBinDigits - numCharsToPadDesired));
  console.log(`Finding next binary number for decimal input of x = ${x}`);
  console.log(
    `Binary of input: ${x.toString(2).padStart(numBinDigits, " ")} (${x})`
  );
  const smallest = x & -x;
  const ripple = x + smallest;
  const newSmallest = ripple & -ripple;
  const ones = ((newSmallest / smallest) >> 1) - 1;
  console.log(
    `         RETURN: ${(ripple | ones)
      .toString(2)
      .padStart(numBinDigits, "0")} (${ripple | ones})`
  );
  return (ripple | ones).toString(2).padStart(numBinDigits, "0");
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////\
///~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\
//| CONVERSION
//|   Tools for converting in various ways.
//|
//| Index:
//|   toBinString   [DEPRECATED] Convert Byte to Binary String.
//|   intToStr      Converts integer to its string representation in specified base (beyond base-36).
//|____________________________________________________________________________________________________________________/

/**
 * Convert Byte to Binary String.
 * Originally conceived to accept data from Uint8Array buffer.
 * ![DEPRECATED in favor of intToStr below]!
 */
function toBinString(bytes) {
  const fnReduce = (str, byte) => {
    return str + byte.toString(2).padStart(8, "0");
  };

  bytes.reduce(fnReduce, "");
}

/**
 * Converts an integer to its string representation in the specified base-system (beyond base-36).
 * Note: You should use built-in String.toString when possible, actually. But this could allow you to use
 * higher base-systems (currently supports up to base-81).
 * @param {number} numInteger - An integer to convert to a string representation.
 * @param {number} [numBase=10] - The base system to use (e.g. decimal=10, binary=2). Defaults to 10.
 * @returns {string|null} Integer represented as a string of digits in the specified base, or null if problem.
 */
function intToStr(numInteger, numBase) {
  // Configure
  const BASE_TO_10 = "0123456789"; //define characters for up to base-10
  const BASE_TO_26 = BASE_TO_10 + "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; //define characters for up to base-26
  const BASE_TO_52 = BASE_TO_26 + "abcdefghijklmnopqrstuvwxyz"; //define characters for up to base-52
  const BASE_TO_81 = BASE_TO_52 + "!#$%&()*+,-./:;<=>?@[]^_{|}~"; //define characters for up to base-81
  const BASE_TO_SUPPORT = BASE_TO_52; //which of the above bases to support conversion to
  const MIN_BASE = 2; //anything < 2 would be meaningless (all 0's)
  const MAX_BASE = BASE_TO_SUPPORT.length;

  // Input validation and normalization
  if (!numInteger) return null;
  if (typeof numInteger === "string") return numInteger;
  if (!Number.isInteger(numInteger)) return null;
  if (!numBase || !Number.isInteger(numBase)) numBase = 10; //default to base-10 (decimal)
  if (numBase < MIN_BASE || numBase > MAX_BASE) return null; //can't represent outside these ranges

  // Define a recursive function to work on the conversion
  function recurse(n) {
    const rightDigit = n % numBase; //right-most digit
    const leftDigits = Math.trunc(n / numBase); //remaining higher-order digits
    if (n < 0) return "-" + recurse(-n); //handle negative number
    if (n < numBase) return BASE_TO_52.substring(n, n + 1); //base: return digit simpler than base
    return recurse(leftDigits) + BASE_TO_52.charAt(rightDigit); //continue processing, being done with this digit
  }

  return recurse(numInteger);
}
test(intToStr, [8, undefined], Number(8).toString(10));
test(intToStr, [128, undefined], Number(128).toString(10));
test(intToStr, [128, {hello: "world"}], Number(128).toString(10));
test(intToStr, [8, 16], Number(8).toString(16).toUpperCase());
test(intToStr, [127, 16], Number(127).toString(16).toUpperCase());
test(intToStr, [8, 2], "1000");
test(intToStr, [16, 2], "10000");


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////\
///~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\
//| MANIPULATION
//|   Tools for modifying and manipulating numbers.
//|
//| Index:
//|
//|____________________________________________________________________________________________________________________/


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////\
///~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\
//| CALCULATION
//|   Tools for calculating things of various nature.
//|
//| Index:
//|
//|____________________________________________________________________________________________________________________/

/** 
 * Linear Interpolation function
 * Calculates in the following manner:
 *  - When t is 0, the "(B-A)*t" part is 0, so you only have A
 *  - When t is 1, the "-A" (in parentheses) cancels out the first A, so you only have B
 *  - When t is between 0 and 1, you're left with half the difference between A and B
 * Useful for example, in knowing where to draw lane markings on a road, given N number of lanes.
 * @param {number} A Value #1 or minimum range
 * @param {number} B Value #2 or maximum range
 * @param {number} t Percentage
 * @returns {number} 
 */
function lerp(A, B, t) {
  return A + (B - A) * t;
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////\
///~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\
//| LAB & EXPERIMENTS
//|   Experimental/playing-around kind of stuff.
//|   This is playground kinda stuff, not yet finished, or organized, etc.
//|____________________________________________________________________________________________________________________/

function genBinPerms_1b(n, result) {
  //[ ['0','0','0','0','1'], ... ]
  const numPerms = Math.pow(2, n);
  for (let i = 1; i < numPerms; i++) {
    const arrPerm = i.toString(2).split("");
    const arrPermFinal = new Array(n - arrPerm.length).fill("0");
    arrPermFinal.push(...arrPerm);
    result.push(arrPerm);
  }
}
function genBinPerms_1c(n, result) {
  //[ '00001', ... ]
  const numPerms = Math.pow(2, n);
  for (let i = 1; i < numPerms; i++) {
    const strPerm = i.toString(2).padStart(n, "0");
    result.push(strPerm);
  }
}
function genBinPerms_1z(n, strOffMask) {
  if (!strOffMask) strOffMask = "0".padStart(n, "0");
  const numPerms = Math.pow(2, n);
  const uniquePerms = new Set();
  const arrPerm = new Array(numPerms).fill(0);
  uniquePerms.add(arrPerm.toString());
  let l = 0,
    r = numPerms;
  while (l < r) {
    if (arrSeed[l]) l++, r--;
  }
}
function genBinPerms_2(n, arr, i, result) {
  //[ [0,0,0,0,1], ... ]
  if (i === n) {
    result.push([...arr]);
    return;
  }
  arr[i] = 0;
  genBinPerms_2(n, arr, i + 1, result);
  arr[i] = 1;
  genBinPerms_2(n, arr, i + 1, result);
}
function genBinPerms_2b(n, strOffMask) {
  const result = [];
  const arr = new Array(n).fill(0);
  recurse(n, arr, 0);
  function recurse(n, arr, i) {
    // Once we go outside range of array (essentially null), end recursion
    if (i === n) {
      result.push([...arr]); //[ [0,0,0,0,1], ... ]
      return;
    }

    // First, assign 0 at i-th position, then try all other perms for remaining positions
    arr[i] = 0;
    recurse(n, arr, i + 1);

    // And then, assign 1 at i-th position, then try all other perms for remaining positions
    // (but only if strOffMask indicates 1 is allowed for this i-th position)
    if (strOffMask[i] != "1") {
      arr[i] = 1;
      recurse(n, arr, i + 1);
    } else return;
  }
  return result;
}
function genBinPerms_3(n, arr) {
  const numPerms = Math.pow(2, n);
  //const arr = new Array(n).fill(0)
  for (let i = 1; i <= numPerms; i++)
    arr[i - 1] = i.toString(2).padStart(n, "0");
}
