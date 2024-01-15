var express = require('express');

var login = module.exports = express();

login.get('/login', function(req, res){
    res.render('login');
  });
