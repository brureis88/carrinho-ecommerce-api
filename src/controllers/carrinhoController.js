// Armazenamento em memória para o carrinho
let carrinho = [];

/**
 * Listar todos os produtos do carrinho
 */
const listarProdutos = (req, res) => {
  try {
    const total = carrinho.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
    
    res.json({
      success: true,
      data: {
        produtos: carrinho,
        total: total,
        quantidadeItens: carrinho.length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erro ao listar produtos do carrinho',
      message: error.message
    });
  }
};

/**
 * Adicionar produto ao carrinho
 */
const adicionarProduto = (req, res) => {
  try {
    const { id, nome, preco, quantidade } = req.body;

    // Validações
    if (!id || !nome || !preco || !quantidade) {
      return res.status(400).json({
        success: false,
        error: 'Dados incompletos',
        message: 'Todos os campos (id, nome, preco, quantidade) são obrigatórios'
      });
    }

    if (quantidade <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Quantidade inválida',
        message: 'A quantidade deve ser maior que zero'
      });
    }

    if (preco <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Preço inválido',
        message: 'O preço deve ser maior que zero'
      });
    }

    // Verificar se o produto já existe no carrinho
    const produtoExistente = carrinho.find(item => item.id === id);
    
    if (produtoExistente) {
      // Se já existe, apenas atualiza a quantidade
      produtoExistente.quantidade += quantidade;
      
      res.json({
        success: true,
        message: 'Quantidade do produto atualizada no carrinho',
        data: produtoExistente
      });
    } else {
      // Se não existe, adiciona novo produto
      const novoProduto = {
        id,
        nome,
        preco: parseFloat(preco),
        quantidade: parseInt(quantidade)
      };
      
      carrinho.push(novoProduto);
      
      res.status(201).json({
        success: true,
        message: 'Produto adicionado ao carrinho com sucesso',
        data: novoProduto
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erro ao adicionar produto ao carrinho',
      message: error.message
    });
  }
};

/**
 * Alterar quantidade de um produto no carrinho
 */
const alterarQuantidade = (req, res) => {
  try {
    const { id } = req.params;
    const { quantidade } = req.body;

    // Validações
    if (!quantidade || quantidade <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Quantidade inválida',
        message: 'A quantidade deve ser maior que zero'
      });
    }

    // Buscar produto no carrinho
    const produtoIndex = carrinho.findIndex(item => item.id == id);
    
    if (produtoIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Produto não encontrado',
        message: 'O produto não foi encontrado no carrinho'
      });
    }

    // Atualizar quantidade
    carrinho[produtoIndex].quantidade = parseInt(quantidade);
    
    res.json({
      success: true,
      message: 'Quantidade do produto atualizada com sucesso',
      data: carrinho[produtoIndex]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erro ao alterar quantidade do produto',
      message: error.message
    });
  }
};

/**
 * Remover produto do carrinho
 */
const removerProduto = (req, res) => {
  try {
    const { id } = req.params;

    // Buscar produto no carrinho
    const produtoIndex = carrinho.findIndex(item => item.id == id);
    
    if (produtoIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Produto não encontrado',
        message: 'O produto não foi encontrado no carrinho'
      });
    }

    // Remover produto
    const produtoRemovido = carrinho.splice(produtoIndex, 1)[0];
    
    res.json({
      success: true,
      message: 'Produto removido do carrinho com sucesso',
      data: produtoRemovido
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erro ao remover produto do carrinho',
      message: error.message
    });
  }
};

/**
 * Limpar todo o carrinho
 */
const limparCarrinho = (req, res) => {
  try {
    carrinho = [];
    
    res.json({
      success: true,
      message: 'Carrinho limpo com sucesso',
      data: {
        produtos: [],
        total: 0,
        quantidadeItens: 0
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erro ao limpar carrinho',
      message: error.message
    });
  }
};

module.exports = {
  listarProdutos,
  adicionarProduto,
  alterarQuantidade,
  removerProduto,
  limparCarrinho
}; 