var express = require('express')
var admin = express() // the sub app


// show help message on API
admin.get('/', function (req, res) {
//   console.log(admin.mountpath) // /admin
  res.send('{}')
})

// return dashboard components
admin.get('/getDashboard', function (req, res) {
    let dashboardData = {};
    res.json(dashboardData)
  })




module.exports = admin;
