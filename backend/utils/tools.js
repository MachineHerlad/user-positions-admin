const bcrypt = require('bcrypt')
const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')


exports.hash = (myPlaintextPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(myPlaintextPassword, 10, (err, hash) => {
            if(err) {
                reject(err)
            }
            resolve(hash)
        })
    })
}



exports.compare = (myPlaintextPassword, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
          resolve(result)
        })
      })
}

//生成token
exports.sign = (username) => {
    const privateKey = fs.readFileSync(path.join(__dirname, '../keys/rsa_private_key.pem'))
    const token = jwt.sign({username}, privateKey, { algorithm: 'RS256' })
    return token
}


//验证token
exports.verify = (token) => {
    const publicKey = fs.readFileSync(path.join(__dirname, '../keys/rsa_public_key.pem'))
    let result = jwt.verify(token, publicKey)
    return result
}