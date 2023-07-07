const Usuario = require('../models/Usuario')

const cadastrarUsuario = async (req, res) => {
    try {
      const usuario = await Usuario.create(req.body);
      console.log(usuario);
       // Exibe o usuário cadastrado no console
      res.status(200).send(usuario);
    } catch (error) {
      console.error(error);
      res.status(400).send(error);
    }
  };

  const fazerLogin =  async (req, res) => {
    const { username, password } = req.body;
  
  try {
    const usuario = await Usuario.findOne({ username: username, password: password });
    
    if (usuario) {
      console.log(usuario); // Exibir informações do usuário no console
      res.send('Login bem-sucedido! Redirecionar para a página principal...');
    } else {
      res.send('Credenciais inválidas. Tente novamente...');
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};

const listarUsuarios = async (req, res) => {
    try {
      const usuarios = await Usuario.find();
      res.status(200).send(usuarios);
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao listar usuários');
    }
  };

  const excluirUsuario = async (req, res) => {
    const { id } = req.params;
  
    try {
      const usuario = await Usuario.findByIdAndDelete(id);
      res.status(200).send(`Usuário ${usuario.nome} excluído com sucesso`);
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao excluir usuário');
    }
  };

  module.exports = {
    cadastrarUsuario, fazerLogin,
    listarUsuarios, excluirUsuario
  }