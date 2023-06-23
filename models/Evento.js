const mongoose = require('../database/mongo');


const eventoSchema = new mongoose.Schema({
    nome: String,
    descricao: String,
    dataDeInicio: String,
    dataDeTermino: String,
    local: String,
    lat: Number,
    lng: Number,
},{collection: 'eventos'});
  
  eventoSchema.index({nome:'text', descricao:'text'},{default_language:'pt', weights:{nome:2, descricao:1}});
  
  const Evento = mongoose.model('Evento', eventoSchema);

  module.exports = Evento;