/**
 * Challenge: Create a deep clone function
 *
 * Create a function that takes an object and returns a deep clone of that object. The function should handle nested objects, arrays, and primitive types.
 *
 * Requirements:
 * - The function should accept an object of any type.
 * - It should return a new object that is a deep clone of the original object.
 * - The function should handle nested objects and arrays.
 * - It should handle primitive types (strings, numbers, booleans, null, undefined).
 * - The function should not use any external libraries
 */

//? implement the function  here
function deepClone<T>(input: T): T {

  if (input === null || typeof input !== "object") {
    return input;
  }

  const initialValue: any = Array.isArray(input) ? [] : {};

  return Object.keys(input).reduce((acumulator, key) => {

    const typedKey = key as keyof T;

    acumulator[typedKey] = deepClone((input as any)[typedKey]);

    return acumulator;

  }, initialValue);

}


