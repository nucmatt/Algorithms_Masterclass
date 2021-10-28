const string1 = '';
const string2 = ''; // true
const string3 = 'aaz';
const string4 = 'zza'; // false
const string5 = 'anagram';
const string6 = 'nagaram'; // true
const string7 = 'rat';
const string8 = 'car'; // false
const string9 = 'awesome';
const string10 = 'awesom'; // false
const string11 = 'amanaplanacanalpanama';
const string12 = 'acanalmanplanpamana'; // false
const string13 = 'qwerty';
const string14 = 'qeywrt'; // true
const string15 = 'texttwisttime';
const string16 = 'timetwisttext';

const validAnagram = (str1, str2) => {
	// base cases
	if (str1.length !== str2.length) {
		return false;
	}
	// initialize variables, two objects
	let stringObject1 = {};
	let stringObject2 = {};
	// loop through first string to store characters in object
	for (let char of str1) {
		stringObject1[char] = stringObject1[char] ? stringObject1[char] + 1 : 1;
	}
	// loop through second string to store characters in object
	for (let char of str2) {
		stringObject2[char] = stringObject2[char] ? stringObject2[char] + 1 : 1;
	}
	// console.log(stringObject1, stringObject2);
	// loop through object 1 to compare to object 2
	for (let key in stringObject1) {
		// if key value in object 1 !== key value in object 2 return false
		if (stringObject1[key] !== stringObject2[key]) {
			return false;
		}
	}
	// else return true
	return true;
};

console.log(validAnagram(string1, string2));
console.log(validAnagram(string3, string4));
console.log(validAnagram(string5, string6));
console.log(validAnagram(string7, string8));
console.log(validAnagram(string9, string10));
console.log(validAnagram(string11, string12));
console.log(validAnagram(string13, string14));
console.log(validAnagram(string15, string16));
