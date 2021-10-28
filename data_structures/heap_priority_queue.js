class Node {
	constructor(val, priority) {
		this.val = val;
		this.priority = priority;
	}
}

// The priority queue will be a min binary heap using the node's priority value to sort the heap
class PriorityQueue {
	constructor() {
		this.values = [];
	}

	// the enqueue method will push a new node to the values array and then place the added node in it's proper place in the queue
	enqueue(value, priority) {
		let newNode = new Node(value, priority);
		// push the node onto the values array
		this.values.push(newNode);
		// move the added node up into it's proper order in the queue using the node's priority property
		this.bubbleUp(this.values.length - 1);
		return this.values;
	}
	// dequeue will remove the root element of the queue and then rearrange the queue to determine the next highest priority. The removed node is returned out of the method.
	dequeue() {
        if(this.values.length === 0) return undefined;
		// swap the root node with the last node in the values array
		this.swapNodes(0, this.values.length - 1);
		// remove the root node and store in a variable to be returned
		const dequeuedNode = this.values.pop();
		// rebase the queue to place the highest priority(lowest number!) at the root
		this.sinkDown(0);
		return dequeuedNode;
	}

	// helper methods
	findParent(idx) {
		return Math.floor((idx - 1) / 2);
	}

	findFirstChild(idx) {
		return idx * 2 + 1;
	}

	findSecondChild(idx) {
		return idx * 2 + 2;
	}

	swapNodes(idx1, idx2) {
		return ([this.values[idx1], this.values[idx2]] = [
			this.values[idx2],
			this.values[idx1],
		]);
	}

	bubbleUp(idx) {
		// first mark the current index of the node
		let currentIdx = idx;
		// find the current node's parent
		let parentIdx;
		// swap the current node with the parent node while the the current priority is lower
		while (currentIdx > 0) {
			parentIdx = this.findParent(currentIdx);
            if (this.values[currentIdx].priority >= this.values[parentIdx].priority) {
                break
            } else {
                this.swapNodes(parentIdx, currentIdx);
                currentIdx = parentIdx;
            }
		}
	}

	sinkDown(idx) {
		// variables for parent, children, and a swapped boolean, and the queue(for DRY)
		let parentIdx = idx;
		let firstChildIdx = this.findFirstChild(parentIdx);
		let secondChildIdx = this.findSecondChild(parentIdx);
		const queue = this.values;
		let swapped;
		// check to see if either child node priority is lower than the parent, if so swap the parent and child nodes. repeat until no more swapping has occured. When no swapping has occurred, return the dequeued node.
		do {
			swapped = false;
            console.log(parentIdx, firstChildIdx, secondChildIdx);
			if (queue[firstChildIdx] && queue[firstChildIdx].priority < queue[parentIdx].priority) {
				this.swapNodes(parentIdx, firstChildIdx);
				parentIdx = firstChildIdx;
				firstChildIdx = this.findFirstChild(parentIdx);
				secondChildIdx = this.findSecondChild(parentIdx);
				swapped = true;
			}
			if (queue[secondChildIdx] && queue[secondChildIdx].priority < queue[parentIdx].priority) {
				this.swapNodes(parentIdx, secondChildIdx);
				parentIdx = secondChildIdx;
				firstChildIdx = this.findFirstChild(parentIdx);
				secondChildIdx = this.findSecondChild(parentIdx);
				swapped = true;
			}
		} while (swapped);
	}
}

let ER = new PriorityQueue();
ER.enqueue('common cold', 5);
ER.enqueue('gunshot wound', 1);
ER.enqueue('high fever', 4);
ER.enqueue('broken arm', 2);
ER.enqueue('glass in foot', 3);
console.log(ER.values);
console.log(ER.dequeue());
console.log(ER.dequeue());
console.log(ER.dequeue());
console.log(ER.dequeue());
console.log(ER.dequeue());
console.log(ER.dequeue());
console.log(ER);
