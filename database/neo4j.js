require('dotenv').config();
const neo4j = require('neo4j-driver')
const Evento = require('../models/Evento');

const url = process.env.DB_URL;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

const driver = neo4j.driver(url,neo4j.auth.basic(user,password));

driver.verifyAuthentication().then(()=>{
    console.log('Conectado com Neo4j');
}).catch((error)=>{
    console.error('Erro ao conectar ao neo4j',error);
});

module.exports = neo4j

const mongoose = require('mongoose');

// Conexão com o MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/aula')
  .then(() => {
    transferirEventosParaNeo4j();
  })
  .catch(error => {
    console.error('Erro ao conectar ao MongoDB:', error);
  });

async function transferirEventosParaNeo4j() {
  try {
    const driver = neo4j.driver(url, neo4j.auth.basic(user, password));
    const session = driver.session();

    // Obtenha os eventos cadastrados no MongoDB
    const eventos = await Evento.find();

    // Crie os nós de eventos no Neo4j
    for (const evento of eventos) {
      const result = await session.run('MATCH (e:Evento {id: $id}) RETURN e', {id: evento._id.toString()});
      if(!result.records.length){
        await session.run(
          'CREATE (:Evento {id: $id, nome: $nome, descricao: $descricao})',
          { id: evento._id.toString(), nome: evento.nome, descricao: evento.descricao }
        );
        console.log(`Evento '${evento.nome}' importado para o Neo4j`);
      }
    }
    // Feche a conexão com o Neo4j
    await session.close();
    driver.close();

    console.log('Importação de eventos concluída');
  } catch (error) {
    console.error('Erro ao importar eventos para o Neo4j:', error);
  }
}