class MaxBinaryHeap {
	constructor() {
		this.values = [];
	}

	insert(val) {
		// add the value to the end of the values array
		this.values.push(val);
		// move the added value up in the heap to it's proper place
		this.bubbleUp(this.values.length - 1);

		return this.values;
	}

	extractMax() {
		if (this.values.length === 0) return undefined;
		// swap the root with the last node of the heap
		this.swap(0, this.values.length - 1);
		// pop off the max value of the heap(now located at the end)
		const max = this.values.pop();
		this.sinkDown();
		// now have the new root value sink down into its proper place in the heap
		return max;
	}
	// helper methods
	// swap simply swaps two nodes with each other
	swap(idx1, idx2) {
		return ([this.values[idx1], this.values[idx2]] = [
			this.values[idx2],
			this.values[idx1],
		]);
	}

	// NOTE: Finding parent/children takes advantage of the mathematical relationship between a child node's array index and the parent node's index, childIndex = 2n + 1 || 2n + 2 where n is the parent index. Remember, this relationship exists because a heap must have all sibling nodes filled in before moving to the next generation
	// findParent finds the parent index given a child's index (assumes binary heap)
	findParent(idx) {
		return Math.floor((idx - 1) / 2);
	}
	// findFirstChild finds the first child of a parent node given the parent index
	findFirstChild(idx) {
		return 2 * idx + 1;
	}
	// findSecondChild finds the second child of a parent node given the parent index
	findSecondChild(idx) {
		return 2 * idx + 2;
	}
	// bubbleUp moves the new added value up to it's proper place in the heap
	bubbleUp(idx) {
		// first mark the current index of the node
		let currentIdx = idx;
		// find the current node's parent
		let parentIdx;

		// until you reach the the root or the current value is less than the parent, swap the current and parent values
		while (currentIdx > 0) {
			parentIdx = this.findParent(currentIdx);
			if (this.values[currentIdx] <= this.values[parentIdx]) {
				break;
			} else {
				// else swap the current value with the parent value
				this.swap(parentIdx, currentIdx);
				currentIdx = parentIdx;
			}
		}
	}
	// sinkDown rebases the heap when the root is replaced
	sinkDown() {
		// define variables
		// sinkDown starts at the root so the parent index is 0;
		let parentIdx = 0;
		// extract the length of the heap for comparisons
		const length = this.values.length;
		// store the value that is sinking down the heap
		const sinkVal = this.values[0];
		// a swapped variable is created to keep track of when to stop the sinking process
		let swapped = false;
		// use a do while loop to ensure the heap is examined at least once for rebasing
		do {
			// store the parent's children's positions
			let firstChildIdx = this.findFirstChild(parentIdx);
			let secondChildIdx = this.findSecondChild(parentIdx);
			// initialize variable for the children's value for comparisons later
			let firstChildVal, secondChildVal;
			// create a swap variable. This allows for breaking out of the loop once the sinkVal is in its rebased position
			let swapIdx = null;
			// if the firstChildIdx is valid, set the value
			if (firstChildIdx < length) {
				firstChildVal = this.values[firstChildIdx];
				// if the value is great than the sinkVal, set the swapIdx to the firstChildIdx
				if (firstChildVal > sinkVal) {
					swapIdx = firstChildIdx;
				}
			}
			// if the secondChildIdx is valid, set the value
			if (secondChildIdx < length) {
				secondChildVal = this.values[secondChildIdx];
				// if the value is greater than the sinkVal AND the secondChildVal is greater than the firstChildVal, set the swapIdx to the secondChildIdx
				if (secondChildVal > sinkVal && secondChildVal > firstChildVal) {
					swapIdx = secondChildIdx;
				}
			}
			// if there is nothing to swap, break out of the while loop
			if (swapIdx === null) {
				swapped = false;
				// else swap the parent and child, then set the parentIdx to the be the index of the child the parent was swapped with
			} else {
				this.swap(parentIdx, swapIdx);
				parentIdx = swapIdx;
				swapped = true;
			}
		} while (swapped);
		return this.values;
	}
}

let heap = new MaxBinaryHeap();
heap.insert(41);
heap.insert(39);
heap.insert(33);
heap.insert(18);
heap.insert(27);
heap.insert(12);
heap.insert(55);
console.log(heap.values);
console.log(heap.extractMax());
console.log(heap.values);
console.log(heap.extractMax());
console.log(heap.values);
console.log(heap.extractMax());
console.log(heap.values);
console.log(heap.extractMax());
console.log(heap.values);
console.log(heap.extractMax());
console.log(heap.values);
console.log(heap.extractMax());
console.log(heap.values);
console.log(heap.extractMax());
console.log(heap.values);
console.log(heap.extractMax());
heap.insert(10);
heap.insert(99);
console.log(heap.values);
