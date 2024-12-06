const index = async (req, res) => {
  try {
    res.render('project/index');
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const create = async (req, res) => {
  if (req.method === 'GET') {
    res.render('project/create');
  } else {
    try {
      const formData = req.body;
      //console.log(formData);

      // Verifique se qtdeMissoes foi enviado corretamente
      const qtdeMissoes = formData.qtdeMissoes;
      //console.log('qtdeMissoes:', qtdeMissoes);
      if (isNaN(qtdeMissoes) || qtdeMissoes <= 0) {
        return res.status(400).send('Quantidade de missões inválida');
      }

      // Armazena os dados do projeto na sessão
      req.session.projectData = formData;

      // Redireciona para o formulário de missões
      res.redirect(
        `/missions/create?qtdeMissoes=${qtdeMissoes}&currentMission=1`,
      );
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }
};

module.exports = { index, create };
