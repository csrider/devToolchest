'use strict'
/**********************************************************************************************************************\
 *  SEARCH-RELATED CODE SNIPPETS FOR JAVASCRIPT
 * --------------------------------------------------------------------------------------------------------------------
 *  Usage:
 *    It's meant that you copy/paste these functions as snippets.
 *    If you execute this file, tests may run and be output to the console.
 *
 *  Index:
 *    BINARY SEARCH     Tools for binary searches.
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
//| BINARY SEARCH
//|   Tools for binary searches.
//|
//| Index:
//|   binarySearch_iterative    Iterative function to determine if a target exists in a sorted array.
//|   binarySearch_recursive    Recursive function to determine if a target exists in a sorted array.
//|____________________________________________________________________________________________________________________/

/** 
 * Iterative function to determine if a target exists in a sorted array.
 * Returns array index of the target. If not found, returns -1.
 * @param {array} arrSortedNums Array of sorted numbers to search within.
 * @param {number} numTarget Number to try to find in the array.
 */
function binarySearch_iterative(arrSortedNums, numTarget) {
  // Define the search space
  let leftBound = 0;
  let rightBound = arrSortedNums.length - 1;

  // Loop until the search space is exhausted
  while (leftBound <= rightBound) {
      // Find the mid-value in the search space
      let mid = Math.floor((leftBound + rightBound) / 2);

      // Check if target is found and return it if so
      if (numTarget == arrSortedNums[mid]) return mid;

      // Adjust our bounds to define the new search space
      if (numTarget < arrSortedNums[mid]) rightBound = mid - 1;
      if (numTarget >= arrSortedNums[mid]) leftBound = mid + 1;
  }

  return -1;
}
test(binarySearch_iterative, [[1,2,3,4,5], 3], 2);
test(binarySearch_iterative, [[1,2,3,4,5], 1], 0);
test(binarySearch_iterative, [[1,2,3,4,5], 5], 4);
test(binarySearch_iterative, [[1,2,3,4,5], 6], -1);
test(binarySearch_iterative, [[2,5,6,8,9,10], 5], 1);
test(binarySearch_iterative, [Array.from(Array(999999).keys()), 986], 986);

/** 
 * Recursive function to determine if a target exists in a sorted array.
 * Returns array index of the target. If not found, returns -1.
 * @param {array} arrSortedNums Array of sorted numbers to search within.
 * @param {number} numTarget Number to try to find in the array.
 */
function binarySearch_recursive(arrSortedNums, numTarget, leftBound, rightBound) {
  if (!leftBound) leftBound = 0;
  if (!rightBound) rightBound = arrSortedNums.length - 1;

  // Base condition: (search space is exhausted)
  if (leftBound > rightBound) return -1;

  // Find the mid-value in the search space
  let mid = Math.floor((leftBound + rightBound) / 2);

  // Base condition: (a target is found)
  if (numTarget == arrSortedNums[mid]) return mid;

  // Adjust our bounds to define the new search space
  if (numTarget < arrSortedNums[mid])
      return binarySearch_recursive(arrSortedNums, numTarget, leftBound, mid - 1);
  if (numTarget >= arrSortedNums[mid])
      return binarySearch_recursive(arrSortedNums, numTarget, mid + 1, rightBound);
}
test(binarySearch_recursive, [[1,2,3,4,5], 3], 2);
test(binarySearch_recursive, [[1,2,3,4,5], 1], 0);
test(binarySearch_recursive, [[1,2,3,4,5], 5], 4);
test(binarySearch_recursive, [[1,2,3,4,5], 6], -1);
test(binarySearch_recursive, [[2,5,6,8,9,10], 5], 1);
test(binarySearch_recursive, [Array.from(Array(999999).keys()), 986], 986);