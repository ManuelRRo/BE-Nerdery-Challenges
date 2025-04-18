/* 
Challenge: "Find Majority Element";

The function findMajorityElement accepts an array of numbers and returns the majority element if it exists, otherwise returns null. The majority element is the element that appears more than n/2 times in the array.

Requirements:
- The function should handle arrays of any length.
- The function should return the majority element if it exists, otherwise return null.
- The function should be efficient and handle large arrays.
- The function should not modify the original array.

Example:
findMajorityElement([1, 2, 3, 1, 1]); // Expected output: 1
findMajorityElement([1, 2, 3, 4]); // Expected output: null
findMajorityElement([1, 1, 2, 2, 2]); // Expected output: 2
findMajorityElement([1, 2, 2, 3, 3, 3]); // Expected output: null
findMajorityElement([1, 2, 3, 4, 5]); // Expected output: null


*/

const findMajorityElement = (arr) => {
    const n = arr.length;

    //return null if it is empty
    if (n === 0) return null;

    const elementCount = new Map();

    for (const num of arr) {
        //(elementCount.get(num) || 0) get previous count if exist and if not put 0 and then sum 1
        elementCount.set(num, (elementCount.get(num) || 0) + 1);
        if (elementCount.get(num) > Math.floor(n / 2)) {
            return num;
        }
    }

    return null;
};

module.exports = findMajorityElement;
