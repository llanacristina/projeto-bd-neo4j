const neo4j = require('neo4j-driver');

const driver = neo4j.driver("neo4j://localhost", neo4j.auth.basic("neo4j", "neo4j123*"));

const criarRelacionamento = (req, res) => {
  const nomeUsuario = req.body.nomeUsuario;
  const nomeEvento = req.body.nomeEvento;
  console.log(nomeUsuario);

  const session = driver.session();

  session.run(
    "MATCH (u:Usuario {nome: $nomeUsuario}) " +
    "WITH u " +
    "MATCH (e:Evento {nome: $nomeEvento}) " +
    "CREATE (u)-[:PARTICIPA]->(e)",
    { nomeUsuario: nomeUsuario, nomeEvento: nomeEvento }
  )
  .then(() => {
    session.close();
    res.status(200).send("Usuário criado e relacionado ao evento no Neo4j com sucesso!");
  })
  .catch((error) => {
    console.log("Erro ao criar usuário e relacionamento no Neo4j:", error);
    res.status(500).send("Erro ao criar usuário e relacionamento no Neo4j");
  });
};

module.exports ={
    criarRelacionamento
}