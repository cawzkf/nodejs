const express = require ('express')
const app = express()

// Printa na tela uma msg
app.get('/', function (req, res){
  res.send('Hello, world!')
})

// Cria uma array de itens
const listen = ['Rick Sanchez','Morty Smith','Summer Smith']

//Read all - [GET] item
app.get('/item', function ( req, res ){
  res.send(listen)
})

// Sinalizar json -- bory para o express
app.use(express.json())

//Create - [POST] item
app.post('/item', function ( req, res ){
  const item = req.body.nome

//Insere o item no final
  listen.push(item)

//Mensagem de conclusão
  res.send('Item criado :)')
})

app.get('/item/:id',function (req, res){
  const id = req.params.id
  
  const item = listen [id-1]

  res.send(item)
})

app.put('/item/:id', function (req, res){
  const id = req.params.id

  const novoItem = req.body.nome

  listen[id-1] = novoItem

  res.send('Item atualizado com sucesso: ' +id)
})

app.listen(3000)
