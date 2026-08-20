exports.registrar = (req, res) => {
  res.json({ message: 'Usuário registrado com sucesso', success: true });
};

exports.login = (req, res) => {
  res.json({ message: 'Login realizado', token: 'jwt-token-aqui' });
};

exports.obterPerfil = (req, res) => {
  res.json({ perfil: { id: 1, nome: 'Ricardo', email: 'ricardo@test.com' } });
};

exports.atualizarPerfil = (req, res) => {
  res.json({ message: 'Perfil atualizado com sucesso' });
};

exports.alterarSenha = (req, res) => {
  res.json({ message: 'Senha alterada com sucesso' });
};
