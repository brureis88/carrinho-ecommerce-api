const request = require('supertest');
const { expect } = require('chai');
const app = require('../src/server');

describe('API Carrinho de Compras', () => {
  beforeEach(() => {
    // Limpar o carrinho antes de cada teste
    return request(app).delete('/api/carrinho/limpar');
  });

  describe('GET /api/carrinho', () => {
    it('deve retornar carrinho vazio', async () => {
      const response = await request(app)
        .get('/api/carrinho')
        .expect(200);

      expect(response.body.success).to.be.true;
      // expect(response.body.data.produtos).to.deep.equal([]);
      expect(response.body.data.total).to.equal(0);
      // expect(response.body.data.quantidadeItens).to.equal(0);
    });
  });

  describe('POST /api/carrinho', () => {
    it('deve adicionar produto ao carrinho', async () => {
      const produto = {
        id: 1,
        nome: 'Produto Teste',
        preco: 29.99,
        quantidade: 2
      };

      const response = await request(app)
        .post('/api/carrinho')
        .send(produto)
        .expect(201);

      expect(response.body.success).to.be.true;
      expect(response.body.data).to.deep.equal(produto);
    });

    it('deve retornar erro quando dados estão incompletos', async () => {
      const produtoIncompleto = {
        id: 1,
        nome: 'Produto Teste'
        // Faltam preco e quantidade
      };

      const response = await request(app)
        .post('/api/carrinho')
        .send(produtoIncompleto)
        .expect(400);

      expect(response.body.success).to.be.false;
      expect(response.body.error).to.equal('Dados incompletos');
    });

    it('deve retornar erro quando quantidade é inválida', async () => {
      const produto = {
        id: 2,
        nome: 'Produto Teste',
        preco: 29.99,
        quantidade: -1
      };

      const response = await request(app)
        .post('/api/carrinho')
        .send(produto)
        .expect(400);

      expect(response.body.success).to.be.false;
      expect(response.body.error).to.equal('Quantidade inválida');
    });

    it('deve atualizar quantidade quando produto já existe', async () => {
      const produto = {
        id: 1,
        nome: 'Produto Teste',
        preco: 29.99,
        quantidade: 2
      };

      // Adicionar produto pela primeira vez
      await request(app)
        .post('/api/carrinho')
        .send(produto)
        .expect(201);

      // Adicionar o mesmo produto novamente
      const response = await request(app)
        .post('/api/carrinho')
        .send(produto)
        .expect(200);

      expect(response.body.success).to.be.true;
      expect(response.body.data.quantidade).to.equal(4); // 2 + 2
    });
  });

  describe('PATCH /api/carrinho/:id', () => {
    beforeEach(async () => {
      // Adicionar produto para testes
      const produto = {
        id: 1,
        nome: 'Produto Teste',
        preco: 29.99,
        quantidade: 2
      };
      await request(app).post('/api/carrinho').send(produto);
    });

    it('deve alterar quantidade do produto', async () => {
      const response = await request(app)
        .patch('/api/carrinho/1')
        .send({ quantidade: 5 })
        .expect(200);

      expect(response.body.success).to.be.true;
      expect(response.body.data.quantidade).to.equal(5);
    });

    it('deve retornar erro quando produto não existe', async () => {
      const response = await request(app)
        .patch('/api/carrinho/999')
        .send({ quantidade: 5 })
        .expect(404);

      expect(response.body.success).to.be.false;
      expect(response.body.error).to.equal('Produto não encontrado');
    });

    it('deve retornar erro quando quantidade é inválida', async () => {
      const response = await request(app)
        .patch('/api/carrinho/1')
        .send({ quantidade: 0 })
        .expect(400);

      expect(response.body.success).to.be.false;
      expect(response.body.error).to.equal('Quantidade inválida');
    });
  });

  describe('DELETE /api/carrinho/:id', () => {
    beforeEach(async () => {
      // Adicionar produto para testes
      const produto = {
        id: 1,
        nome: 'Produto Teste',
        preco: 29.99,
        quantidade: 2
      };
      await request(app).post('/api/carrinho').send(produto);
    });

    it('deve remover produto do carrinho', async () => {
      const response = await request(app)
        .delete('/api/carrinho/1')
        .expect(200);

      expect(response.body.success).to.be.true;
      expect(response.body.data.id).to.equal(1);

      // Verificar se o produto foi removido
      const carrinhoResponse = await request(app)
        .get('/api/carrinho')
        .expect(200);

      expect(carrinhoResponse.body.data.produtos).to.deep.equal([]);
    });

    it('deve retornar erro quando produto não existe', async () => {
      const response = await request(app)
        .delete('/api/carrinho/999')
        .expect(404);

      expect(response.body.success).to.be.false;
      expect(response.body.error).to.equal('Produto não encontrado');
    });
  });

  describe('DELETE /api/carrinho/limpar', () => {
    beforeEach(async () => {
      // Adicionar produtos para testes
      const produtos = [
        { id: 1, nome: 'Produto 1', preco: 29.99, quantidade: 2 },
        { id: 2, nome: 'Produto 2', preco: 19.99, quantidade: 1 }
      ];

      for (const produto of produtos) {
        await request(app).post('/api/carrinho').send(produto);
      }
    });

    it('deve limpar todo o carrinho', async () => {
      const response = await request(app)
        .delete('/api/carrinho/limpar')
        .expect(200);

      expect(response.body.success).to.be.true;
      expect(response.body.data.produtos).to.deep.equal([]);
      expect(response.body.data.total).to.equal(0);
      expect(response.body.data.quantidadeItens).to.equal(0);
    });
  });

  describe('Cenários de integração', () => {
    it('deve calcular total corretamente com múltiplos produtos', async () => {
      const produtos = [
        { id: 1, nome: 'Produto 1', preco: 10.00, quantidade: 2 },
        { id: 2, nome: 'Produto 2', preco: 15.50, quantidade: 1 },
        { id: 3, nome: 'Produto 3', preco: 5.25, quantidade: 3 }
      ];

      // Adicionar produtos
      for (const produto of produtos) {
        await request(app).post('/api/carrinho').send(produto);
      }

      // Verificar carrinho
      const response = await request(app)
        .get('/api/carrinho')
        .expect(200);

      expect(response.body.data.produtos).to.have.lengthOf(3);
      expect(response.body.data.total).to.equal(10.00 * 2 + 15.50 * 1 + 5.25 * 3);
      expect(response.body.data.quantidadeItens).to.equal(3);
    });
  });
}); 