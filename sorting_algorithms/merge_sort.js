// first create a function that will merge two sorted arrays into one sorted array
// do not modify the inputs to the function, i.e. create and return a separate array
const merge = (arr1, arr2) => {
    // create variables (empty array to return, indeces for both arrays)
    let merged = [];
    let i = 0;
    let j = 0;
    // loop through the arrays until the end of one is reached
    while (i < arr1.length && j < arr2.length) {
        // compare the value of current index of each array
        // push the lowest value to the new array
        // advance the relevant index by 1
        if (arr1[i] <= arr2[j]) {
            merged.push(arr1[i]);
            i++;
        } else {
            merged.push(arr2[j]);
            j++;
        }
    }
    // once the end of one array is reached, push all values of the unfinished array to the new array
    while(i < arr1.length) {
        merged.push(arr1[i]);
        i++
    }
    while (j < arr2.length) {
        merged.push(arr2[j])
        j++;
    }
    // return the new array
    return merged;
}

console.log(merge([1,10,50],[2,14,99,100]));

// Now we can use the merge function to create a merge sorting function
// merge sorting works recursively by continually splitting the array argument into two arrays (left and right) until each left and right array is length 1 or 0
// then the left and right arrays are merged back together each left and right array at a time
const mergeSort = (arr) => {
    // base case
    if (arr.length <= 1) return arr;
    // variables, midpoint of the array
    let mid = Math.floor(arr.length / 2);
    // split the array into left and right halves recursively
    // here the left half of the array becomes a stack of mergeSort calls until the left half is divided down to arrays of length 1 or 0. Then the left half array mergeSort calls are resolved until the call stack is empty and left becomes a single sorted array.
    let left = mergeSort(arr.slice(0,mid));
    // once the left mergeSorts are resolved the same thing happens to the right half until the call stack empties of mergeSort calls and right resolves to a single, sorted array.
    let right = mergeSort(arr.slice(mid));
    // return the merged left and right arrays
    // then finally the left and right sorted arrays are merged together in one final merge call where the entire array is returned merged back together sorted.
    return merge(left, right);
}

console.log(mergeSort([24,10,76,73,3,20,88,73]));
