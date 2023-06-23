const express = require('express');
const cors = require('cors');
const router = require('./routes/EventoRouter')

const app = express();
app.use(express.json());
app.use(cors());

app.use('/eventos', router);

const port = 3000;
const database = require('./database/mongo.js');

app.listen(port, ()=>{
    console.log(`App running on port ${port}.`);
});