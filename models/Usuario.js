const mongoose = require('../database/mongo');


const usuarioSchema = new mongoose.Schema({
    nome: String,
    email: String,
    senha: String,
},{collection: 'usuarios'});
  
  const Usuario = mongoose.model('Usuario', usuarioSchema);

  module.exports = Usuario;