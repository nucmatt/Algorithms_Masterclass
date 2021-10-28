const areThereDuplicates = (...args) => {
    let lookup = {};
    
    for(let arg of args) {
        if(lookup[arg]) {
            return true;
        }
        lookup[arg] = 1;
    }
    return false
}

console.log(areThereDuplicates(1, 2, 3));
console.log(areThereDuplicates(1, 2, 2));
console.log(areThereDuplicates('a', 'b', 'c', 'a'));
