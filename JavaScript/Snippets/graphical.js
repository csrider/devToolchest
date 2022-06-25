'use strict'
/**********************************************************************************************************************\
 *  GRAPHICAL CODE SNIPPETS FOR JAVASCRIPT
 * --------------------------------------------------------------------------------------------------------------------
 *  Usage:
 *    It's meant that you copy/paste these functions as snippets.
 *    If you execute this file, tests may run and be output to the console.
 *
 *  Index:
 *    COODINATES          Tools for generating and creating numbers, digits, etc.
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
//| COODINATES
//|   
//|____________________________________________________________________________________________________________________/

/** Determine whether two polygons intersect
 * Note: If used with animation that's really fast, this might not get called with enough resolution!
 * @param {*} poly1 
 * @param {*} poly2 
 * @returns 
 */
 function polysIntersect(poly1, poly2) {
  // For every point in polygon 1, see if it would intersect with polygon 2
  for (let i = 0; i < poly1.length; i++) {
    for (let j = 0; j < poly2.length; j++) {
      const touch = getIntersection(
        poly1[i], 
        poly1[(i+1)%poly1.length],  //mod to reconnect back to starting-point (and avoid array-out-of-bounds)
        poly2[j],
        poly2[(j+1)%poly2.length]   //mod to reconnect back to starting-point (and avoid array-out-of-bounds)
      );
      if (touch) {
        return true;
      }
    }
  }
  return false
}


/** getLineSegmentIntersection
 * Calculate the intersection point of two line segments
 * @param {number} A 
 * @param {number} B 
 * @param {number} C 
 * @param {number} D 
 * @returns {object} Coordinate of the intersection, as well as offset (for car size)
 */
 function getLineSegmentIntersection(A, B, C, D) {
  const tTop = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x);
  const uTop = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y);
  const bott = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y);

  const lerp = (A, B, t) => A + (B - A) * t;  //linear interpolation function

  if (bott !== 0) {
    const t = tTop / bott;
    const u = uTop / bott;
    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
      return {
        x: lerp(A.x, B.x, t),
        y: lerp(A.y, B.y, t),
        offset: t
      };
    }
  }

  return null;
}