/**********************************************************************************************************************\
 *  BinSearchTree tests
 * --------------------------------------------------------------------------------------------------------------------
 *  Jest tests for BinSearchTree and BinSearchTreeNode classes.
 * ____________________________________________________________________________________________________________________
 *
 *  Copyright 2022 Chris Rider (csrider@gmail.com)                               
 *
 *  This Source Code Form is subject to the terms of the Mozilla Public License v. 2.0. If a copy of the MPL was not 
 *  distributed with this file, you can obtain one at http://mozilla.org/MPL/2.0/. 
 *
\**********************************************************************************************************************/
const BinSearchTree = require("./BinSearchTree");   // This, in turn, depends on ./BinSearchTreeNode.js


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////\\
/// GENERATE TREES AND POPULATE THEM WITH DATA
//|
//| INDEX:
//|   createTree10     Create and return a tree of data: [15,25,10,7,22,17,13,5,9,27]
//|   createTree3_a    Create and return a tree of data: [2,1,3]
//|   createTree3_b    Create and return a tree of data: [2,3,1]
//|   createTree3_c    Create and return a tree of data: [3,2,1]
//|   createTree3_d    Create and return a tree of data: [1,2,3]
//|___________________________________________________________________________________________________________________//

function createTree10() {
  const tree = new BinSearchTree();
  tree.insert(15);        //        15
  tree.insert(25);        //       /  \
  tree.insert(10);        //     10    25
  tree.insert(7);         //     /\    /\
  tree.insert(22);        //    7 13  22 27
  tree.insert(17);        //   /\    /
  tree.insert(13);        //  5  9  17
  tree.insert(5);
  tree.insert(9);
  tree.insert(27);
  return tree;
}

function createTree3_a() {
  const tree = new BinSearchTree();
  tree.insert(2);         //    2
  tree.insert(1);         //   / \
  tree.insert(3);         //  1   3
  return tree;
}

function createTree3_b() {
  const tree = new BinSearchTree();
  tree.insert(2);         //    2
  tree.insert(3);         //   / \
  tree.insert(1);         //  1   3
  return tree;
}

function createTree3_c() {
  const tree = new BinSearchTree();
  tree.insert(3);         //    3
  tree.insert(2);         //   / \
  tree.insert(1);         //  2   1
  return tree;
}

