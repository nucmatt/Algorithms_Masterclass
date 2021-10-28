// function that accepts an array and a value
// return index of the value
// if value not found, return -1

const linearSearch =(arr, val) => {
    // base cases, empty array
    if (arr.length === 0) return -1;
    // loop through the array
    for (let i = 0; i < arr.length; i++) {
        // if arr[i] equals val, return i
        if (arr[i] === val) return i;
    }
    // return -1 if val is not in the array
    return -1;
}

console.log(linearSearch([10,15,20,25,30], 15));
console.log(linearSearch([9,8,7,6,5,4,3,2,1,0], 4));
console.log(linearSearch([100], 100));
console.log(linearSearch([1,2,3,4,5], 6));
