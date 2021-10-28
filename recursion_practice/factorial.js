// function takes a number and returns factorial of that number recursively

const factorial = (num) => {
    // base case
    if (num === 0) return 1;
    // recursive case
    return num *= factorial(num - 1);
}

console.log(factorial(1));
console.log(factorial(2));
console.log(factorial(4));
console.log(factorial(7));
