const sameFrequency = (num1, num2) => {
    // convert args to strings
    const firstStr = num1.toString();
    const secondStr = num2.toString();
    // initialize needed variables(counter objects)
    let countFirst = {};
    let countSecond = {};
    // loop through strings to create counter objects
    for(let num of firstStr) {
        countFirst[num] = countFirst[num] ? countFirst[num] += 1 : 1;
    }

    for(let num of secondStr) {
        countSecond[num] = countSecond[num] ? countSecond[num] += 1 : 1;
    }
    // check if values of keys in first counter object equal keys in second
    for(let key in countFirst) {
        // if not return false
        if(countFirst[key] !== countSecond[key]) {
            return false
        }
    }
    // else return true
    return true;
}

console.log(sameFrequency(182, 281));
console.log(sameFrequency(34, 14));
console.log(sameFrequency(3589578, 5879385));
