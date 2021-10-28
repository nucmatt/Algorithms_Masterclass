const insertionSort = (arr) => {
    // loop through array, starting at index 1
    for (let i = 1; i < arr.length; i++) {
        // if value i is < value i - 1 it must be inserted into already sorted portion of the array
        if (arr[i] < arr[i-1]) {
            let currentIndex = i;
            // second loop through array until j reaches i
            for (let j = i - 1; j >= 0; j--) {
                // if current value < value j, 
                    // swap values
                    // move currentIndex down 1 
                if (arr[currentIndex] < arr[j]) {
                    let temp = arr[j];
                    arr[j] = arr[currentIndex];
                    arr[currentIndex] = temp;
                    currentIndex--;
                } else {
                    break;
                }
            }
        }
    }
    // return the sorted array
    return arr;
}

// Here is a somewhat more optimized solution from the course
const insertionSortOptimized = (arr) => {
    for (let i = 1; i < arr.length; i++) {
        let currentVal = arr[i];
        let j = i - 1;
        while(j >= 0 && currentVal < arr[j]) {
            arr[j+1] = arr[j];
            j--;
        }
        arr[j+1] = currentVal;
    }
    return arr;
}

console.log(insertionSort([2,1,9,76,4]));
console.log(insertionSortOptimized([2,1,9,76,4]));
