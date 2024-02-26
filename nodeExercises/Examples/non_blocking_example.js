const fs = require('fs');

fs.readFile('../sampledata/users', 'utf8', (err, contents) => {
    let users = contents;
    console.log(users);
});

console.log('Hello node, your I see your at ' + process.version);
fs.readFile('../sampledata/emailaddresses', 'utf8', (err, contents) => {
    let emails = contents;
    console.log(emails);
})

console.log('Hello again!');