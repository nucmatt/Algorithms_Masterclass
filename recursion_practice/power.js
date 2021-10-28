// function takes a base number and an exponent number
// return base to the power of the exponent
// only positive integers are passed

const power = (base, exponent) => {
    // base case
    if (exponent === 0) return 1;
    // recursive case
    return base *= power(base, exponent - 1);
}

console.log(power(2,0));
console.log(power(2,2));
console.log(power(2,4));
