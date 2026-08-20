exports.listar = (req, res) => {
  res.json({ produtos: [], total: 0 });
};

exports.obterPorId = (req, res) => {
  res.json({ produto: { id: req.params.id, nome: 'Sapato', preco: 99.90 } });
};

exports.criar = (req, res) => {
  res.json({ message: 'Produto criado', id: 1 });
};

exports.atualizar = (req, res) => {
  res.json({ message: 'Produto atualizado', id: req.params.id });
};

exports.deletar = (req, res) => {
  res.json({ message: 'Produto deletado', id: req.params.id });
};
