class Node {
	constructor(val) {
		this.val = val;
		this.next = null;
		this.prev = null;
	}
}

class DoublyLinkedList {
	constructor() {
		this.head = null;
		this.tail = null;
		this.length = 0;
	}
	// push accepts a value and adds a node of that value to the end of the list
	push(val) {
		// create the new node from the passed value
		let newNode = new Node(val);
		// if the list contains no nodes, set the node as both the head and tail
		// NOTE: another option is to check the length of the list
		if (!this.head) {
			this.head = newNode;
			this.tail = newNode;
			// else add the new node to the end of the list
		} else {
			// first connect the old tail node's next property to the new node
			this.tail.next = newNode;
			// then connect the new node's previous value to the old tail node
			newNode.prev = this.tail;
			// finally set the list's tail node to be the newly created node
			this.tail = newNode;
		}
		// we are adding to the list so the list's length is incremented
		this.length++;
		// return the new lengthened list back out of the method
		return this;
	}
	// pop removes the last node of the list and returns that node
	pop() {
		// if the list is empty, return undefined
		if (!this.head) return undefined;
		// take the node to be removed(the tail node) and store it in a variable
		let removedNode = this.tail;
		// if the list's length is 1, set the head and tail to be null
		if (this.length === 1) {
			this.head = null;
			this.tail = null;
			// else
		} else {
			// set the list's tail to the be the old tail's previous node
			this.tail = this.tail.prev;
			// set the new tail node's next property to null
			this.tail.next = null;
			// set the removed node's previous prop to be null(this removes any link back to the list in case the popped node is stored in a variable)
			removedNode.prev = null;
		}
		// we are removing a node so decrement the list's length by 1
		this.length--;
		// return the removed node
		return removedNode;
	}
	// shift removes the first node from the list and returns that node
	shift() {
		// if the list is empty, return undefined
		if (!this.head) return undefined;
		// store the old head node in a variable
		let removedNode = this.head;
		// if the list's length is 1
		if (this.length === 1) {
			// set the head and tail to be null
			this.head = null;
			this.tail = null;
			// else
		} else {
			// set the list's head prop to be the next node of the head
			this.head = this.head.next;
			// set the new head's prev prop to be null
			this.head.prev = null;
			// set the removed node's next prop to be null
			removedNode.next = null;
		}
		// a node has been removed from the list so decrement the length
		this.length--;
		// return the removed node
		return removedNode;
	}
	// unshift accepts a value and adds a new node of that value to the front of the list
	unshift(val) {
		// create the new node
		let newNode = new Node(val);
		// if the list is empty
		if (!this.head) {
			// set the head and the tail to be the new node
			this.head = newNode;
			this.tail = newNode;
			// else
		} else {
			// set the current head's prev prop to be the new node
			this.head.prev = newNode;
			// set the new node's next value to be the current head
			newNode.next = this.head;
			// move the list's head prop to the new node
			this.head = newNode;
		}
		// a node is added to the list so increment the length
		this.length++;
		// return the new list out of the method
		return this;
	}
	// get accepts a number(this index) and returns the node at that index
	// NOTE: This method assumes 0 indexing
	get(index) {
		// check if the passed index is valid, if not return null
		if (index < 0 || index >= this.length) return null;
		// initialize a variable to contain the node we are searching for in the list
		let node = null;
		// if index is less than or equal to midpoint
		if (index <= this.length / 2) {
			// set node equal to the list's head node
			node = this.head;
			// start an incrementing for loop from the head until the index is reached
			for (let i = 0; i < index; i++) {
				// set node to the node's next node
				node = node.next;
			}
			// else the index is greater than midpoint
		} else {
			// set node to equal the list's tail node
			node = this.tail;
			// start a decrementing for loop from the tail until the index is reached
			for (let i = this.length - 1; i > index; i--) {
				// set node equal to node's previous node
				node = node.prev;
			}
		}
		// return the node once a loop completes
		return node;
	}
	set(index, val) {
		let node = this.get(index);
		if (node !== null) {
			node.val = val;
			return true;
		}
		return false;
	}
	// insert will add a new node to the list at the specified index
	insert(index, val) {
		// if the index is invalid, return false
		if (index < 0 || index > this.length) return false;
		// if index is 0, just shift new node
		// NOTE: Since we want to return true/false out, we have to coerce the return of push/unshift into a boolean while still performing the push/unshift operation. The simplest way is to use two not symbols (!!).
		if (index === 0) return !!this.unshift(val);
		// if index equals length - 1, push new node
		if (index === this.length) return !!this.push(val);
		// use get to find the current node where the new node will be inserted
		// get will handle the check if the index is valid
		let currentNode = this.get(index);
		// if the node is valid
		if (currentNode !== null) {
			// create a new node using the val argument
			let newNode = new Node(val);
			// store the node before the current node
			let prevNode = currentNode.prev;
			// set the previous node's next to the new node
			prevNode.next = newNode;
			// the the current node's prev to the new node
			currentNode.prev = newNode;
			// set the new node's prev and next props to prev and current
			// respectively
			newNode.prev = prevNode;
			newNode.next = currentNode;
			// a node is added so increment length by 1
			this.length++;
		}
		// return the list out
		return this;
	}
    // remove will remove a node from the list at the specified index
    remove(index) {
        // check if index is valid, if not return undefined
        if(index < 0 || index >= this.length) return undefined;
        // if index is 0 or length - 1, shift or pop respectively
        if (index === 0) return this.shift();
        if (index === this.length - 1) return this.pop();
        //  get the node to be removed
        let removedNode = this.get(index);
        // set the previous node's next prop to be the removed node's next
        removedNode.prev.next = removedNode.next;
        // set the next node's prev prop to be the removed node's prev
        removedNode.next.prev = removedNode.prev;
        // set the removed nodes next and prev props to null to sever the connection to the list
        removedNode.next = null;
        removedNode.prev = null;
        // a node is removed so decrement the length
        this.length--;
        // return the removed node
        return removedNode;
    }
}

let list = new DoublyLinkedList();
console.log(list);
list.push('Hello');
list.push('and');
list.push('Goodbye');
list.push('!!!');
console.log(list);
console.log(list.remove(2));
console.log(list.get(0));
console.log(list.get(1));
console.log(list.get(2));
console.log(list.get(3));
console.log(list.length);
