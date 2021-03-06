'use strict'
/**********************************************************************************************************************\
 *  TESTS DRIVER FOR JAVASCRIPT
 * --------------------------------------------------------------------------------------------------------------------
 *  Usage:
 *    It's meant that you import this into whatever file you want to enable testing on.
 *      Ex) import test from "./_test_driver.js";
 *    Then you simply call the a test function as appropriate for whatever you want to test.
 *      Ex) test(intToStr, [127, 16], Number(127).toString(16).toUpperCase());
 *
 *  Index:
 *    
 * ____________________________________________________________________________________________________________________
 *
 *  Copyright 2022 Chris Rider (csrider@gmail.com)                               
 *
 *  This Source Code Form is subject to the terms of the Mozilla Public License v. 2.0. If a copy of the MPL was not 
 *  distributed with this file, you can obtain one at http://mozilla.org/MPL/2.0/. 
 *
\**********************************************************************************************************************/


/**
 * Test a function, with input(s) and expected result.
 * Will console-log the results and performance stats.
 * @param {function} fn Reference to the function you want to test.
 * @param {array} arrInput An array of input data to feed into the function you want to test.
 * @param {any} expected The exact result you expect (data type and value).
 * @returns {boolean} Whether the test passed or not.
 */
export default function test(fn, arrInput, expected) {
  // Configure
  const maxLogLength_inputArg = 40;
  
  // Constants
  const COLOR_RED = "\x1b[31m";
  const COLOR_GREEN = "\x1b[32m";
  const COLOR_RESET = "\x1b[0m";
  const EMOJI_PASS = "\u2713";
  const EMOJI_FAIL = "\u2718";

  let ret = undefined;
  let output = "";
  let outputTestParams = `${fn.name}(`
  for (let i = 0; i < arrInput.length; i++) {
    const arg = arrInput[i];
    let argOutput;

    // Present various data types nicely
    if (Array.isArray(arg)) argOutput = `[${[...arg]}]`;
    else if (typeof arg === 'object') argOutput = `{${[...Object.entries(arg)]}}`;
    else if (typeof arg === 'string') argOutput = `"${arg}"`;
    else if (typeof arg === 'number') argOutput = `${arg}`;
    else if (typeof arg === 'function') argOutput = `fn:${arg}`;
    else {
      argOutput = `${arg}`;
      //console.log(`test(): Unhandled arrInput element data type (${typeof arg}). Logging as default.`);
    }

    // Truncate middle portion if will be too long to look nice
    if (argOutput.length > maxLogLength_inputArg) {
      const separator = '...';
      const charsToShow = maxLogLength_inputArg - separator.length;
      const numFrontChars = Math.ceil(charsToShow/2);
      const numBackChars = Math.floor(charsToShow/2);
      const truncOutFront = argOutput.substring(0, numFrontChars);
      const truncOutBack = argOutput.substring(argOutput.length - numBackChars);
      const truncatedOutput = truncOutFront + separator + truncOutBack;
      argOutput = truncatedOutput;
    }

    // If more input parameters coming, delineate them nicely
    if (i !== arrInput.length - 1) argOutput += ', ';

    outputTestParams += argOutput;
  }
  outputTestParams += ')';
  const markStart = "mark_start", markEnd = "mark_end";

  performance.mark(markStart);
  const r = fn(...arrInput);
  //performance.mark(markEnd);
  //const perfMeasure = performance.measure(`Measure: ${fn.name}([${[...arrInput]}])`, markStart, markEnd);
  const perfMeasure = performance.measure(`Measure: ${fn.name}([${[...arrInput]}])`, markStart);
  const perfDuration = perfMeasure.duration.toFixed(3).toString() + "ms";
  performance.clearMarks;
  performance.clearMeasures;
  
  if (r == expected) {
    ret = true;
    output += `${COLOR_GREEN}${EMOJI_PASS} PASSED TEST (${perfDuration}):\t${COLOR_RESET} ${outputTestParams}`;
  } else {
    ret = false;
    output += `${COLOR_RED}${EMOJI_FAIL} FAILED TEST (${perfDuration}):\t${COLOR_RESET} ${outputTestParams}\n`;
    output += `   ${COLOR_RED}Got "${r}"(${typeof r}). Expected "${expected}"(${typeof expected})${COLOR_RESET}`;
  }

  console.log(output);

  return ret;
}