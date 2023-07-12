var express = require('express');
var router = express.Router();

const usuarioController = require('../controllers/UsuarioController');
//USUARIO//
router.post('/', usuarioController.cadastrarUsuario);
router.post('/', usuarioController.fazerLogin);

module.exports = router;