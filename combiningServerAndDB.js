const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require("express");
const app = express();
const path = require("path");
const port = 8080;
const methodoverride = require("method-override");

app.use(methodoverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'Data_App3',
    password: "Namabive1234@"
});

let createRandoUser = () => {
    return [
        faker.string.uuid(),
        faker.internet.userName(),
        faker.internet.email(),
        faker.internet.password()
    ];
};

app.get("/", (req, res) => {
    let q = "SELECT COUNT(*) FROM userinfo";
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            console.log(result[0]['COUNT(*)']);
            let count = result[0]['COUNT(*)'];
            res.render("home.ejs", { count });
        });
    } catch (err) {
        console.log(err);
        res.send("Some error in DB");
    }
});

app.get("/user", (req, res) => {
    let q = "SELECT * FROM userinfo";
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            // console.log(result);
            let count = result[0]['COUNT(*)'];
            res.render("user.ejs", { result });
        });
    } catch (err) {
        console.log(err);
        res.send("Some error in DB");
    }
});

app.get("/user/:id/edit", (req, res) => {
    let { id } = req.params;
    let q = `SELECT * FROM userinfo WHERE id='${id}'`;
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            console.log(result);
            resulttosend = result[0];
            res.render("edit.ejs", { resulttosend });
        });
    } catch (err) {
        console.log(err);
        res.send("Some error in DB");
    }
});

app.patch("/user/:id/", (req, res) => {
    // res.send("Updated");
    let { id } = req.params;
    let { name: updatedusername, password: formpassword } = req.body;
    let q = `SELECT * FROM userinfo WHERE id='${id}'`
    // console.log(id);
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            let user = result[0];
            if (formpassword != user.password) {
                res.send("Wrong Password");
            } else {
                // res.send(user);
                // console.log(id);
                console.log(updatedusername);
                let q2 = `UPDATE userinfo SET name='${updatedusername}' WHERE id='${id}'`;
                connection.query(q2, (err, result) => {
                    if (err) throw err;
                    // console.log(result);
                    // res.send(result);
                    res.redirect("http://localhost:8080/user");
                });
            };
        });
    } catch (err) {
        console.log(err);
        res.send("Some error in DB");
    }
});

app.listen(port, () => {
    console.log("app is listening on port 8080");
});