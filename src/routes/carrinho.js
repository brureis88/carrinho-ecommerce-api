const express = require('express');
const router = express.Router();
const carrinhoController = require('../controllers/carrinhoController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Produto:
 *       type: object
 *       required:
 *         - id
 *         - nome
 *         - preco
 *         - quantidade
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único do produto
 *         nome:
 *           type: string
 *           description: Nome do produto
 *         preco:
 *           type: number
 *           description: Preço do produto
 *         quantidade:
 *           type: integer
 *           description: Quantidade do produto
 *     Carrinho:
 *       type: object
 *       properties:
 *         produtos:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Produto'
 *         total:
 *           type: number
 *           description: Valor total do carrinho
 *         quantidadeItens:
 *           type: integer
 *           description: Quantidade de itens no carrinho
 */

/**
 * @swagger
 * /api/carrinho:
 *   get:
 *     summary: Listar todos os produtos do carrinho
 *     tags: [Carrinho]
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Carrinho'
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', carrinhoController.listarProdutos);

/**
 * @swagger
 * /api/carrinho:
 *   post:
 *     summary: Adicionar produto ao carrinho
 *     tags: [Carrinho]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Produto'
 *     responses:
 *       201:
 *         description: Produto adicionado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Produto'
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', carrinhoController.adicionarProduto);

/**
 * @swagger
 * /api/carrinho/{id}:
 *   patch:
 *     summary: Alterar quantidade de um produto no carrinho
 *     tags: [Carrinho]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantidade:
 *                 type: integer
 *                 description: Nova quantidade do produto
 *     responses:
 *       200:
 *         description: Quantidade atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Produto'
 *       400:
 *         description: Quantidade inválida
 *       404:
 *         description: Produto não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.patch('/:id', carrinhoController.alterarQuantidade);

/**
 * @swagger
 * /api/carrinho/limpar:
 *   delete:
 *     summary: Limpar todo o carrinho
 *     tags: [Carrinho]
 *     responses:
 *       200:
 *         description: Carrinho limpo com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Carrinho'
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/limpar', carrinhoController.limparCarrinho);

/**
 * @swagger
 * /api/carrinho/{id}:
 *   delete:
 *     summary: Remover produto do carrinho
 *     tags: [Carrinho]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto removido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Produto'
 *       404:
 *         description: Produto não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/:id', carrinhoController.removerProduto);

module.exports = router; 