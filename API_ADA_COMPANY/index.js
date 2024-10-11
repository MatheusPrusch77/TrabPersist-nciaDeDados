//require('dotenv').config(); será necessário aguardar a implementação do login para funcionar o jwt token
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

// Importando rotas
const clienteRoute = require('./src/routes/clienteRoute');
const servicoRoute = require('./src/routes/servicoRoute');
const funcionarioRoute = require('./src/routes/funcionarioRoute');
const orcamentoRoute = require('./src/routes/orcamentoRoute');
const authRoutes = require('./src/routes/authRoutes');


// Swagger para documentação da API
const swaggerDocument = require('./swagger.json');
const swaggerUi = require('swagger-ui-express');

// Middleware para JSON
app.use(express.json());

// Middleware para body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Rota de autenticação
app.use('/api/auth', authRoutes);

// Rotas das funcionalidades (cliente, serviço, funcionário, orçamento)
app.use(clienteRoute);
app.use(servicoRoute);
app.use(funcionarioRoute);
app.use(orcamentoRoute);

// Swagger (Documentação)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Conexão com o banco de dados MongoDB
let url = 'mongodb://localhost:27017/TESTE';
let mongodb = process.env.MONGODB_URI || url;
mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

// Verificação de conexão com o banco de dados
let db = mongoose.connection;
db.on('error', console.error.bind(console, "Erro ao conectar com o banco de dados"));

// Iniciando o servidor
app.listen(3000, () => {
    console.log('Servidor em execução na porta 3000');
});
