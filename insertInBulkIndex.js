const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'Data_App2',
    password: "Namabive1234@"
});

let q = "INSERT INTO userinfo (id, name, email, password) VALUES(?,?,?,?)";

let createRandoUser = () => {
    return [
        faker.string.uuid(),
        faker.internet.userName(),
        faker.internet.email(),
        faker.internet.password()
    ];
};

let data = [];

for (let i = 1; i <= 50; i++) {
    // console.log(createRandoUser());
    data.push(createRandoUser());
}
console.log(data);

// let data = "1,Aman Verma,21, rnh2vermaji, 900nama@gmail.com, abcd1234@"
try {
    data.forEach(user => {
        connection.query(q, user, (err, result) => {
            if (err) throw err;
            console.log(result);
        });
    });
    // connection.query(q, [data], (err, result) => {
    //     if (err) throw err;
    //     console.log(result);
    // });
} catch (err) {
    console.log(err);
}

connection.end;