function createTree3_d() {
  const tree = new BinSearchTree();
  tree.insert(1);         //    1
  tree.insert(2);         //   / \
  tree.insert(3);         //  2   3
  return tree;
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////\\
//| MISC. HELPER FUNCTIONS
//|
//| INDEX:
//|   getRandomIntegerWithinRange     Generate a random integer within a given range.
//|___________________________________________________________________________________________________________________//

function getRandomIntegerWithinRange(min, max) {
  const randomSeed = Math.random();
  return Math.trunc(randomSeed * (max - min) + min);
}
let randomData = getRandomIntegerWithinRange(1000, 1999);  //Init, but you may reassign this as desired before tests!


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////\\
//| TEST ROUTINES
//|
//| INDEX:
//|   #1    Create tree (createTree10), and get correct root node [15]
//|   #2    Create tree (createTree10), and tree size is 10
//|   #3    Create tree (createTree10), add data lower than anything else [1], and tree size is 11
//|   #4    Create tree (createTree10), add data higher than anything else [100], and tree size is 11
//|   #5    Create tree (createTree10), add 2 nodes [1,100], and tree size is 12
//|   #6    Create tree (createTree10), add 4 nodes [1,100,500,1234], remove 1 node [500], and tree size is 13
//|   #7    Create tree [15,25,10,7,22,17,13,5,9,27], and retrieve node with minimum value (5)
//|   #8    Create tree [15,25,10,7,22,17,13,5,9,27], and retrieve correct existing node for 13
//|   #9    Create tree [15,25,10,7,22,17,13,5,9,27], and retrieve correct existing left child node for 13 (null)
//|   #10   Create tree [15,25,10,7,22,17,13,5,9,27], and retrieve correct existing left child node for 25 (22)
//|   #11   Create tree [15,25,10,7,22,17,13,5,9,27], and retrieve correct existing right child node for 10 (13)
//|   #12   Create tree [15,25,10,7,22,17,13,5,9,27], add random data, and retrieve correct node for that data
//|   #13   Create tree [15,25,10,7,22,17,13,5,9,27], then get expected in-order traversal path of existing data
//|   #14   Create tree [15,25,10,7,22,17,13,5,9,27], then get expected pre-order traversal path of existing data
//|   #15   Create tree [15,25,10,7,22,17,13,5,9,27], then get expected post-order traversal path of existing data
//|   #16   Create tree [15,25,10,7,22,17,13,5,9,27], then get expected level-order traversal path of existing data
//|   #17   Create tree [15,25,10,7,22,17,13,5,9,27], then get expected level count (4) of existing data
//|   #18   Create tree [2,1,3], then get expected level count (2) of existing data
//|   #19   Create tree [2,1,3], then get expected level-order traversal path of existing data
//|   #20   Create tree [2,3,1], then get expected level-order traversal path of existing data
//|   #21   Create tree [3,2,1], then get expected level-order traversal path of existing data
//|   #22   Create tree [1,2,3], then get expected level-order traversal path of existing data 
//|___________________________________________________________________________________________________________________//

/* Test #1 */
test("Create tree [15,25,10,7,22,17,13,5,9,27], and get correct root node [15]", () => {
  const bst = new createTree10();
  const rootNode = bst.getRootNode();
  expect(rootNode.data).toBe(15);
});

/* Test #2 */
test("Create tree [15,25,10,7,22,17,13,5,9,27], and tree size is 10", () => {
  const bst = new createTree10();
  expect(bst.size).toBe(10);
});

/* Test #3 */
test("Create tree [15,25,10,7,22,17,13,5,9,27], add data lower than anything else [1], and tree size is 11", () => {
  const bst = new createTree10();
  bst.insert(1);
  expect(bst.size).toBe(11);
});

/* Test #4 */
test("Create tree [15,25,10,7,22,17,13,5,9,27], add data higher than anything else [100], and tree size is 11", () => {
  const bst = new createTree10();
  bst.insert(100);
  expect(bst.size).toBe(11);
});

/* Test #5 */
test("Create tree [15,25,10,7,22,17,13,5,9,27], add 2 nodes [1,100], and tree size is 12", () => {
  const bst = new createTree10();
  bst.insert(1);
  bst.insert(100);
  expect(bst.size).toBe(12);
});

/* Test #6 */
test("Create tree [15,25,10,7,22,17,13,5,9,27], add 4 nodes [1,100,500,1234], remove 1 node [500], and tree size is 13", () => {
  const bst = new createTree10();
  bst.insert(1);
  bst.insert(100);
  bst.insert(500);
  bst.insert(1234);
  bst.remove(500);
  expect(bst.size).toBe(13);
});

/* Test #7 */
test("Create tree [15,25,10,7,22,17,13,5,9,27], and retrieve node with minimum value (5)", () => {
  const bst = new createTree10();
  const node = bst.findMinNode(bst.getRootNode());
  expect(node.data).toBe(5);
});

/* Test #8 */
test("Create tree [15,25,10,7,22,17,13,5,9,27], and retrieve correct existing node for 13", () => {
  const bst = new createTree10();
  const node = bst.search(bst.getRootNode(), 13);
  expect(node.data).toBe(13);
});

/* Test #9 */
test("Create tree [15,25,10,7,22,17,13,5,9,27], and retrieve correct existing left child node for 13 (null)", () => {
  const bst = new createTree10();
  const node = bst.search(bst.getRootNode(), 13);
  expect(node.left).toBe(null);
});

/* Test #10 */
test("Create tree [15,25,10,7,22,17,13,5,9,27], and retrieve correct existing left child node for 25 (22)", () => {
  const bst = new createTree10();
  const node = bst.search(bst.getRootNode(), 25);
  expect(node.left.data).toBe(22);
});

/* Test #11 */
test("Create tree [15,25,10,7,22,17,13,5,9,27], and retrieve correct existing right child node for 10 (13)", () => {
  const bst = new createTree10();
  const node = bst.search(bst.getRootNode(), 10);
  expect(node.right.data).toBe(13);
});

/* Test #12 */
randomData = getRandomIntegerWithinRange(100, Number.MAX_SAFE_INTEGER - 1);
test(`Create tree [15,25,10,7,22,17,13,5,9,27], add random data (), and retrieve correct node for that data`, () => {
  const bst = new createTree10();
  bst.insert(randomData);
  const node = bst.search(bst.getRootNode(), randomData);
  expect(node.data).toBe(randomData);
});

/* Test #13 */
test("Create tree [15,25,10,7,22,17,13,5,9,27], then get expected in-order traversal path of existing data", () => {
  const bst = new createTree10();
  const expectedPath = [5, 7, 9, 10, 13, 15, 17, 22, 25, 27];
  const arrPath = [];
  bst.inorder(bst.getRootNode(), arrPath);
  expect(arrPath.toString()).toBe(expectedPath.toString());
});

/* Test #14 */
test("Create tree [15,25,10,7,22,17,13,5,9,27], then get expected pre-order traversal path of existing data", () => {
  const bst = new createTree10();
  const expectedPath = [15, 10, 7, 5, 9, 13, 25, 22, 17, 27];
  const arrPath = [];
  bst.preorder(bst.getRootNode(), arrPath);
  expect(arrPath.toString()).toBe(expectedPath.toString());
});

/* Test #15 */
test("Create tree [15,25,10,7,22,17,13,5,9,27], then get expected post-order traversal path of existing data", () => {
  const bst = new createTree10();
  const expectedPath = [5, 9, 7, 13, 10, 17, 22, 27, 25, 15];
  const arrPath = [];
  bst.postorder(bst.getRootNode(), arrPath);
  expect(arrPath.toString()).toBe(expectedPath.toString());
});

/* Test #16 */
test("Create tree [15,25,10,7,22,17,13,5,9,27], then get expected level-order traversal path of existing data", () => {
  const bst = new createTree10();
  const expectedPath = [15, 10, 25, 7, 13, 22, 27, 5, 9, 17];
  const arrPath = [];
  bst.levelorder(bst.getRootNode(), arrPath);
  expect(arrPath.toString()).toBe(expectedPath.toString());
});

/* Test #17 */
test("Create tree [15,25,10,7,22,17,13,5,9,27], then get expected level count (4) of existing data", () => {
  const bst = new createTree10();
  const expectedCount = 4;
  const levelsCounted = bst.levelorder(bst.getRootNode());
  expect(levelsCounted).toBe(expectedCount);
});

/* Test #18 */
test("Create tree [2,1,3], then get expected level count (2) of existing data", () => {
  const bst = new createTree3_a();
  const expectedCount = 2;
  const levelsCounted = bst.levelorder(bst.getRootNode());
  expect(levelsCounted).toBe(expectedCount);
});

/* Test #19 */
test("Create tree [2,1,3], then get expected level-order traversal path of existing data", () => {
  const bst = new createTree3_a();
  const expectedPath = [2, 1, 3];
  const arrPath = [];
  bst.levelorder(bst.getRootNode(), arrPath);
  expect(arrPath.toString()).toBe(expectedPath.toString());
});

/* Test #20 */
test("Create tree [2,3,1], then get expected level-order traversal path of existing data", () => {
  const bst = new createTree3_b();
  const expectedPath = [2, 1, 3];
  const arrPath = [];
  bst.levelorder(bst.getRootNode(), arrPath);
  expect(arrPath.toString()).toBe(expectedPath.toString());
});

/* Test #21 */
test("Create tree [3,2,1], then get expected level-order traversal path of existing data", () => {
  const bst = new createTree3_c();
  const expectedPath = [3, 2, 1];
  const arrPath = [];
  bst.levelorder(bst.getRootNode(), arrPath);
  expect(arrPath.toString()).toBe(expectedPath.toString());
});

/* Test #22 */
test("Create tree [1,2,3], then get expected level-order traversal path of existing data", () => {
  const bst = new createTree3_d();
  const expectedPath = [1, 2, 3];
  const arrPath = [];
  bst.levelorder(bst.getRootNode(), arrPath);
  expect(arrPath.toString()).toBe(expectedPath.toString());
});
