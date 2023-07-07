const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const eventosRouter = require('./routes/eventoRouter')
const usuariosRouter = require('./routes/usuarioRouter')


const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/eventos', eventosRouter);
app.use('/usuarios', usuariosRouter);

const port = 3000;
const database = require('./database/mongo.js');
const dbNeo4j = require('./database/neo4j');

app.listen(port, ()=>{
    console.log(`App running on port ${port}.`);
});