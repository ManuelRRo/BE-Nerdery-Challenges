/*
Challenge: "Palindrome Counter"

A palindrome is a word, phrase, number, or other sequence of characters that reads the same forward and backward (ignoring spaces, punctuation, and capitalization).

Implement a function palindromeCounter that accepts two parameters:
- text: a string containing multiple words
- minLength: a number representing the minimum length for a word to be considered

The function should count how many words in the text are palindromes with a length greater than or equal to minLength.

Examples:

palindromeCounter("level radar mom", 3); // Expected output: 3

Explanation: "level", "radar", and "mom" are all palindromes with length >= 3

palindromeCounter("hello world", 3); // Expected output: 0

Explanation: No palindromes found

palindromeCounter("Madam level Civic noon", 5);
Expected output: 2
Explanation: "Madam" and "level" are palindromes with length >= 5, "Civic" and "noon" have length < 5

Requirements:
- The function should ignore case when checking if a word is a palindrome (e.g., "Level" is a palindrome).
- The function should ignore all punctuation and spaces when identifying words.
- Words are defined as sequences of letters separated by spaces.
- Only count palindromes with length greater than or equal to the specified minLength.
- Return the count as a number.
*/

const palindromeCounter = (text, minLength) => {
    // Limpiar el texto: quitar puntuación y convertir a minúsculas
    const cleanText = text.toLowerCase();

    // Dividir en palabras
    const words = cleanText.split(" ");

    // Contar palíndromos válidos
    let count = 0;
    for (const word of words) {
        if (word.length >= minLength && word === word.split('').reverse().join('')) {
            count++;
        }
    }

    return count;
};


module.exports = palindromeCounter;
