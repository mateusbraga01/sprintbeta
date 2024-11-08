// models/UserModel.js
const db = require('../db/database');

class UserModel {
  static registerUser(email, password, tag, callback) {
    const sql = 'INSERT INTO users (email, password, tag) VALUES (?, ?, ?)';
    db.run(sql, [email, password, tag], function (err) {
      if (err) {
        return callback(err);
      }
      callback(null, this.lastID);
    });
  }

  static loginUser(email, password, callback) {
    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.get(sql, [email, password], (err, row) => {
      if (err) {
        return callback(err);
      }
      callback(null, row);
    });
  }

  static addAcademia({ nome, endereco, tipo, preco, horario, imagem }, callback) {
    const sql = 'INSERT INTO academias (nome, endereco, tipo, preco, horario, imagem) VALUES (?, ?, ?, ?, ?, ?)';
    db.run(sql, [nome, endereco, tipo, preco, horario, imagem], function (err) {
      if (err) {
        return callback(err);
      }
      callback(null, this.lastID);
    });
  }

  static deleteAcademia(id, callback) {
    const sql = 'DELETE FROM academias WHERE id = ?';
    db.run(sql, [id], function (err) {
      if (err) {
        return callback(err);
      }
      callback(null);
    });
  }

  static getAllAcademias(callback) {
    const sql = 'SELECT * FROM academias';
    db.all(sql, [], (err, rows) => {
      if (err) {
        return callback(err);
      }
      callback(null, rows);
    });
  }
}

module.exports = UserModel;
