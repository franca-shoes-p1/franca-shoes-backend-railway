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

    // SALVAR NO SUPABASE
    const { data: pedidoCriado, error } = await supabase
      .from('pedidos')
      .insert([pedidoData])
      .select();

    if (error) throw error;

    console.log('✅ Pedido salvo no banco:', pedidoCriado[0].id);

    // ✅ DISPARAR BOTS AQUI
    try {
      const clienteData = {
        nome: nome,
        email: email,
        telefone: telefone,
        endereco: endereco
      };

      console.log('🤖 Chamando bots...');
      await dispararTodosBots(pedidoCriado[0], clienteData);
      console.log('✅ Bots disparados!');
    } catch (botError) {
      console.error('⚠️ Erro bots:', botError.message);
    }

    return res.json({
      status: 'sucesso',
      pedido: pedidoCriado[0],
      mensagem: 'Pedido criado e bots acionados!'
    });

  } catch (erro) {
    console.error('Erro ao criar pedido:', erro);
    return res.status(500).json({ erro: 'Erro ao criar pedido' });
  }
};

exports.listar = (req, res) => {
  res.json({ pedidos: [] });
};

exports.obterPorId = (req, res) => {
  res.json({ pedido: { id: req.params.id, status: 'pendente' } });
};

exports.cancelar = (req, res) => {
  res.json({ mensagem: 'Pedido cancelado', id: req.params.id });
};

exports.atualizarStatus = (req, res) => {
  res.json({ mensagem: 'Status atualizado', id: req.params.id });
};
