var express = require('express');
var router = express.Router();

const eventoController = require('../controllers/EventoController');

//EVENTOS//
router.get('/', eventoController.listarEventos);
router.get('/:conteudo',eventoController.buscarPorConteudo);
router.post('/', eventoController.salvarEvento);
router.delete('/:id',eventoController.deletarEvento);
router.put('/:id', eventoController.atualizarEvento);

module.exports = router;