let crypto = require("crypto")
function generateID(length){
    let n = Math.floor(Math.pow(10, length-1) + Math.random() * 9 * Math.pow(10, length-1)).toString()
    n = crypto.createHash("md4").update(n).digest("hex")
    return n.slice(0,10);
}

module.exports = {generateID}