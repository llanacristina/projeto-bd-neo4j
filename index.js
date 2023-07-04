const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/Router')

const app = express();
app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/eventos', router);

const port = 3000;
const database = require('./database/mongo.js');
const dbNeo4j = require('./database/neo4j');

app.listen(port, ()=>{
    console.log(`App running on port ${port}.`);
});