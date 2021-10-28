// first create a helper function, pivot. This 
// pivot MUST modify the array in place, it cannot create a new array
// pivot will accept three arguments, an array, a start point, and an end point
    // the start and end can vary but for the course they will be 0 and array length - 1 respectively
const pivot = (arr, start = 0, end = arr.length - 1) => {
    // the pivot point value will be the value of the start index
    let pivotValue = arr[start];
    // a pivot index is needed to keep track of how many swaps occur
    let pivotIndex = start;
    // loop through the array from start index to end index
    for (let i = start + 1; i <= end; i++) {
        // if the pivot index value is > the current index value
        if (pivotValue > arr[i]) {
            // increment the pivot index FIRST
            pivotIndex++;
            // then swap the current index value with the pivot index value
            swap(arr, i, pivotIndex);
        }
    }
    // once the loop completes, swap the start index value with the pivot index value
    swap(arr, start, pivotIndex);
    // return the pivot index
    return pivotIndex;
}

// swap is a small helper function to support the DRY principle
let swap = (arr, i, j) => {
    let temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
}

let arr1 = [5,2,1,8,4,7,6,3];
console.log(pivot(arr1), arr1);

const quickSort = (arr, leftIndex = 0, rightIndex = arr.length-1) => {
    // call pivot helper
    let nextPivot = pivot(arr, leftIndex, rightIndex);
    // if the leftIndex is less than the right index, recursively call quickSort on the subarray to the left and the subarray to the right of the pivot
    // but not ON the pivot, the pivot point is already sorted
    if (leftIndex < rightIndex) {
        // left subarray is sorted first
        quickSort(arr, leftIndex, nextPivot-1);
        // once the left subarray is resolved(i.e. the left subarray is fully sorted), the partially sorted array is then passed to another quicksort recursion stack to sort the right subarray
        quickSort(arr, nextPivot+1, rightIndex);
    }
    // once the right subarray is fully sorted, return the fully sorted array
    return arr;
}

console.log(quickSort(arr1));
