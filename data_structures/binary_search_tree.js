class Node {
	constructor(val) {
		this.val = val;
		this.left = null;
		this.right = null;
	}
}

class BinarySearchTree {
	constructor() {
		this.root = null;
	}
	// insert traverses the tree until it finds a leaf to insert the new node. Traversal is based on the value of the new node vs the value of the current node.
	insert(val) {
		// create a new node from the passed value
		let newLeaf = new Node(val);
		// check if there is a root node
		if (!this.root) {
			// if not, create the root node of the tree
			this.root = newLeaf;
			return this;
			// if there is a root node, compare it's value to the new node's value
		}
		let currentNode = this.root;
		// if the new value is greater than the root's value check if there is a node to the right
		while (currentNode) {
            // for this implementation, we don't want duplicates in our tree so if values are equal, a node WILL NOT be inserted into the tree
            if (val === currentNode.val) return undefined;
			if (val > currentNode.val) {
				// if so compare the values again
				// if not, add the new node to the current node's right prop
				if (!currentNode.right) {
					currentNode.right = newLeaf;
					currentNode = null;
				} else {
					currentNode = currentNode.right;
				}
				// else value is less than/equal to currentNode's value
			} else {
				// check for a left node
				// if left, then compare again
				// if not, add the node to the current node's left prop
				if (!currentNode.left) {
					currentNode.left = newLeaf;
					currentNode = null;
				} else {
					currentNode = currentNode.left;
				}
			}
		}
		// return the tree
		return this;
	}

    // find will walk through the tree similar to insert, checking node values until it finds the correct value or reaches a leaf
    find(val) {
        // if there is no root, return false
        if (!this.root) return false;
        // create a variable to hold the current node
        let currentNode = this.root;
        // while there is a current node
        while(currentNode) {
            // if the current node's value equal the search value return true
            if (val === currentNode.val) {
                return true
                // if the search value is greater than current value
            } else if (val > currentNode.val) {
                // set current node to be the right node
                currentNode = currentNode.right;
                // if the search value is less than current value
            } else {
                // set current node to the left node
                currentNode = currentNode.left;
            }
        }
        // return false
        return false;
    }
	// BFS visits every node on tree level and pushes those node's values to a list
	// NOTE: Arrays are used for convenience but a queue and a list are probably better data structures depending on your application.
	breadthFirstSearch() {
		// create variables, a queue to store nodes, a list to store values
		let queue = [];
		let values = [];
		// add the first node(root) of the tree to the queue
		queue.push(this.root);
		// loop through the tree until all nodes have been visited
		while (queue.length > 0) {
			// dequeue a node from the queue and store it temporarily
			let node = queue.shift();
			// add the node's value to the values list
			values.push(node.val);
			// check if the node has children, if so enqueue the children to be examined later
			if (node.left) queue.push(node.left);
			if (node.right) queue.push(node.right);
		}
		// return the list of values once every node has been visited
		return values;
	}
	// NOTE DFS is implemented recursively here. To implement DFS types iteratively, you essentially use BFS using a stack. When to store each node is the only alteration outside of using a stack instead of a queue.
	// pre order DFS visits each child branch of a node down to the leaf before moving to the next child branch of a node, starting at the root
	// values are stored AS each node is visited
	preOrderDFS() {
		// create a list to store the values of visited nodes
		let values = [];
		// use a recursive helper function to traverse each child branch
		const traverse = (node) => {
			// push the value of the node to the values list. This is generally called 'visiting' the node.
			values.push(node.val);
			// if the node has a left prop, call this helper on the left prop
			if (node.left) traverse(node.left);
			// then if the node has a right prop, call the helper on the right prop
			if (node.right) traverse(node.right);
		}
		// call the helper function on the root node of the tree
		traverse(this.root);
		// return the list of values
		return values;
	}
	// post order DFS finds each child branch of a node down to the leaf before visiting each node and moving up the branch to explorethe next child branch of a node, starting at the root
	// values are stored AFTER each leaf has been found, traversing back up the tree
	postOrderDFS() {
		// create a list to store the values of visited nodes
		let values = [];
		// use a recursive helper function to traverse each child branch
		const traverse = (node) => {
			// if the node has a left prop, call this helper on the left prop
			if (node.left) traverse(node.left);
			// then if the node has a right prop, call the helper on the right prop
			if (node.right) traverse(node.right);
			// push the value of the node to the values list. This is generally called 'visiting' the node.
			values.push(node.val);
		}
		// call the helper function on the root node of the tree
		traverse(this.root);
		// return the list of values
		return values;
	}
	// in order DFS finds the leaf of a branch of a parent node down to the leaf, visits each node child node of the parent, visits the parent, and then moves to the next child branch of the parent node, starting at the root
	// To best illustrate this, think of a binary search tree. InOrderDFS will store the tree's values in INCREASING order, from smallest to largest.
	inOrderDFS() {
		// create a list to store the values of visited nodes
		let values = [];
		// use a recursive helper function to traverse each child branch
		const traverse = (node) => {
			// if the node has a left prop, call this helper on the left prop
			if (node.left) traverse(node.left);
			// push the value of the node to the values list. This is generally called 'visiting' the node.
			values.push(node.val);
			// then if the node has a right prop, call the helper on the right prop
			if (node.right) traverse(node.right);
		}
		// call the helper function on the root node of the tree
		traverse(this.root);
		// return the list of values
		return values;
	}
}

let tree = new BinarySearchTree();
tree.insert(10);
tree.insert(8);
tree.insert(12);
tree.insert(14);
tree.insert(6);
tree.insert(9);
tree.insert(11);
console.log(tree.root);
console.log(tree.find(9));
console.log(tree.breadthFirstSearch());
console.log(tree.preOrderDFS());
console.log(tree.postOrderDFS());
console.log(tree.inOrderDFS());
