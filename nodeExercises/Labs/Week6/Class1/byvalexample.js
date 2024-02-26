// primitives are passed ByVal
let var1 = 'My string';
let var2 = var1;
console.log(`var2 ==> '${var2}' after first assignment`);
var2 = 'My new string';
console.log(`var2 ==> '${var2}' after second assignment`);
console.log(`var1 ==> '${var1}' after second assignment`); // original data doesn't change