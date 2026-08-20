const supabase = require('../config/supabase');
const { dispararTodosBots } = require('../services/botService');

exports.criar = async (req, res) => {
  try {
    const { usuarioId, itens, total, endereco, telefone, nome, email } = req.body;

    // Validar dados
    if (!usuarioId || !itens || !total) {
      return res.status(400).json({ erro: 'Dados incompletos' });
    }

    // Preparar dados do pedido
    const pedidoData = {
      usuario_id: usuarioId,
      total: total,
      status: 'confirmado',
      endereco: endereco,
      telefone: telefone,
      nome: nome,
      email: email,
      itens: itens,
      data_criacao: new Date().toISOString()
    };

    // Salvar no Supabase
    const { data: pedidoCriado, error } = await supabase
      .from('pedidos')
      .insert([pedidoData])
      .select();

    if (error) throw error;

    // ✅ DISPARAR TODOS OS 4 BOTS AUTOMATICAMENTE
    try {
      console.log('🤖 Iniciando 4 bots...');
      
      const clienteData = {
        nome: nome,
        email: email,
        telefone: telefone,
        endereco: endereco
      };

      await dispararTodosBots(pedidoCriado[0], clienteData);
      console.log('✅ Bots disparados com sucesso!');
    } catch (botError) {
      console.error('⚠️ Erro ao disparar bots:', botError);
      // Continuar mesmo se bots falharem
    }

    res.json({
      status: 'sucesso',
      pedido: pedidoCriado[0],
      mensagem: 'Pedido criado e bots acionados!'
    });
  } catch (erro) {
    console.error('Erro ao criar pedido:', erro);
    res.status(500).json({ erro: 'Erro ao criar pedido' });
  }
};
exports.listar = (req, res) => {
  res.json({ pedidos: [] });
};

exports.obterPorId = (req, res) => {
  res.json({ pedido: { id: req.params.id, status: 'pendente' } });
};

exports.cancelar = (req, res) => {
  res.json({ message: 'Pedido cancelado', id: req.params.id });
};

exports.atualizarStatus = (req, res) => {
  res.json({ message: 'Status atualizado', id: req.params.id });
};
