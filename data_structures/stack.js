class Node {
	constructor(val) {
		this.val = val;
		this.next = null;
	}
}
// This stack implementation uses the singly-linked list structure with items named differently as noted below.
class Stack {
	constructor() {
		// head and tail are generally reserved for singly-linked list structures specifically. This is a stack so the names are changed slightly to differentiate from a full list implementation.
		this.first = null;
		this.last = null;
		this.size = 0;
	}
	// For singly linked lists, adding/removing to/from the front of the list is O(1). Convention has stack add/remove an item as push and pop. These are equivalent to the shift/unshift of an array or singly linked list full implementations.
	push(val) {
		let newNode = new Node(val);
		if (this.size === 0) {
			this.first = newNode;
			this.last = newNode;
		} else {
			let temp = this.first;
			this.first = newNode;
			this.first.next = temp;
		}
		this.size++;
		// it is generally more useful to return the new size of the stack rather than the stack itself since you can only pull the last item added off.
		return this.size;
	}

	pop() {
		if (this.size === 0) return null;
		let temp = this.first;
		if (this.size === 1) {
			this.first = null;
			this.last = null;
		} else {
			this.first = this.first.next;
            // Since you are only returning the value and not the full node, technically you do not have to sever the connection to the stack. Per my own code writing practices I prefer this to be done explicitly rather than implicitly.
            temp.next = null;
		}
		this.size--;
		// only the value is returned since that is the only relevant piece of data from a stack.
		return temp.val;
	}
}

let stack = new Stack();
stack.push('first');
stack.push('second');
stack.push('third');
stack.push('fourth');
console.log(stack);
console.log(stack.pop());
console.log(stack.pop());
console.log(stack.pop());
console.log(stack.pop());
console.log(stack.pop());
console.log(stack.first.val);
console.log(stack.first.next.val);
console.log(stack.first.next.next.val);
console.log(stack.first.next.next.next.val);
