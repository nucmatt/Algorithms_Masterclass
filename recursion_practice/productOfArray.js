// function takes an array of numbers and returns the product of all numbers in the array

const productOfArray = (nums) => {
    // base case
    if (nums.length === 0) return 1;
    // recursive case
    return nums.pop() * productOfArray(nums);
}

console.log(productOfArray([1,2,3]));
console.log(productOfArray([1,2,3,10]));
