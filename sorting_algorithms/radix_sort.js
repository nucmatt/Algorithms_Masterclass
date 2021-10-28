// Radix sort is NOT a comparison algorithm like the other sorting algorithms in this folder.
// Assume base 10 numbers for all of radix sort.
// Radix sort requires several helper methods
// getDigit takes in a number and a "place" value. The place value is similar to an index but the 0 index is at the end of the number, not the beginning
const getDigit = (num, place) => {
	// Here we divide the number by 10 to the power of the place and drop the fraction. This works because you can think of the 1s place as 10^0, 10s place as 10^1 and so on.
	// then we divide the result by 10 and take the remainder
	// this gives us the digit at the place specified by the place argument
	// note that 0 divided by anything is 0 and thus the remainder is 0.
	// Math.abs is included to allow for dealing with negative numbers.
	return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
};
console.log(getDigit(7423, 0));
console.log(getDigit(7423, 1));
console.log(getDigit(7423, 2));
console.log(getDigit(7423, 3));
console.log(getDigit(7423, 4));

// We also need a way to determine the longest(i.e. most digits) number within our data set
// This is split into two parts, digitCount to find how long any given number is, and mostDigits to determine the longest number within a given list of numbers
const digitCount = (num) => {
	// any log of 0 is -Infinity so 0 must be dealt with as a special case
	if (num === 0) return 1;
	// Here we take the logarithm(base 10) of the number. The logarithm of a number really just asks 'by what power must the base be raised to equal the number'.
	// Then we use floor to drop the remainder since we only care about how many digits the number contains, not their actual values
	// 1 is added since the log10 of a single digit number is a fraction, i.e. < 1, so the floor would just return 0, which is incorrect.
	return Math.floor(Math.log10(Math.abs(num))) + 1;
};
console.log(digitCount(4356));
console.log(digitCount(435));
console.log(digitCount(43));
console.log(digitCount(4));
console.log(digitCount(0));

const mostDigits = (nums) => {
	let maxDigits = 0;
	for (let i = 0; i < nums.length; i++) {
		maxDigits = Math.max(maxDigits, digitCount(nums[i]));
	}
	return maxDigits;
};

console.log(mostDigits([]));
console.log(mostDigits([0,5,6,2,9]));
console.log(mostDigits([23,567,9]));
console.log(mostDigits([23,567,12234234,9]));


const radixSort = (nums) => {
    let maxDigitCount = mostDigits(nums);
    for (let k = 0; k <= maxDigitCount; k++) {
        let buckets = Array.from({length: 10}, () => []);
        for (let i = 0; i < nums.length; i++) {
            let currentNum = getDigit(nums[i], k);
            buckets[currentNum].push(nums[i])
        }
        nums = [].concat(...buckets);
    }
    return nums;
}

console.log(radixSort([23,345,5467,12,2345,9852]));
