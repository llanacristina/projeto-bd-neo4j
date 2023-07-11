var express = require('express');
var router = express.Router();

const usuarioController = require('../controllers/UsuarioController');
const neo4j = require ('../database/neo4j')
//USUARIO//
router.post('/', usuarioController.cadastrarUsuario);
router.post('/', usuarioController.fazerLogin);
router.post('/',neo4j.criarRelacionamento);

router.get('/', usuarioController.listarUsuarios);
router.delete('/:id', usuarioController.excluirUsuario);
  

module.exports = router;