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


  module.exports = {cadastrarUsuario, fazerLogin}