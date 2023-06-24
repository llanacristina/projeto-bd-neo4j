require('dotenv').config();
const neo4j = require('neo4j-driver')

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
 
/*TESTE*/
    /*salvar();
async function salvar(){
    var session = driver.session();

    await session.run('CREATE(:Teste{nome:$nome, idade:$idade})',{
    nome: 'ANA', idade: 21
  }).then(result => console.log(result)).catch(e => console.log(e));
  session.close();
  driver.close();
};*/