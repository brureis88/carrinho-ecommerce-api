const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API REST - Carrinho de Compras E-commerce',
      version: '1.0.0',
      description: 'API REST desenvolvida em JavaScript com Express para gestão de carrinho de compras em um e-commerce. Criada para estudos de teste de software.',
      contact: {
        name: 'Estudos de Teste de Software',
        email: 'estudos@teste.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de Desenvolvimento'
      }
    ],
    tags: [
      {
        name: 'Carrinho',
        description: 'Endpoints para gestão do carrinho de compras'
      }
    ],
    components: {
      schemas: {
        Produto: {
          type: 'object',
          required: ['id', 'nome', 'preco', 'quantidade'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID único do produto'
            },
            nome: {
              type: 'string',
              description: 'Nome do produto'
            },
            preco: {
              type: 'number',
              format: 'float',
              description: 'Preço do produto'
            },
            quantidade: {
              type: 'integer',
              description: 'Quantidade do produto'
            }
          }
        },
        Carrinho: {
          type: 'object',
          properties: {
            produtos: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Produto'
              }
            },
            total: {
              type: 'number',
              format: 'float',
              description: 'Valor total do carrinho'
            },
            quantidadeItens: {
              type: 'integer',
              description: 'Quantidade de itens no carrinho'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            error: {
              type: 'string',
              description: 'Tipo do erro'
            },
            message: {
              type: 'string',
              description: 'Descrição detalhada do erro'
            }
          }
        },
        Success: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            message: {
              type: 'string',
              description: 'Mensagem de sucesso'
            },
            data: {
              type: 'object',
              description: 'Dados retornados'
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js'] // Caminho para os arquivos de rota
};

module.exports = swaggerOptions; 