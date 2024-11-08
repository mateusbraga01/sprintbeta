// index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const db = require('./db/database');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Rotas de autenticação e academias
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
