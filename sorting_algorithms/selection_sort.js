const selectionSort = (arr) => {
    // loop through array
    for (let i = 0; i < arr.length; i++) {
        // set minimum value index(minIndex) to i
        let minIndex = i;
        // second loop through array, starts at index of first loop
        for (let j = i + 1; j < arr.length; j++) {
            // if value at index j less than value minIndex value, minIndex = j
            minIndex = (arr[j] < arr[minIndex]) ? j : minIndex;
        }
        // if minIndex !== i, swap minIndex value with i index value
        if (minIndex !== i) {
            let temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }
    return arr;
}

console.log(selectionSort([5,4,3,1,2]));
console.log(selectionSort([19,44,38,5,47,15]));

