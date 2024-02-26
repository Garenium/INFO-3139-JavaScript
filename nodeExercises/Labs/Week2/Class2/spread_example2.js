const foo = (
  ...args // example of ... as rest operator
) => console.log(`the 4th element of the arr spread out is ${args[3]}`); // example of ... as rest
operator;
const arr = [1, 2, 3, 4, 5];
foo(...arr); // example of ... as spread operator, like calling foo(1,2,3,4,5)
// foo(arr) // undefined error because were not passing an args[3] just 1 array arg
