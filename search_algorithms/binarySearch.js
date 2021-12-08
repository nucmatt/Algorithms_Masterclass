// function that accepts a sorted array and a value
// return the index of the value or -1 if value is not in the array
// assume array is of numbers and sorted in ascending order

const binarySearch = (arr, val) => {
	// base cases, empty array
	if (arr.length === 0) return -1;
	// initialize variables
	let start = 0;
	let end = arr.length - 1;
	let midpoint;
	// move through the array
	while (start <= end) {
		midpoint = Math.floor((start + end) / 2)
		// if midpoint value equals val
		    // return midpoint
		if (arr[midpoint] === val) return midpoint;
		// if arr value is < val
		if (arr[midpoint] < val) {
			// discard lower half of arr
			start = midpoint + 1;
		}
		// if arr value is > val
		if (arr[midpoint] > val) {
			// discard upper half of arr
			end = midpoint - 1;
		}
	}
	// return -1 if val not found
	return -1;
};

console.log(binarySearch([], 2)); // -1
console.log(binarySearch([1, 2, 3, 4, 5], 2)); // 1
console.log(binarySearch([1, 2, 3, 4, 5], 3)); // 2
console.log(binarySearch([1, 2, 3, 4, 5], 5)); // 4
console.log(binarySearch([1, 2, 3, 4, 5], 6)); // -1
console.log(  // 2
	binarySearch(
		[
			5, 6, 10, 13, 14, 18, 30, 34, 35, 37, 40, 44, 64, 79, 84, 86, 95, 96, 98,
			99,
		],
		10
	)
);
console.log( // 16
	binarySearch(
		[
			5, 6, 10, 13, 14, 18, 30, 34, 35, 37, 40, 44, 64, 79, 84, 86, 95, 96, 98,
			99,
		],
		95
	)
);
console.log( // -1
	binarySearch(
		[
			5, 6, 10, 13, 14, 18, 30, 34, 35, 37, 40, 44, 64, 79, 84, 86, 95, 96, 98,
			99,
		],
		7
	)
);
console.log(binarySearch([1,3,5,7], 4))
