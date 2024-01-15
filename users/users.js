var express = require('express')
var users = express() // the sub app

users.get('/', function (req, res) {
    console.log(users.mountpath) // /users
    res.send('Users Homepage')
})

module.exports = users