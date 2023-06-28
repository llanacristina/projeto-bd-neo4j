var express = require('express');
var router = express.Router();

const eventoController = require('../controllers/EventoController');
//const usuarioController = require('../controllers/UsuarioController');

//EVENTOS//
router.get('/', eventoController.listarEventos);
router.get('/:conteudo',eventoController.buscarPorConteudo);
router.post('/', eventoController.salvarEvento);
router.delete('/:id',eventoController.deletarEvento);
router.put('/:id', eventoController.atualizarEvento);


//USUARIO//
//router.post('/cadastrar', usuarioController.cadastrarUsuario);


module.exports = router;