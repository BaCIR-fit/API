const express = require('express')
const app = express()
const port = 3000
var hash = require('pbkdf2-password')()
import Auth from './auth.js';





app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/v1/auth',Auth)

// app.use('/admin',require('./admins/admin'));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

hash({ password: 'foobar' }, function (err, pass, salt, hash) {
  if (err) throw err;
  // store the salt & hash in the "db"
  users.tj.salt = salt;
  users.tj.hash = hash;
});
