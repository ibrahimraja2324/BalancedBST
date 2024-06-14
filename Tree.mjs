import { Node } from "./Node.mjs";
export class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    return this.buildBalancedBST(
      this.removeDupliates(array),
      0,
      this.removeDupliates(array).length - 1
    );
  }

  removeDupliates(array) {
    return array.filter((el, index) => array.indexOf(el) === index);
  }

  buildBalancedBST(array, start, end) {
    if (start > end) {
      return null;
    }
    var mid = parseInt((start + end) / 2);
    var node = new Node(array[mid]);

    node.left = this.buildBalancedBST(array, start, mid - 1);
    node.right = this.buildBalancedBST(array, mid + 1, end);
    return node;
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  insert(value) {
    this.root = this.insertRecursion(this.root, value);
  }

  insertRecursion(node, value) {
    if (node === null) {
      return new Node(value);
    }

    if (value < node.data) {
      node.left = this.insertRecursion(node.left, value);
    } else if (value > node.data) {
      node.right = this.insertRecursion(node.right, value);
    }
    return node;
  }

  deleteItem(value) {
    this.root = this.insertRecursion(this.root, value);
  }

  deleteItemRecursion(node, value) {
    if (node === null) {
      return null;
    }

    if (value < node.data) {
      node.left = this.deleteItemRecursion(root.left, value);
    } else if (value > node.data) {
      node.right = this.deleteItemRecursion(root.right, value);
    } else {
      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }

      node.data = this.minValue(node.right);

      node.right = this.deleteItemRecursion(node.right, node.data);
    }
  }

  minValue(node) {
    let minVal = node.data;
    while (node.left != null) {
      minVal = node.left.data;
      node = node.left;
    }
    return minVal;
  }

  find(value) {
    return this.findRecursion(this.root, value);
  }

  findRecursion(node, value) {
    if (node === null || node.data === value) {
      return node;
    }

    if (value < node.data) {
      return this.findRecursion(node.left, value);
    } else {
      return this.findRecursion(node.right, value);
    }
  }

  levelOrder(callback) {
    if (this.root === null) {
      return;
    }
    const queue = [this.root];
    const result = [];
    while (queue.length > 0) {
      const node = queue.shift();
      result.push(callback ? callback(node) : node.data);
      if (node.left !== null) {
        queue.push(node.left);
      } else if (node.right !== null) {
        queue.push(node.right);
      }
    }
    return result;
  }

  inOrder(callback) {
    return this.inOrderRecursive(this.root, callback);
  }

  inOrderRecursive(node, callback) {
    if (node === null) {
      return;
    }
    const result = [];
    result.push(this.inOrderRecursive(node.left, callback));
    result.push(callback ? callback(node) : node.data);
    result.push(this.inOrderRecursive(node.right, callback));

    return result;
  }

  preOrder(callback) {
    return this.inOrderRecursive(this.root, callback);
  }

  preOrderRecursive(node, callback) {
    if (node === null) {
      return;
    }
    const result = [];
    result.push(callback ? callback(node) : node.data);
    result.push(this.inOrderRecursive(node.left, callback));
    result.push(this.inOrderRecursive(node.right, callback));

    return result;
  }

  postOrder(callback) {
    return this.inOrderRecursive(this.root, callback);
  }

  postOrderRecursive(node, callback) {
    if (node === null) {
      return;
    }
    const result = [];
    result.push(this.inOrderRecursive(node.left, callback));
    result.push(this.inOrderRecursive(node.right, callback));
    result.push(callback ? callback(node) : node.data);

    return result;
  }

  height(node) {
    if (node === null) {
      return -1;
    }
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node) {
    if (node === null) {
      return -1;
    }
    let depthCount = 0;
    let currentNode = node;

    while (currentNode !== null && currentNode !== this.root) {
      currentNode = this.findRoot(currentNode.data, this.root);
      depthCount++;
    }
    return depthCount;
  }

  findRoot(value, node) {
    if (
      node === null ||
      (node.left !== null) & (node.left.data === value) ||
      (node.right !== null) & (node.right.data === value)
    ) {
      return node;
    }

    if (value < node.data) {
      return this._findParent(value, node.left);
    } else {
      return this._findParent(value, node.right);
    }
  }

  isBalanced() {
    return this.isBalancedRecursive(this.root);
  }

  isBalancedRecursive(node) {
    if (node === null) return true;

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    if (Math.abs(leftHeight - rightHeight) > 1) {
      return false;
    }

    return (
      this.isBalancedRecursive(node.left) &&
      this.isBalancedRecursive(node.right)
    );
  }

  rebalance() {
    const values = this.inOrder();
    this.root = this.buildTree(values);
  }
}
