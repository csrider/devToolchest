/**********************************************************************************************************************\
 *  BinarySearchTreeNode class
 * --------------------------------------------------------------------------------------------------------------------
 *  JavaScript implementation of a Binary Search Tree Node (with numerical data).
 * 
 *  A binary search tree is a binary tree in which nodes that have lesser values are stored on the left,
 *  while nodes that have higher values are stored at the right.
 * 
 *  This class is for the nodes that make up such a tree.
 * ____________________________________________________________________________________________________________________
 *
 *  Copyright 2022 Chris Rider (csrider@gmail.com)                               
 *
 *  This Source Code Form is subject to the terms of the Mozilla Public License v. 2.0. If a copy of the MPL was not 
 *  distributed with this file, you can obtain one at http://mozilla.org/MPL/2.0/. 
 *
\**********************************************************************************************************************/

class BinarySearchTreeNode {
  /**
   * Construct a BinarySearchTreeNode containing the specified numerical data.
   * @param {number} data 
   */
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

module.exports = BinarySearchTreeNode;