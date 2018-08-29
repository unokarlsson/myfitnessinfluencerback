const {SHA256} = require('crypto-js');
const jwt      = require('jsonwebtoken');


// USING CRYPTO-JS LIBRARY
console.log('USING CRYPTO-JS LIBRARY');

const text = 'Some sensitive information.';
const hash = SHA256(text);
console.log(`text = ${text}`);
console.log(`hash = ${hash}`);
// hash = 659e4506b961aa96c2bde427c1500f82ae463e3a5c806b187b59a9867c369b41 = 64 chars

const checkHash = (token,salt) => {
    var resultHash = SHA256(JSON.stringify(token.data) + salt).toString();
    console.log(`hash       = ${token.hash}`);
    console.log(`resultHash = ${resultHash}`);
    if(resultHash===token.hash) {
        console.log('Data was not changed');
    } else {
        console.log('Data was changed. Do not trust it!');
    }
};

const salt = 'somesecret';

// Original user hashing and salting
const data = { id: 4};
const token = { data, hash: SHA256(JSON.stringify(data) + salt).toString() };
checkHash(token,salt);

// Anothr user try to manipulate the data
token.data.id = 5;
token.data.hash = SHA256(JSON.stringify(data) + salt).toString();
checkHash(token,salt);
console.log('');


// USING JSONWEBTOKEN
console.log('USING JSONWEBTOKEN LIBRARY');

const data1 = { id: 10 };
const token1 = jwt.sign(data1,'123abc');
console.log('token = ',token1);
// The hash consists of three parts separated with dot. Header, payload, signature - jwt.io
// token =  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTUzNDgwMDIwNn0.PF0rG3tdbT26dgM8HRRHFdJnraLv4ZVlwYRu177VlGY = 116 chars

var decoded = jwt.verify(token1,'123abc')
console.log('decoded = ',decoded);
// decoded =  { id: 10, iat: 1534800206 }