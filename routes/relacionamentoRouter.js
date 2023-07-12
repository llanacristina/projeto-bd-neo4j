var express = require('express');
var router = express.Router();

const relacionamentoController = require('../controllers/RelacionamentoController')

router.post('/criar-relacionamento',relacionamentoController.criarRelacionamento);

module.exports = router;