//Get the module fs: https://nodejs.org/api/fs.html 
const fs = require('fs');

let users = fs.readFileSync('../sampledata/users', 'utf8');
console.log(users);
console.log('Hello Node\n');

let emails = fs.readFileSync('../sampledata/emailaddresses', 'utf8');
console.log(emails);
console.log('Hello again!');