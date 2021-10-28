// find max sum of consecutive numbers in an array, given a specified length of the subarray

const maxSubarraySum = (arr, num) => {
    // base cases, num >= arr length
    if(num >= arr.length) return null;
    // initialize variables, start index and end index of subarray, current max sum
    let startSubarray = 0;
    let endSubarray = num - 1;
    let currentMax = -Infinity;
    let tempSum = 0;
    // loop through array
    while(endSubarray < arr.length) {
        // loop through sub array
        for (let i = startSubarray; i <= endSubarray; i++) {
            // initialize temporary sum to compare to max found so far
            tempSum += arr[i];
        }
        // set current max sum to greater of temp and current max
        currentMax = Math.max(currentMax, tempSum);
        tempSum = 0;
        startSubarray++;
        endSubarray++;
    }
    // return max sum
    return currentMax;
}

console.log(maxSubarraySum([100,200,300,400], 2));
console.log(maxSubarraySum([1,4,2,10,23,3,1,0,20], 4));
console.log(maxSubarraySum([-3,4,0,-2,6,-1], 2));
console.log(maxSubarraySum([3,-2,7,-4,1,-1,4,-2,1], 2));
console.log(maxSubarraySum([2,3], 3));
