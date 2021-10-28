const bubbleSort = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 1; j < arr.length - i; j++) {
            if (arr[j] < arr[j-1]) {
                let temp = arr[j];
                arr[j] = arr[j-1];
                arr[j-1] = temp;
            }
        }
        console.log(i);
    }
    return arr;
}

// The optimized version of bubble sort is highly efficient for NEARLY SORTED data. It nearly reaches the efficiency of insertion sort.
// this is accomplished by tracking whether any swaps occurred for each pass through of the array. If no values are swapped in the j(inner loop) pass, the i(outer loop) pass is broken out of since all values are now in order.
const bubbleSortOptimized = (arr) => {
    let noSwaps;
    for (let i = 0; i < arr.length; i++) {
        noSwaps = true;
        for (let j = 1; j < arr.length - i; j++) {
            if (arr[j] < arr[j-1]) {
                let temp = arr[j];
                arr[j] = arr[j-1];
                arr[j-1] = temp;
                noSwaps = false;
            }
        }
        console.log(i);
        if (noSwaps) break;
    }
    return arr;
}

console.log(bubbleSort([8,1,2,3,4,5,6,7]));
console.log(bubbleSortOptimized([8,1,2,3,4,5,6,7]));
