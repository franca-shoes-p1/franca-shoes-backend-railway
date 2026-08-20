exports.criar = (req, res) => {
  res.json({ message: 'Pedido criado', id: 1 });
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
