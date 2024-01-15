const express = require('express')
const app = express()
const port = 3000
import Auth from './auth.js';





app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/v1/auth',Auth)

// app.use('/admin',require('./admins/admin'));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

