const isSubsequence = (str1, str2) => {
    // base cases, str2 length less than str1 length
    if (str2.length < str1.length) return false;
    // intialize variables, pointers
    let str1Pointer = 0;
    let str2Pointer = 0;
    // loop through first string
    while (str1Pointer < str1.length) {
        // if letters left in str2 is less than letters left in str1
        if (str2.length - str2Pointer < str1.length - str1Pointer)
            // return false
            return false
        // if str1[i] === str2[j]
        if (str1[str1Pointer] === str2[str2Pointer]) {
            // i++
            str1Pointer += 1;
            str2Pointer += 1;
        }
        // if str[i] !== str2[j]
        if (str1[str1Pointer] !== str2[str2Pointer]) {
            // j++
            str2Pointer += 1;
        }
        
    }
    // return true
    return true;
}

console.log(isSubsequence('hello', 'hello world'));
console.log(isSubsequence('sing', 'sting'));
console.log(isSubsequence('abc', 'abracadabra'));
console.log(isSubsequence('abc', 'acb'));
