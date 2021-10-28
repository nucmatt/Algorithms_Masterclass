const array1 = [1,1,1,1,1,2]; // 2
const array2 = [1,2,3,4,4,4,5,5,12,12,13]; // 7
const array3 = []; // 0
const array4 = [-2,-1,-1,0,1]; // 4

// array can contain negative values
// assume array is sorted
const countUniqueValues = (arr) => {
    // base cases, empty arr
    if(arr.length === 0) {
        return 0;
    }
    // initialize variable for count
    let count = 1;
    // initialize pointers
    let i = 0;
    let j = 1;
    // while higher pointer is less than array length
    while(j < arr.length) {
        // if arr[i] === arr[j] j++
        if (arr[i] === arr[j]) {
            j += 1;
        }
        // if arr[i] !== arr[j] count++, i++, j++
        if (arr[i] !== arr[j]) {
            count += 1;
            i = j;
            j += 1;
        }
    }
    return count;
}

console.log(countUniqueValues(array1));
console.log(countUniqueValues(array2));
console.log(countUniqueValues(array3));
console.log(countUniqueValues(array4));
