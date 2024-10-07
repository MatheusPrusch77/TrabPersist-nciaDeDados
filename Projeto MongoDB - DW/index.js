const express = require('express');
const bodyParser = require ('body-parser');
const mongoose = require ('mongoose');
const app = express();
const userRoute = require('./src/routes/userRoute')
const projectRoute = require('./src/routes/projectRoute')
const swaggerDocument = require('./swagger.json');
const swaggerUi = require('swagger-ui-express'); 

app.use(express.json());
app.use(projectRoute)
app.use(userRoute)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

let url = 'mongodb://localhost:27017/TESTE'
let mongodb = process.env.MONGODB_URI || url;
mongoose.connect(mongodb);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, "erro ao conectar com a base de dados"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.listen(3000, () =>{
    console.log ('Servidor em execusão na porta 3000');
});

