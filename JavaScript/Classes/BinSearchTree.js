/**********************************************************************************************************************\
 *  BinSearchTree class
 * --------------------------------------------------------------------------------------------------------------------
 *  My JavaScript implementation of a Binary Search Tree.
 * 
 *  A binary search tree is a binary tree in which nodes that have lesser values are stored on the left,
 *  while nodes that have higher values are stored at the right.
 * 
 *  METHODS:
 *  {BinSearchTreeNode}         insert      ({number})
 *  {BinSearchTreeNode}|{null}  remove      ({number})
 *  {BinSearchTreeNode}|{null}  findMinNode ([{BinSearchTreeNode}])
 *  {BinSearchTreeNode}|{null}  getRootNode ()
 *  {undefined}                 inorder     ({BinSearchTreeNode}, [{array[number]}])
 *  {undefined}                 preorder    ({BinSearchTreeNode}, [{array[number]}])
 *  {undefined}                 postorder   ({BinSearchTreeNode}, [{array[number]}])
 *  {number}                    levelorder  ({BinSearchTreeNode}, [{array[number]}], [{array[BinSearchTreeNode]}])
 *  {BinSearchTreeNode}|{null}  search      ({BinSearchTreeNode}, {number})
 * 
 *  USAGE EXAMPLES:
 *  const BinSearchTree = require("./BinSearchTree"); // Import this class and its dependencies
 *  const bst = new BinSearchTree();                  // Create a binary search tree   
 *  bst.insert(3);                                    // Populate the tree with a node containing data value 3      3   
 *  bst.insert(2);                                    // Populate the tree with a node containing data value 2     / \  
 *  bst.insert(1);                                    // Populate the tree with a node containing data value 1    1   2 
 *  let root = bst.getRootNode();                     // Get the root node of the tree
 *  let arrPath = []; bst.inorder(root, arrPath);     // In-order traversal (arrPath will be populated as: [1,2,3])
 *  let arrPath = []; bst.preorder(root, arrPath);    // Pre-order traversal (arrPath will be populated as: [3,1,2])
 *  let arrPath = []; bst.postorder(root, arrPath);   // Post-order traversal (arrPath will be populated as: [1,2,3])
 * ____________________________________________________________________________________________________________________
 *
 *  Copyright 2022 Chris Rider (csrider@gmail.com)                               
 *
 *  This Source Code Form is subject to the terms of the Mozilla Public License v. 2.0. If a copy of the MPL was not 
 *  distributed with this file, you can obtain one at http://mozilla.org/MPL/2.0/. 
 *
\**********************************************************************************************************************/
const BinSearchTreeNode = require('./BinSearchTreeNode');

class BinSearchTree extends BinSearchTreeNode {
  /** Construst a BinSearchTree.
   */
  constructor() {
    super();
    this.root = null;
    this.size = 0;
  }

  /** Creates a new node with the provided data, and then inserts it in the tree.
   * @param {number} data Numerical data to create a node for and insert into the tree.
   * @returns {BinSearchTreeNode} Node that was inserted for which the data was created.
   */
  insert(data) {
    // Create a node and initialize it with the data...
    const newNode = new BinSearchTreeNode(data);

    // If the tree's root is null, then this new node will become the root...
    if (this.root === null) this.root = newNode;
    
    // Else, find the correct position in the tree and add the new node...
    else this.#insertNode(this.root, newNode);

    // Update the size of the tree
    this.size++;

    return newNode;
  }

