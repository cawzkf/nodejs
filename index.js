const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const app = express();
const port = 3000;
const dbUrl = 'mongodb+srv://admin:7sZzutY65Mg3zkQq@cluster0.ns4sxry.mongodb.net';
const dbName = 'ocean-jornada-backend';
const client = new MongoClient(dbUrl);

async function main() {
  try {
    console.log('Conectando ao banco de dados...');
    await client.connect();
    console.log('Banco de dados conectado com sucesso!');

    const db = client.db(dbName);
    const collection = db.collection('item');

    // Exemplo de rota inicial
    app.get('/', function (req, res) {
      res.send('; )');
    });

    // Desafio: criar endpoint /oi que exibe "Olá, mundo!"
    app.get('/oi', function (req, res) {
      res.send('Olá, mundo!');
    });

    // Read All - [GET] /item
    app.get('/item', async function (req, res) {
      try {
        const documentos = await collection.find().toArray();
        res.json(documentos);
      } catch (err) {
        console.error('Erro ao buscar itens:', err);
        res.status(500).json({ message: 'Erro ao buscar itens' });
      }
    });

    app.use(express.json());

    // Create - [POST] /item
    app.post('/item', async function (req, res) {
      try {
        const item = req.body;
        const result = await collection.insertOne(item);
        res.json(result.ops[0]);
      } catch (err) {
        console.error('Erro ao criar item:', err);
        res.status(500).json({ message: 'Erro ao criar item' });
      }
    });

    // Read By Id - [GET] /item/:id
    app.get('/item/:id', async function (req, res) {
      try {
        const id = req.params.id;
        const item = await collection.findOne({ _id: ObjectId(id) });
        if (!item) {
          res.status(404).json({ message: 'Item não encontrado' });
          return;
        }
        res.json(item);
      } catch (err) {
        console.error('Erro ao buscar item por ID:', err);
        res.status(500).json({ message: 'Erro ao buscar item por ID' });
      }
    });

    // Update - [PUT] /item/:id
    app.put('/item/:id', async function (req, res) {
      try {
        const id = req.params.id;
        const novoNome = req.body.nome;
        const result = await collection.updateOne(
          { _id: ObjectId(id) },
          { $set: { nome: novoNome } }
        );
        if (result.modifiedCount === 0) {
          res.status(404).json({ message: 'Item não encontrado para atualização' });
          return;
        }
        res.json({ message: 'Item atualizado com sucesso' });
      } catch (err) {
        console.error('Erro ao atualizar item:', err);
        res.status(500).json({ message: 'Erro ao atualizar item' });
      }
    });

    // Delete - [DELETE] /item/:id
    app.delete('/item/:id', async function (req, res) {
      try {
        const id = req.params.id;
        const result = await collection.deleteOne({ _id: ObjectId(id) });
        if (result.deletedCount === 0) {
          res.status(404).json({ message: 'Item não encontrado para exclusão' });
          return;
        }
        res.json({ message: 'Item excluído com sucesso' });
      } catch (err) {
        console.error('Erro ao excluir item:', err);
        res.status(500).json({ message: 'Erro ao excluir item' });
      }
    });

    app.listen(port, () => {
      console.log(`Servidor rodando em http://localhost:${port}`);
    });

  } catch (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  }
}

main();
