const express = require ('express')
const app = express()

app.get('/', function (req, res){
  res.send('Hello, world!')
})

const listen = ['Rick Sanchez','Morty Smith','Summer Smith']

app.get('/item',function(req,res){
  res.send(listen)
})

app.listen(3000)
