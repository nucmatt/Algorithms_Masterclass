// functon accepts a number and returns sum of all numbers from 0 up to and including the number

const recursiveRange = (num) => {
    // base case
    if (num === 0) return 0;
    // recursive case
    return num += recursiveRange(num - 1);
}

console.log(recursiveRange(6));
console.log(recursiveRange(10));
