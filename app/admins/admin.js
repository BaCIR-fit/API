var express = require('express')
var admin = express() // the sub app

admin.get('/', function (req, res) {
  console.log(admin.mountpath) // /admin
  res.send('Admin Homepage')
})

// return dashboard components
admin.get('/getDashboard', function (req, res) {
    let dashboardData = {};
    res.send(dashboardData)
  })



module.exports = admin;
