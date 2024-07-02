const express = require ('express')
const app = express()

app.get('/', function (req, res){

  const frutas = ['Laranja', 'Maçã','Banana', 'Mamão'];

  let listafrutas = 'Frutas: <br>';

  frutas.forEach((fruta,index) => {

    listafrutas += `${index + 1}. ${fruta} <br>`;

  });

  res.status(200).send(listafrutas);
})

app.listen(3000,function(){
  console.log('Servidor rodando na porta 3000');

})
