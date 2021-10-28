class Node {
	constructor(val) {
		this.val = val;
		this.next = null;
	}
}

class SinglyLinkedList {
	constructor() {
		this.head = null;
		this.tail = null;
		this.length = 0;
	}
	// push will simply add a new value to the end of the list.
	push(val) {
		if (val === undefined) return this;
		// First we have to create a new node using the value passed to push
		let node = new Node(val);
		// if the list in empty then both the head AND tail will be the newly created node.
		// NOTE: since you are adding to the end of the list, the next properties do not have to be set. A newly created node automatically has a null value for it's next property.
		if (this.head === null) {
			this.head = node;
			this.tail = node;
			// else the new node is added to the end of the list and becomes the new tail
		} else {
			this.tail.next = node;
			this.tail = node;
		}
		// Adding a value to the list obviously lengthens the list so we must increment the length property of this list instance.
		this.length++;
		// You have to return the list out of the function to reform the list. Since this is a class method all you have to refer to when returning is 'this', meaning this instance of SinglyLinkedList
		return this;
	}

	// pop does two things, it removes the last value of the list AND return the value that was removed.
	pop() {
		// if the list instance has no nodes, pop can't do anything so it returns undefined
		if (this.head === null) return undefined;
		// since there is no random access to a linked list, you must first traverse the list until you reach the tail.
		let currentNode = this.head;
		let previousNode = currentNode;
		while (currentNode.next !== null) {
			// since the tail is removed you must keep track of the previous node as well as the currentNode node. That way you can set the tail to the node just before the tail
			previousNode = currentNode;
			currentNode = currentNode.next;
		}
		this.tail = previousNode;
		this.tail.next = null;
		this.length--;
		// There is a special case. If there is only one value in the list, popping it off will empty the list. This needs to be coded, else the list will always have a head, even if it is length 0.
		if (this.length === 0) {
			this.head = null;
			this.tail = null;
		}
		return currentNode;
	}
	// shift removes the first item from the list and returns that item
	shift() {
		// if there is no list shift should return undefined
		if (this.head === null) return undefined;
		// Since the current head will be removed, there will be no link to it. So first we store the head in a temporary variable
		let temp = this.head;
		// Then simply set the head node to be the current head's next property
		// NOTE: this.head could also be set to equal temp.next
		this.head = this.head.next;
		// There is a need to break the old head's next link. This is necessary because if the shifted node is assigned to a variable, it will still link back to the new list. If the shifted node was not assigned to a variable then it would just go into JavaScript's garbage collection since there is nothing referencing it anymore.
		temp.next = null;
		// the initial head value is removed so the length of the list is reduced by 1
		this.length--;
		// if the last item of the list is shifted off, then the tail property needs to be set else it will retain its value despite shift returning undefined
		if (this.length === 0) {
			this.tail = null;
		}
		// return the old head head node that was stored temporarily
		return temp;
	}
	// unshift adds a new node to the front of the list
	unshift(val) {
		if (val === undefined) return this;
		// first create a new node using the value passed as an argument
		let newHead = new Node(val);
		// if the list is empty, set the head and tail to be the new node
		if (this.head === null) {
			this.head = newHead;
			this.tail = this.head;
			// else a list exists so...
		} else {
			// set the new node's next property to point at the old head
			newHead.next = this.head;
			// then set the list's head value to be the newly created node
			this.head = newHead;
		}
		// a node has been added so the list's length goes up one
		this.length++;
		// return the new list out of the method
		return this;
	}
	// get will retrieve the value of the node at the specified list position.
	// NOTE: we will use 0 indexing
	get(index) {
		// if the index argument is an invalid index, return null
		if (index < 0 || index >= this.length) return null;
		// initialize a counter and a variable to keep track of the current node
		let currentIndex = 0;
		let currentNode = this.head;
		// loop through the list until you reach the specified index
		while (currentIndex < index) {
			currentNode = currentNode.next;
			currentIndex++;
		}
		// return the node found at the specified index
		return currentNode;
	}
	// set will replace the value of the node at a specified index
	set(index, val) {
		let node = this.get(index);
		if (node === null) return false;
		node.val = val;
		return true;
	}
	// insert will insert a new node, of the specified value, at the specified index
	insert(index, val) {
		// if the index argument is invalid(note that 0 and the list's length ARE valid for insertions), return false
		if (index < 0 || index > this.length) return false;
		// if the index argument is 0, just use unshift and then return true for consistency
		if (index === 0) {
			this.unshift(val);
			return true;
		}
		// if the index argument equals the length of the list, just push and then return true for consistency
		if (index === this.length) {
			this.push(val);
			return true;
		}
		// NOTE: The prior insertion methods increment the list's length so do not duplicate that for the above insertions.
		// else create the new node
		let newNode = new Node(val);
		// retrieve the node prior to where the new node will be inserted
		let previousNode = this.get(index - 1);
		// set the new node's next prop to point to the node after the position the new node will be inserted
		newNode.next = previousNode.next;
		// set the previous node's next prop to point to the new node
		previousNode.next = newNode;
		// something is added to the list so the length must be incremented
		this.length++;
		// return true to indicate the insertion was successful
		return true;
	}
	// remove will remove a node from the list as the specified index and return that node
	remove(index) {
		// if the index is invalid, return undefined
		if (index < 0 || index >= this.length) return undefined;
		// if the passed index is 0, just return the node using shift
		if (index === 0) return this.shift();
		// if the passed index is the last item in the list(remember we are 0 indexing so the last item's index is length - 1), just return the node using pop
		if (index === this.length - 1) return this.pop();
		// else use get to find the node just before the node to be removed
		let previousNode = this.get(index - 1);
		// temporarily store the removed node in a variable so it's next value can be set to null. This is needed to remove the returned node's access to the rest of the list after the removed node's index
		let removed = previousNode.next;
		// break the link between the to be removed node and its predecessor by setting the previous node's next value to the node after the removed node
		previousNode.next = removed.next; //previousNode.next.next also works
		// set the removed node's next prop to null to break it's link to the list it was removed from
		removed.next = null;
		// an item is removed so the length must be decremented
		this.length--;
		// return the removed node
		return removed;
	}
    // reverse will reverse the list IN PLACE (meaning you cannot create a new list)
    reverse() {
        // initialize two pointers for current node and previous node
        // we start at the head so the current node equals the head
        let currentNode = this.head;
        // at the beginning there is no previous node so it is null
        let previousNode = null;
        // first reverse the head and the tail
        // NOTE: You don't have to worry about the tail's next property circling back, the loop will break that connection
        this.head = this.tail;
        this.tail = currentNode;
        // loop through through the list until you reach the end (a null value)
        // NOTE: you can also use a for loop until it reaches the length of the list(shown commented out below);
        while(currentNode !== null) {
            // first temporarily store the next node since the link to it will be broken
            let nextNode = currentNode.next;
            // set the current node's next prop to the previous node. This breaks the link to the next node, hence it is stored above for access later.
            currentNode.next = previousNode;
            // move the previous node pointer up to the current node
            previousNode = currentNode;
            // move the current node pointer to the next node(conveniently stored earlier)
            currentNode = nextNode;
        }
        // for (let i = 0; i < this.length; i++) {
        //     let nextNode = node.next;
        //     node.next = previousNode;
        //     previousNode = node;
        //     node = nextNode;
        // }
        // once the reveseral is done, return the list
        return this;
    }
}

let list = new SinglyLinkedList();

console.log(list);
list.push('Hello');
list.push('Goodbye');
list.push('!');
console.log(list);
console.log(list.get(0).val);
console.log(list.get(1).val);
console.log(list.get(2).val);
list.reverse()
console.log(list.get(0).val);
console.log(list.get(1).val);
console.log(list.get(2).val);
