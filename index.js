const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'Delta_App',
    password: "Namabive1234@"
});

// try {
//     connection.query("SHOW TABLES", (err, result) => {
//         if (err) throw err;
//         console.log(result);
//     });
// } catch (err) {
//     console.log(err);
// }
let q = "INSERT INTO userinfo (id INT PRIMARY KEY, name VARCHAR(50), age INT, username VARCHAR(50) UNIQUE, email VARCHAR(50) UNIQUE, password VARCHAR(50) NOT NULL";
let data = "1,Aman Verma,21, rnh2vermaji, 900nama@gmail.com, abcd1234@"
try {
    connection.query(q, data, (err, result) => {
        if (err) throw err;
        console.log(result);
    });
} catch (err) {
    console.log(err);
}

createRandoUser = () => {
    return {
        userId: faker.string.uuid(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
        password: faker.internet.password(),
        birthdate: faker.date.birthdate(),
        registeredAt: faker.date.past(),
    };
}

console.log(createRandoUser());