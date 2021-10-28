// function takes a number, n,  and returns the nth number of the fibonacci sequence
// see this YouTube video, https://www.youtube.com/watch?v=zg-ddPbzcKM, for a visual explanation of how this function works.
// This solution is terrible in BigO terms. It is exponential, i.e. O(2^n). This is worse than O(n^2)!!!! (Remember that Big O is not an actual calculation, it is a trend. The trend in operations for the fib solution grows exponentially as n increases, not by exactly 2^n operations.)
const fib = (n) => {
    // base case
    if (n <= 1) return n;
    // recursive case
    return fib(n-1) + fib(n - 2)
}

// This is a dynamic programming solution that improves the Big O of fib to O(n).
// This solution involves memoization, storing the answer to a previous sub-problem for use in later sub-problems, up until the answer is found.
const fibWithHelper = (num) => {
    let previous = 1;
    let next = 1;
 
    const helper = (helperNumber) => {
        if(helperNumber <= 2) {
            return 1;
        }
        let newNextValue = previous + next;
        previous = next;
        next = newNextValue;
        return helper(helperNumber - 1);
    };
    helper(num);
 
    return next;
};

// Non-recursive solution using dynamic programming and tabulation.
const fibTabulated = (n) => {
    if (n <= 2) return 1; // this line is not strictly needed since fibNums contains the answers for n = 1 and n = 2
    const fibNums = [0, 1, 1];
    for (let i = 3; i <= n; i++) {
        fibNums[i] = fibNums[i - 1] + fibNums[i - 2];
    }
    return fibNums[n];
}

console.log(fibTabulated(100));
