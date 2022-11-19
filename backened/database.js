require("dotenv").config()
const mysql = require("mysql")

let con = mysql.createConnection({
    host: "localhost",
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: "ims"
});
console.log("Connected to DataBase");

module.exports = con