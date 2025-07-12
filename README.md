# API REST - Carrinho de Compras E-commerce

Esta é uma API REST desenvolvida em JavaScript com Express para gestão de carrinho de compras em um e-commerce. O projeto foi criado para estudos de teste de software.

## 🚀 Funcionalidades

- ✅ Adicionar produto ao carrinho
- ✅ Remover produto do carrinho
- ✅ Alterar quantidade de produtos no carrinho
- ✅ Listar produtos do carrinho

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Swagger** - Documentação da API
- **CORS** - Cross-Origin Resource Sharing
- **Helmet** - Segurança
- **Morgan** - Logging de requisições

## 📦 Instalação

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

## 🚀 Como Executar

### Desenvolvimento (com hot reload)
```bash
npm run dev
```

### Produção
```bash
npm start
```

## 📚 Documentação da API

A documentação interativa da API está disponível através do Swagger UI:

**URL do Swagger:** http://localhost:3000/api-docs

## 🔗 Endpoints da API

### Base URL: `http://localhost:3000`

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/carrinho` | Listar todos os produtos do carrinho |
| POST | `/api/carrinho` | Adicionar produto ao carrinho |
| PATCH | `/api/carrinho/:id` | Alterar quantidade de um produto |
| DELETE | `/api/carrinho/:id` | Remover produto do carrinho |

## 📝 Exemplos de Uso

### Adicionar produto ao carrinho
```bash
POST /api/carrinho
Content-Type: application/json

{
  "id": 1,
  "nome": "Produto Teste",
  "preco": 29.99,
  "quantidade": 2
}
```

### Alterar quantidade
```bash
PATCH /api/carrinho/1
Content-Type: application/json

{
  "quantidade": 5
}
```

## 🧪 Testes

Para executar os testes:
```bash
npm test
```

## 📊 Estrutura do Projeto

```
carrinho_aulaAoVivoCursor/
├── src/
│   ├── server.js          # Servidor principal
│   ├── routes/
│   │   └── carrinho.js    # Rotas do carrinho
│   ├── controllers/
│   │   └── carrinhoController.js  # Lógica de negócio
│   └── swagger/
│       └── swagger.js     # Configuração do Swagger
├── package.json
└── README.md
```

## 🔧 Configuração

- **Porta:** 3000 (configurável via variável de ambiente PORT)
- **Armazenamento:** Em memória (sem persistência)
- **Formato de dados:** JSON

## 📝 Notas Importantes

- Esta API é destinada apenas para estudos de teste de software
- Os dados são armazenados em memória (não há persistência)
- Não há autenticação implementada
- A API não está preparada para produção

## 🤝 Contribuição

Este projeto foi criado para fins educacionais. Sinta-se à vontade para estudar e modificar o código conforme necessário. 