const { callGeminiAPI } = require('../middlewares/geminiAPI');
const { generatePrompt } = require('../templates/promptTemplate');
const { marked } = require('marked');

const create = async (req, res) => {
  // Usa qtdeMissoes da requisição ou da query, sem forçar um valor para currentMission
  const qtdeMissoes =
    parseInt(req.body.qtdeMissoes, 10) || parseInt(req.query.qtdeMissoes, 10);

  // Se `currentMission` ainda não estiver na sessão, inicialize com 1
  if (!req.session.currentMission) {
    req.session.currentMission = 1;
  }

  //console.log('qtdeMissoes na requisição:', qtdeMissoes);
  //console.log('currentMission antes da lógica:', req.session.currentMission);

  if (req.method === 'GET') {
    // Renderiza o formulário para a missão atual
    res.render('missions/create', {
      currentMission: req.session.currentMission,
      qtdeMissoes,
    });
  } else {
    try {
      const missionData = req.body;
      console.log('Dados da missão recebidos:', missionData);

      // Armazena as missões na sessão
      req.session.missionsData = req.session.missionsData || [];
      req.session.missionsData.push(missionData);

      // Incrementa currentMission na sessão
      req.session.currentMission += 1;

      // Verifica se todas as missões foram completadas
      if (req.session.currentMission <= qtdeMissoes) {
        console.log(
          'Redirecionando para a próxima missão:',
          req.session.currentMission,
        );
        res.redirect(`/missions/create?qtdeMissoes=${qtdeMissoes}`);
      } else {
        console.log('Processando todas as missões.');
        const formData = req.session.projectData;
        const missionsData = req.session.missionsData;

        const prompt = generatePrompt(formData, missionsData);
        const aiResponse = await callGeminiAPI(prompt);
        const markdownContent = marked(aiResponse);

        // Limpa a sessão após o processamento
        req.session.missionsData = [];
        req.session.currentMission = null;

        res.render('main/hb1', { formData, missionsData, markdownContent });
      }
    } catch (err) {
      console.log('Erro no processamento das missões:', err);
      res.status(500).send(err);
    }
  }
};

module.exports = { create };
