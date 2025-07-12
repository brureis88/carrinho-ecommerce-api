const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Importar rotas
const carrinhoRoutes = require('./routes/carrinho');

// Importar configuração do Swagger
const swaggerOptions = require('./swagger/swagger');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares de segurança e logging
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));

// Middleware para parsing de JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração do Swagger
const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Rota raiz
app.get('/', (req, res) => {
  res.json({
    message: 'API REST - Carrinho de Compras E-commerce',
    version: '1.0.0',
    documentation: '/api-docs'
  });
});

// Rotas da API
app.use('/api/carrinho', carrinhoRoutes);

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Erro interno do servidor',
    message: err.message
  });
});

// Middleware para rotas não encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Rota não encontrada',
    message: `A rota ${req.originalUrl} não existe`
  });
});

// Iniciar servidor apenas se não estiver sendo executado pelos testes
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📚 Documentação disponível em: http://localhost:${PORT}/api-docs`);
    console.log(`🔗 API disponível em: http://localhost:${PORT}/api/carrinho`);
  });
}

module.exports = app; 