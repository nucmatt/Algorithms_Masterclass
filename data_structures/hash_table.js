class HashTable {
	// a default size is set but can be changed. 53 is chosen here because it is relatively small for demonstration's sake and is a prime number. Prime numbers tend to help reduce collisions for complex math reasons.
	constructor(size = 53) {
		this.keyMap = new Array(size);
	}
	// The hash function will determine where in the keymap array a key/value pair is stored. The underscore is used to denote a private method, meaning you shouldn't call the hash method for a hash table created from this class.
	_hash(key) {
		// total provides the index of the array for storage
		let total = 0;
		// we seed the calculation below with a prime number to reduce collisions, again for complex math reasons
		let SEED_PRIME = 31;
		// loop through the key, up to 100 character(to reduce time complexity)
		for (let i = 0; i < Math.min(key.length, 100); i++) {
			// for each character, find the character code and then subtract 96 to find the alphabetical place(note this will work with capital letters but will provide a different place)
			let char = key[i];
			let value = char.charCodeAt(0) - 96;
			// use the seeded prime plus the value to modify the current total. The modulus is used here to ensure we receive an index between 0 and the the array length - 1.
			total = (total * SEED_PRIME + value) % this.keyMap.length;
		}
		// return the total which translates to the index position the key/value pair will be placed.
		return total;
	}
	// the set method will store a key-value pair in the key map using the hash method to determine where to store the pair. NOTE: This method allows for the insertion the same key multiple times. This condition is handled in the keys method by only returning the FIRST value of the duplicate keys. This could also be handled by creating an exception that stops the insertion of the duplicate key OR writes over the current value stored with the duplicate key.
	set(key, val) {
		// hash the key to find the index for insertion
		let idx = this._hash(key);
		// if there is nothing at the index for insertion, add an empty array at that index. This is done because this hash table will use separate chaining to deal with collisions.
		if (this.keyMap[idx] === undefined) {
			this.keyMap[idx] = [];
		}
		// push the key-value pair into the array at the hashed index.
		this.keyMap[idx].push([key, val]);
		return this.keyMap;
	}

	get(key) {
		// hash the key to find the index it would be stored in
		let idx = this._hash(key);
		// the array at that stored index is held in a variable for DRY.
		const pairs = this.keyMap[idx];
		// if there is something stored at the found index, loop through untill you find the specified key
		if (pairs) {
			for (let i = 0; i < pairs.length; i++) {
				let pair = pairs[i];
				// if the key is found, return it's paired value
				if (pair[0] === key) {
					return pair[1];
				}
			}
		}
		// if nothing is at the key index OR the key is not within the key index, return undefined
		return undefined;
	}
	// the values method returns all the UNIQUE values found within the hash table as an array
	values() {
		// create an array to store the values
		let valuesArr = [];
		// loop through the hash table's key map
		for (let i = 0; i < this.keyMap.length; i++) {
			// store what is found at the ith index of the key map
			let pairs = this.keyMap[i];
			// if something is stored at the index loop through it's pairs
			if (pairs) {
				for (let j = 0; j < pairs.length; j++) {
					// store each jth key's value
					let value = pairs[j][1];
					// if the value has not already been stored, push it to the values array
					if (!valuesArr.includes(value)) {
						valuesArr.push(value);
					}
				}
			}
		}
		// return all the unique values found in the key map
		return valuesArr;
	}
	// the keys method will return an array of the unique keys within the key map. NOTE: only the FIRST inserted key is returned for duplicate keys.
	keys() {
		// create an array to store the keys
		let keysArr = [];
		// loop through the hash table's key map
		for (let i = 0; i < this.keyMap.length; i++) {
			// store what is found at the ith index of the key map
			let pairs = this.keyMap[i];
			// if something is stored at the index loop through it's pairs
			if (pairs) {
				for (let j = 0; j < pairs.length; j++) {
					// store each jth key
					let key = pairs[j][0];
					// if the key has not already been stored, push it to the keys array
					if (!keysArr.includes(key)) {
						keysArr.push(key);
					}
				}
			}
		}
		// return all the unique keys found in the key map
		return keysArr;
	}
}

let table = new HashTable(17);
table.set('maroon', '#800000');
table.set('yellow', '#FFFF00');
table.set('olive', '#808000');
table.set('salmon', '#FA8072');
table.set('lightcoral', '#F08080');
table.set('mediumvioletred', '#C71585');
table.set('mediumviolet', '#C71585');
table.set('plum', '#DDA0DD');
table.set('purple', '#DDA0DD');
console.log(table.values());
console.log(table.keys());
