const Usuario = require('../models/Usuario')
const neo4j = require('neo4j-driver');

const url = 'neo4j://localhost';
const driver = neo4j.driver(url, neo4j.auth.basic('neo4j', 'neo4j123*'));


const criarUsuario = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const session = driver.session();

    // Verificar se o usuário já existe no Neo4j
    const existeUsuario = await session.run(
      'MATCH (u:Usuario {email: $email}) RETURN COUNT(u) AS count',
      { email }
    );

    const count = existeUsuario.records[0].get('count').toNumber();
    if (count > 0) {
      return res.status(400).send('O usuário já existe no Neo4j.');
    }

    // Criar o usuário no Neo4j
    const result = await session.run(
      'CREATE (u:Usuario {nome: $nome, email: $email, senha:$senha})',
      { nome, email, senha }
    );
    console.log(nome);

    session.close();
    driver.close();

    res.status(200).send('Usuário criado');
  } catch (error) {
    console.error('Erro ao criar usuário no Neo4j:', error);
    res.status(500).send('Erro ao criar usuário no Neo4j.');
  }
};

const fazerLogin = async (req, res) => {
  const { nome, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ nome: nome, senha: senha});

    if (usuario) {
      console.log(usuario); // Exibir informações do usuário no console
      res.send('Login bem-sucedido!');
    } else {
      res.send('Credenciais inválidas. Tente novamente...');
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};


module.exports = {
  criarUsuario, fazerLogin
}