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

const timeDifference = (a, b) => {
    let hours,minutes,seconds;
    let txt_hours,txt_minutes,txt_seconds;
    const ABSOLUTE_DIFFERENCE = Math.abs(a-b);

    hours = Math.floor(((ABSOLUTE_DIFFERENCE)/3600));
    minutes = Math.floor(ABSOLUTE_DIFFERENCE / 60) % 60;
    seconds = ABSOLUTE_DIFFERENCE % 60;

    if(hours === 0){
        txt_hours = '00';
    }else if(hours < 10) {
        txt_hours = '0'+hours;
    }
    else{
        txt_hours = hours;
    }

    if(seconds === 0){
        txt_seconds = '00';
    }else if (seconds < 10){
        txt_seconds = '0'+ seconds;
    }else{
        txt_seconds = seconds;
    }

    if(minutes===0){
        txt_minutes = '00';
    }else if (minutes < 10){
        txt_minutes = '0'+minutes;
    }
    else{
        txt_minutes = minutes;
    }
    
    return `${txt_hours}:${txt_minutes}:${txt_seconds}`;
};

module.exports = timeDifference;
