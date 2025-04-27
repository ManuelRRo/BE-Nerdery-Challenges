/*
Challenge 1

"Time difference calculator"

The function timeDifference accepts two positive numbers representing time in seconds. You should modify the function to return the difference between the two times in a human-readable format HH:MM:SS.

Requirements:
- The function should accept two positive numbers representing time in seconds.
- The function should return the absolute difference between the two times.
- The result should be formatted as HH:MM:SS.

Example:

timeDifference(7200, 3400); // Expected output: "01:03:20"

*/

// format HH:MM:SS.
const convertToString = (value) => {
    return String(value).padStart(2, '0');
}
const timeDifference = (a, b) => {
    
    const timeDifferenceInSeconds = Math.abs(a-b);
    const secondsPerHour = 3600;
    const secondsPerMinute = 60;

    const hours = Math.floor(timeDifferenceInSeconds / secondsPerHour);
    const minutes = Math.floor(timeDifferenceInSeconds / secondsPerMinute) % secondsPerMinute;
    const seconds = timeDifferenceInSeconds % secondsPerMinute;

    const txtHours = convertToString(hours);
    const txtMinutes = convertToString(minutes)
    const txtSeconds = convertToString(seconds);
    
    
    return `${txtHours}:${txtMinutes}:${txtSeconds}`;
};

module.exports = timeDifference;
