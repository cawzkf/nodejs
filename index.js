const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello, world!')
})

app.get('/oi', function (req, res) {
  res.send('Ola, mundo!')
})

app.listen(3000)