class Node {
	constructor(val) {
		this.val = val;
		this.next = null;
	}
}
// Queues are similar to stacks in that they can be represented with multiple data structures but a singly linked list structure is simplest for implementation.
class Queue {
	constructor() {
		this.first = null;
		this.last = null;
		this.size = 0;
	}
    // enqueue is the same as push, i.e. it adds a new node to the end of the queue.
	enqueue(val) {
		let newNode = new Node(val);
		if (this.size === 0) {
			this.first = newNode;
			this.last = newNode;
		} else {
			this.last.next = newNode;
			this.last = newNode;
		}
		this.size++;
		return this.size;
	}
    // dequeue is the same as shift, i.e. it removes the first item from the list and returns that item.
	dequeue() {
        if (this.size === 0) return null;
        let temp = this.first;
        if (this.size === 1) {
            this.first = null;
            this.last = null;
        } else {
            this.first = this.first.next;
            // since only the value is return from temp, temp.next does not technically need to be removed but I prefer explicit rather than implicit coding conventions.
            temp.next = null;
        }
        this.size--;
        return temp.val;
    }
}

let queue = new Queue();
queue.enqueue('first');
queue.enqueue('second');
queue.enqueue('third');
queue.enqueue('fourth');
console.log(queue);
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.first.val);
console.log(queue.first.next.val);
console.log(queue.first.next.next.val);
console.log(queue.first.next.next.next.val);
