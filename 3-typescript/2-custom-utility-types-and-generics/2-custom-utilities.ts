/**
 * Exercise #1: Filter object properties by type.
 *
 * Using a utility type `OmitByType`, this example demonstrates how to pick properties
 * from a type `T` whose values are *not* assignable to a specified type `U`.
 *
 * @example
 * type OmitBoolean = OmitByType<{
 *   name: string;
 *   count: number;
 *   isReadonly: boolean;
 *   isEnable: boolean;
 * }, boolean>;
 *
 * Resulting type:
 *
 * {
 * name: string;
 * count: number;
 * }
 */

// Add here your solution
type OmitByType<T, U> = {
    [K in keyof T as T[K] extends U ? never : K]: T[K];
  };
// Add here your example
type MyType = {
    name: string;
    count: number;
    isReadonly: boolean;
    isEnable: boolean;
  };
  
  type OmitBoolean = OmitByType<MyType, boolean>;

/**
 * Exercise #2: Implement the utility type `If<C, T, F>`, which evaluates a condition `C`
 * and returns one of two possible types:
 * - `T` if `C` is `true`
 * - `F` if `C` is `false`
 *
 * @description
 * - `C` is expected to be either `true` or `false`.
 * - `T` and `F` can be any type.
 *
 * @example
 * type A = If<true, 'a', 'b'>;  // expected to be 'a'
 * type B = If<false, 'a', 'b'>; // expected to be 'b'
 */

// Add here your solution
type If<C extends boolean, T, F> = C extends true ? T : F;
// Add here your example
type A = If<true, 'a', 'b'>;  // 'a'
type B = If<false, 'a', 'b'>; // 'b'
type C = If<true, number, string>; // number
type D = If<false, number, string>; // string

/**
 * Exercise #3: Recreate the built-in `Readonly<T>` utility type without using it.
 *
 * @description
 * Constructs a type that makes all properties of `T` readonly.
 * This means the properties of the resulting type cannot be reassigned.
 *
 * @example
 * interface Todo {
 *   title: string;
 *   description: string;
 * }
 *
 * const todo: MyReadonly<Todo> = {
 *   title: "Hey",
 *   description: "foobar"
 * };
 *
 * todo.title = "Hello";       // Error: cannot reassign a readonly property
 * todo.description = "barFoo"; // Error: cannot reassign a readonly property
 */

// Add here your solution
type MyReadOnly<T> = {
    readonly [P in keyof T]: T[P];                                              
};
// Add here your example
 interface Todo {
   title: string;
   description: string;
 }

 const todo: MyReadOnly<Todo> = {
   title: "Hey",
   description: "foobar"
 };

//todo.title = "Hello";       // Error: cannot reassign a readonly property
//todo.description = "barFoo"; // Error: cannot reassign a readonly property
/**
 * Exercise #4: Recreate the built-in `ReturnType<T>` utility type without using it.
 *
 * @description
 * The `MyReturnType<T>` utility type extracts the return type of a function type `T`.
 *
 * @example
 * const fn = (v: boolean) => {
 *   if (v) {
 *     return 1;
 *   } else {
 *     return 2;
 *   }
 * };
 *
 * type a = MyReturnType<typeof fn>; // expected to be "1 | 2"
 */

// Add here your solution
type MyReturnType<T> = T extends (...args: any) => infer R ? R : any;
// Add here your example
const fn = (v: boolean) => {
      if (v) {
        return 1;
      } else {
        return 2;
      }
    };
    type a = MyReturnType<typeof fn>; // expected to be "1 | 2"

/**
 * Exercise #5: Extract the type inside a wrapped type like `Promise`.
 *
 * @description
 * Implement a utility type `MyAwaited<T>` that retrieves the type wrapped in a `Promise` or similar structure.
 *
 * If `T` is `Promise<ExampleType>`, the resulting type should be `ExampleType`.
 *
 * @example
 * type ExampleType = Promise<string>;
 *
 * type Result = MyAwaited<ExampleType>; // expected to be "string"
 */

// Add here your solution
type MyAwaited<T> = T extends Promise<infer U> ? U extends Promise<any> ? MyAwaited<U> : U : never;
// Add here your example
 type ExampleType = Promise<string>;

 type Result = MyAwaited<ExampleType>; // expected to be "string"
/**
 * Exercise 6: Create a utility type `RequiredByKeys<T, K>` that makes specific keys of `T` required.
 *
 * @description
 * The type takes two arguments:
 * - `T`: The object type.
 * - `K`: A union of keys in `T` that should be made required.
 *
 * If `K` is not provided, the utility should behave like the built-in `Required<T>` type, making all properties required.
 *
 * @example
 * interface User {
 *   name?: string;
 *   age?: number;
 *   address?: string;
 * }
 *
 * type UserRequiredName = RequiredByKeys<User, 'name'>;
 * expected to be: { name: string; age?: number; address?: string }
 */

// Add here your solution

// Add here your example

//expected to be: { name: string; age?: number; address?: string }
