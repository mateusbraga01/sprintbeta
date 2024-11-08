// routes/auth.js
const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');

// Rota de registro de usuário
router.post('/register', (req, res) => {
  const { email, password, tag } = req.body;

  UserModel.registerUser(email, password, tag, (err, userId) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.status(201).json({ id: userId });
  });
});

// Rota de login de usuário
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  UserModel.loginUser(email, password, (err, user) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (user) {
      res.json({ user });
    } else {
      res.status(401).json({ error: 'Credenciais inválidas' });
    }
  });
});

// Rota para adicionar academia
router.post('/add-academia', (req, res) => {
  const { nome, endereco, tipo, preco, horario, imagem } = req.body;

  UserModel.addAcademia({ nome, endereco, tipo, preco, horario, imagem }, (err, academiaId) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.status(201).json({ id: academiaId });
  });
});

// Rota para deletar academia
router.delete('/delete-academia/:id', (req, res) => {
  const { id } = req.params;

  UserModel.deleteAcademia(id, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.status(200).json({ message: 'Academia excluída com sucesso' });
  });
});

module.exports = router;
