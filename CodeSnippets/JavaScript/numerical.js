/**********************************************************************************************************************\
**  Numerical Code Snippets for JavaScript
** --------------------------------------------------------------------------------------------------------------------
**
**  These are meant to be copied-pasted as needed.
**
**  Index:
**    Digit Manipulation, Conversion, and Counting
**
** ____________________________________________________________________________________________________________________
**
**  Copyright 2022 Chris Rider (csrider@gmail.com)                               
**
**  This Source Code Form is subject to the terms of the Mozilla Public License v. 2.0. If a copy of the MPL was not 
**  distributed with this file, you can obtain one at http://mozilla.org/MPL/2.0/. 
**
\**********************************************************************************************************************/
//function preventExecution() {return "This file is not meant to be executed!";}
//preventExecution();


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Digit Manipulation, Conversion, and Counting
//

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
 * Converts an integer to its string representation in the specified base-system. Note: You should use built-in 
 * String.toString when possible, actually. But this could allow you to use higher base-systems (currently supports
 * up to base-81).
 * @param {number} numInteger - An integer to convert to a string representation.
 * @param {number} [numBase=10] - The base system to use (e.g. decimal=10, binary=2). Defaults to 10.
 * @returns {string} Integer represented as a string of digits in the specified base.
 */
function intToStr(numInteger, numBase) {
  // Configure
  const BASE_TO_10 = "0123456789";                                //define characters for up to base-10
  const BASE_TO_26 = BASE_TO_10 + "ABCDEFGHIJKLMNOPQRSTUVWXYZ";   //define characters for up to base-26
  const BASE_TO_52 = BASE_TO_26 + "abcdefghijklmnopqrstuvwxyz";   //define characters for up to base-52
  const BASE_TO_81 = BASE_TO_52 + "!#$%&()*+,-./:;<=>?@[\]^_{|}~" //define characters for up to base-81
  const BASE_TO_SUPPORT = BASE_TO_52;                             //which of the above bases to support conversion to
  const MIN_BASE = 2;                                             //anything < 2 would be meaningless (all 0's)
  const MAX_BASE = BASE_TO_SUPPORT.length;

  // Input validation and normalization
  if (!numInteger) return null;
  if (typeof numInteger === 'string') return numInteger;
  if (!Number.isInteger(numInteger)) return null;
  if (!numBase || !Number.isInteger(numBase)) numBase = 10;       //default to base-10 (decimal)
  if (numBase < MIN_BASE || numBase > MAX_BASE) return null;      //can't represent outside these ranges

  // Define base sequences
  //if (numBase)
  
  // Define a recursive function to work on the conversion
  function recurse(n) {
    const rightDigit = n % numBase;                               //right-most digit
    const leftDigits = Math.trunc(n / numBase);                   //remaining higher-order digits
    if (n < 0) return "-" + recurse(-n);                          //handle negative number
    if (n < numBase) return BASE_TO_52.substring(n, n+1);         //base: return digit simpler than base
    return recurse(leftDigits) + BASE_TO_52.charAt(rightDigit);   //continue processing, being done with this digit
  }

  return recurse(numInteger);
}
test(intToStr, [8, undefined], Number(8).toString(10));
test(intToStr, [128, undefined], Number(128).toString(10));
test(intToStr, [8, 16], Number(8).toString(16).toUpperCase());
test(intToStr, [127, 15], Number(127).toString(16).toUpperCase());
test(intToStr, [8, 2], "1000");
test(intToStr, [16, 2], "10000");


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Testing
//
function test(fn, arrInput, expected) {
  const COLOR_RED = "\x1b[31m";
  const COLOR_GREEN = "\x1b[32m";
  const COLOR_RESET = "\x1b[0m";
  const EMOJI_PASS = "\u2713";
  const EMOJI_FAIL = "\u2718";
  const markStart = "mark_start", markEnd = "mark_end";

  let output = "";
  const outputTestParams = `${fn.name}(${[...arrInput]})`;
  
  performance.mark(markStart);
  const r = fn(...arrInput);
  performance.mark(markEnd);
  performance.measure("measure from start to end", markStart, markEnd);
  //console.log(performance.nodeTiming.duration);
  const perfDuration = performance.nodeTiming.duration.toFixed(3).toString() + "ms";
  
  if (r == expected) {
    output += `${COLOR_GREEN}${EMOJI_PASS} PASSED TEST (${perfDuration}):${COLOR_RESET} ${outputTestParams}`;
  } else {
    output += `${COLOR_RED}${EMOJI_FAIL} FAILED TEST (${perfDuration}):${COLOR_RESET} ${outputTestParams}\n`;
    output += `   ${COLOR_RED}Got "${r}"(${typeof r}). Expected "${expected}"(${typeof expected})${COLOR_RESET}`;
  }

  console.log(output);
}