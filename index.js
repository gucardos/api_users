require('dotenv/config')

const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
// Configuração do MySQL


const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.MYSQL_USER, // Usa variáveis de ambiente
    password:  process.env.MYSQL_ROOT_PASSWORD, // Usa variáveis de ambiente
    database:  process.env.MYSQL_DATABASE, // Usa variáveis de ambiente
  });
  
  // Conectar ao banco de dados
  connection.connect((err) => {
    if (err) throw err;
    console.log('Conectado ao banco de dados MySQL');
  });
  
  // Middleware para analisar corpos de solicitação
  app.use(bodyParser.json());
  
  // Rotas CRUD
  
  // Criar usuário
  app.post('/users', (req, res) => {
    const { name, email } = req.body;
    const INSERT_USER_QUERY = `INSERT INTO users (name, email) VALUES (?, ?)`;
    connection.query(INSERT_USER_QUERY, [name, email], (err, results) => {
      if (err) throw err;
      res.send('Usuário criado com sucesso');
    });
  });
  
  // Obter todos os usuários
  app.get('/users', (req, res) => {
    connection.query('SELECT * FROM users', (err, results) => {
      if (err) throw err;
      res.json(results);
    });
});

// Obter um usuário por ID
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  const SELECT_USER_QUERY = `SELECT * FROM users WHERE id = ?`;
  connection.query(SELECT_USER_QUERY, [userId], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

//Editar usuário
app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const { name, email } = req.body;
  const INSERT_USER_QUERY = `UPDATE users set name=?, email=? where id= ?`;
  connection.query(INSERT_USER_QUERY, [name, email, userId], (err, results) => {
    if (err) throw err;
    res.send('Usuário atualizado com sucesso');
  });
});


// Iniciar o servidor
const server = app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});


module.exports = {app,server};