  /** Insert a node in a tree. Traverses the tree to find the location to insert.
   * @param {BinSearchTreeNode} node Existing node where to insert the new node.
   * @param {BinSearchTreeNode} newNode New node to insert into the tree.
   */
  #insertNode(node, newNode) {
    // If the new node's data is less-than the existing node's data, move to left...
    if (newNode.data < node.data) {
      if (node.left === null) node.left = newNode;    //if left child is null, insert new node here
      else this.#insertNode(node.left, newNode);      //else recurse until null is found
    }
    // Else the new node's data is greater-than the existing node's data, move to right...
    else {
      if (node.right === null) node.right = newNode;  //if right child is null, insert new node here
      else this.#insertNode(node.right, newNode);     //else recurse until null is found
    }
  }

  /** Remove a node containing the given data.
   * @param {number} data The data to find and remove from the tree.
   * @returns {BinSearchTreeNode|null} The tree's root node (or null if tree is empty).
   */
  remove(data) {
    // Root is reinitialized with root of a modified tree
    this.root = this.#removeNode(this.root, data);

    // Update the size of the tree
    if (this.size > 0) this.size--;

    return this.root;
  }

  /** Remove the node containing the given data, starting the search for it at given node.
   * @param {BinSearchTreeNode} node The node at which to begin the search for given data to delete.
   * @param {number} data The data to search for and delete.
   * @returns {BinSearchTreeNode|null} The tree's root node after any node is removed (or null if nothing removed).
   */
  #removeNode(node, data) {
    // If the root is null, then tree is empty
    if (node === null) return null;

    // If data to be deleted is less-than root's data, then move to left subtree
    else if (data < node.data) {
      node.left = this.#removeNode(node.left, data);
      return node;
    }

    // If data to be deleted is greater-than root's data, then move to right subtree
    else if (data > node.data) {
      node.right = this.#removeNode(node.right, data);
      return node;
    }

    // Else data to be deleted must be same as root's data, so delete this node
    else {
      // Deleting (leaf) node with no children...
      //  Explanation: As leaf nodes do not have any children, they can be easily removed and null is returned
      //  to the parent node.
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }

      // Deleting node with one child...
      //  Explanation: If a node has a left child, then we update the pointer of the parent node to the left child of
      //  the node to be deleted and similarly, if a node have a right child then we update the pointer of the parent
      //  node to the right child of the node to be deleted.
      if (node.left === null) {
        node = node.right;
        return node;
      }
      else if (node.right === null) {
        node = node.left;
        return node;
      }

      // Deleting node with two children, minimum node of right subtree saved to temp...
      //  Explanation: In order to delete a node with two children we find the node with minimum value in its right
      //  subtree and replace this node with the minimum valued node and remove the minimum valued node from the tree.
      const temp = this.findMinNode(node.right);
      node.data = temp.data;

      node.right = this.removeNode(node.right, temp.data);
      return node;
    }
  }

  /** Find the minimum node in the tree, starting search from given node.
   * @param {BinSearchTreeNode} [node] (optional) Node at which to begin the search, if other than root node.
   * @returns {BinSearchTreeNode|null} The node found (or null if not found).
   */
  findMinNode(node) {
    if (node === undefined) node = this.getRootNode();
    if (node === null) return null;
    // If node's left child is null, then it must be a minimum node
    if (node.left === null) return node;
    else return this.findMinNode(node.left);
  }

  /** Returns the root node of the tree.
   * @returns {BinSearchTreeNode|null} The root node of the tree (or null if tree is empty).
   */
  getRootNode() {
    return this.root;
  }

  /** Performs an in-order traversal of the tree (work is done as we descend to children).
   * @param {BinSearchTreeNode} node Node at which to begin traversal.
   * @param {array} [arrPath] (optional) Array to save the data in the traversal path to.
   */
  inorder(node, arrPath) {
    if (node !== null) {
      this.inorder(node.left, arrPath);
      if (arrPath !== undefined) arrPath.push(node.data);
      this.inorder(node.right, arrPath);
    }
  }

  /** Performs a pre-order traversal of the tree (work is done before descending to children).
   * @param {BinSearchTreeNode} node Node at which to begin traversal.
   * @param {array} [arrPath] (optional) Array to save the data in the traversal path to.
   */
  preorder(node, arrPath) {
    if (node !== null) {
      if (arrPath !== undefined) arrPath.push(node.data);
      this.preorder(node.left, arrPath);
      this.preorder(node.right, arrPath);
    }
  }

  /** Performs a post-order traversal of the tree (work is done after descending to children).
   * @param {BinSearchTreeNode} node Node at which to begin traversal.
   * @param {array} [arrPath] (optional) Array to save the data in the traversal path to.
   */
  postorder(node, arrPath) {
    if (node !== null) {
      this.postorder(node.left, arrPath);
      this.postorder(node.right, arrPath);
      if (arrPath !== undefined) arrPath.push(node.data);
    }
  }

  /** Performs a level-order traversal (BFS) of the tree.
   * @param {BinSearchTreeNode} node Node at which to begin traversal.
   * @param {array} [arrPath] (optional) Array to save the data in the traversal path to.
   * @param {array} [arrLevelsNodes] (optional) Array to save each level's nodes (as their own nested arrays) to.
   * @returns {number} Number of levels counted in the tree.
   */
  levelorder(node, arrPath, arrLevelsNodes) {
    let levelCount = 0;               //while we're at it, might as well count levels for return
    if (node !== null) {
      const queue = [node];           //init queue with the origin/root node
      while (queue.length > 0) {
        // Start the current level
        let levelNodes = [];
        let levelSize = queue.length;

        // For each of this level's nodes...
        for (let i = 0; i < levelSize; i++) {
          let curr = queue.shift();
          if (arrPath !== undefined) arrPath.push(curr.data);
          levelNodes.push(curr);
          if (curr.left !== null) queue.push(curr.left);    //add next level (children) to the queue
          if (curr.right !== null) queue.push(curr.right);  //add next level (children) to the queue
        }

        // Finish up this level
        if (typeof arrLevelsNodes !== 'undefined') arrLevelsNodes.push(levelNodes);
        levelCount++;
      }
    }
    return levelCount;
  }

  /** Search for the node containing the data, from the node given.
   * @param {BinSearchTreeNode} node Node at which to begin the search.
   * @param {number} data Data to search the tree for.
   * @returns {BinSearchTreeNode|null} The node at which data was found (or null if not found).
   */
  search(node, data) {
    // If tree is empty, return null
    if (node === null) return null;

    // If data is less-than node's data, move left
    if (data < node.data) return this.search(node.left, data);

    // If data is greater-than node's data, move right
    else if (data > node.data) return this.search(node.right, data);

    // Else data must be the same, so return the node matching that data
    else return node;
  }
}

module.exports = BinSearchTree;