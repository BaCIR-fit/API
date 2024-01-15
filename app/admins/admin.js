var express = require('express')
var admin = express() // the sub app

admin.get('/', function (req, res) {
  console.log(admin.mountpath) // /admin
  res.send('Admin Homepage')
})

// export admin;
