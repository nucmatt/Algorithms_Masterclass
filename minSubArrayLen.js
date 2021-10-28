// find minimum length of sub array within an given array that  equals or exceeds a given number
// array of positive integers only
// if no such subarray, return 0 instead

const minSubArrayLen = (arr, num) => {
    // base cases
    if (arr.length === 0) return 0;
    // intialize variables, start, end, current length, min length, sum
    let total = 0;
    let start = 0;
    let end = 0;
    let minLength = Infinity;
    let currentLength = 0;
    // loop through given array until you reach the end
    while (start < arr.length) {
        if (total < num && end < arr.length) {
            total += arr[end];
            end++;
        }
        else if (total >= num) {
            currentLength = end - start;
            minLength = Math.min(minLength, currentLength);
            total -= arr[start];
            start++;
        } else {
            break;
        }
    }
    // return minimum length
    return Math.min(currentLength, minLength);
}

console.log(minSubArrayLen([2,3,1,2,4,3], 7));
console.log(minSubArrayLen([2,1,6,5,4], 9));
console.log(minSubArrayLen([3,1,7,11,2,9,8,21,62,33,19], 52));
console.log(minSubArrayLen([1,4,16,22,5,7,8,9,10], 39));
console.log(minSubArrayLen([1,4,16,22,5,7,8,9,10], 55));
console.log(minSubArrayLen([4,3,3,8,1,2,3], 11));
console.log(minSubArrayLen([1,4,16,22,5,7,8,9,10], 95));
