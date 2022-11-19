const bcrypt = require("bcrypt")
// let password = "password"
let date = new Date()

console.log(date.toISOString().split('T')[0]);

// let salt = bcrypt.genSaltSync(5)

// p = bcrypt.hashSync(password,salt)
// console.log(bcrypt.compareSync("passwor",p));