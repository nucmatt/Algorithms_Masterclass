// given a sorted array of integers and a target average
// determine if the array contains a pair of values that, when averaged, equal the given average

const averagePair = (arr, avg) => {
    // base cases, array with less than two values, target with remainder !== 0 || .5
    if (arr.length < 2) return false;
    if (!Number.isInteger(avg * 2)) return false
    // initialize variables, two pointers, value the pair should add up to
    let i = 0;
    let j = arr.length - 1;
    let value = avg * 2;
    // loop through array. first pointer must be <= half the array length and second pointer > first pointer
    while (i < j && i <= arr.length/2) {
        let target = value - arr[i];
        // pair adds to target, return true
        if (arr[j] === target) return true
        // if pair adds to > target, j--
        if (arr[j] > target) {
            j--;
        }
        // if pair adds to < target, i++, reset j to end of array
        if (arr[j] < target) {
            i++;
            j = arr.length - 1;
        }
    }
    // return false if loop ends
    return false;
}

console.log(averagePair([1,2,3], 2.5));
console.log(averagePair([1,3,3,5,6,7,10,12,19], 8));
console.log(averagePair([-1,0,3,4,5,6], 4.1));
console.log(averagePair([], 4));
