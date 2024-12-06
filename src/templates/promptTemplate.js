function handleCustomResponse(response) {
  if (Array.isArray(response)) {
    return response.filter((item) => item !== "Outro").join(", ");
  }
  return response;
}

function generatePrompt(formData, missionsData) {
  const modelGamification = handleCustomResponse(formData.modelGamification);
  const perfilParticipantes = handleCustomResponse(
    formData.perfilParticipantes
  );
  const personalizacaoGamificacao = handleCustomResponse(
    formData.personalizacaoGamificacao
  );
  const generosNarrativa = handleCustomResponse(formData.generosNarrativa);
  const temaNarrativa = handleCustomResponse(formData.temaNarrativa);
  console.log(
    modelGamification +
      " " +
      perfilParticipantes +
      " " +
      personalizacaoGamificacao +
      " " +
      generosNarrativa +
      " " +
      temaNarrativa
  );

  let prompt = `Pegue essas respostas para criar uma narrativa gamificada seguindo as diretrizes logo abaixo:
  Modelo que será gamificado: ${modelGamification},
  Tempo de duração (dias, horas, minutos): ${formData.dias}, ${formData.horas}, ${formData.minutos},
  Assunto ministrado no modelo: ${formData.topicGamificacao},
  Formato: ${formData.formatoAplicacao},
  Quantidade de missões (atividades gamificadas): ${formData.qtdeMissoes},
  Quantidade de participantes: ${formData.qtdeParticipantes},
  Perfil dos participantes: ${perfilParticipantes},
  Personalizações na gamificação: ${personalizacaoGamificacao},
  Gênero da narrativa: ${generosNarrativa},
  Tema da narrativa: ${temaNarrativa}.

  Com base nestas respostas crie uma narrativa para esta gamificação, em estilo de roteiro tendo um início, 
  o clímax da história, que é o ponto alto da narrativa com a tarefa mais difícil e o fim.

  Siga essa estrutura e seja breve, não enrole muito:

  1. Introdução
  Faça um parágrafo dando características para esse mundo, pois é ele o palco de todos os acontecimentos. 
  O nome desse mundo? Histórico do mundo, O tempo em que se passa a história, Detalhes sobre o ambiente, 
  Problemas enfrentados caso haja algum problema para enfrentar, Regra/Leis deste mundo.

  2. Fale sobre o JOGADOR
  Faça um parágrafo sobre Detalhes pessoais, fisiológicos e outros que definam bem os jogadores. 
  Contando a história dos jogadores, por que estão ali?, Sua rotina no mundo criado, O tipo de envolvimento social 
  que ocorre no mundo criado.

  3. Conte a trama
  Neste parágrafo diga o que rolou de diferente, diga quem é o vilão (lembre-se de vincular a história do mundo, 
  ele não precisa ser uma pessoa, pode ser um acontecimento também ou outra coisa que desestabilizou o mundo do herói). 
  Algo que aconteceu fora do comum, ou planejado? Foi uma emboscada? Alguém saiu ferido ou sequestrado? Era um ou mais vilões? 
  Tem um plano maligno? O que vai acontecer no mundo e com os jogadores? É importante trabalhar o acontecimento até o fim 
  da história. Quem pode auxiliar a resolver esses problemas? (Vamos chamar os heróis).

  4. Chegou a hora de fazer a “Chamada” para missão.
  Neste parágrafo Informe como será o novo mundo (caso ocorram modificações ou trocas). Qual o objetivo do jogador? 
  Quais os seus maiores desejos, que o impulsionam para trilhar essa jornada? Os obstáculos que ele vai encontrar ao longo 
  do caminho que está traçando rumo a seu objetivo? Que tipos de recompensas ele pode encontrar pelo caminho? Será premiado? 
  Tem algum segredo envolvido na trama? A jornada vai ser longa? As pessoas irão reconhecê-lo como um herói? Como ele vai saber 
  que está avançando e indo no caminho certo? Seria bom usar um mapa? Vai ter algo que o jogador vai recolher como item de colecionador? 
  Existe algum tipo de punição? É importante deixar clara a progressão do jogador, mencionando sobre o que lhe espera no desafio final, 
  fazendo analogia com a aplicação mais difícil de todas. Existe trabalho em equipe? Se for trabalhar com equipes, como você as formaria 
  dentro dessa proposta? Mistura entre mais velhos e mais novos? Seria um balanceamento por algum tipo de nota? Ou divisão de grupos apenas 
  por quantidade de participantes, escolhendo cada um de forma aleatória? Diga-nos a sua lógica.

  5. Sobre pontuação:
  - Pense em uma pontuação que envolva as avaliações, os ganhos e comportamentos durante o percurso do jogador.
  - Faça uma lista de emblemas, distintivos ou outras formas de pontuação que serão utilizados e seus nomes para esta gamificação de acordo 
  com o tema.
  - O que acontece se uma pessoa não cumprir uma missão? Tem como recuperar esse ponto?
  - Presença conta como ponto?
  - Lembre-se de deixar clara a forma como os pontos são calculados. Ex: Missões realizadas + Ganhos + Presença = Próximo Lvl de XP.
  
  6. Para a missão ou mais se tiver mais de uma:
  - Título da fase.
  - Conteúdo de aprendizagem que será explorado.
  - Local onde ocorre.
  - Envolvidos externos.
  - Inimigos presentes na fase.
  - Descreva o problema (Caso exista).
  - Descreva o objetivo do jogador.
  - Defina a missão de acordo com o conteúdo de aprendizagem. 
  Com base siga as diretrizes que devem ter na ou nas missões:`;

  // Adicionando as missões ao prompt
  missionsData.forEach((mission, index) => {
    const evaluationType = handleCustomResponse(mission.evaluationType);
    const missionObstacles = handleCustomResponse(mission.missionObstacles);
    const interactionType = handleCustomResponse(mission.interactionType);
    const rewardType = handleCustomResponse(mission.rewardType);
    const evaluationGamification = handleCustomResponse(
      mission.evaluationGamification
    );
    const feedbackType = handleCustomResponse(mission.feedbackType);

    prompt += `
    \n\nMissão ${index + 1}:
    - Conteúdo aprendido: ${mission.content}
    - Tipo de avaliação: ${evaluationType}
    - Obstáculos na missão (seja criativo, mas algo que esteja de acordo com o assunto e seja possível aplicar digital ou presencial): ${missionObstacles}
    - Tipo de interação entre participantes: ${interactionType}
    - Tipo de recompensas: ${rewardType}
    - Avaliação da gamificação: ${evaluationGamification}
    - Tipo de feedback: ${feedbackType}
    - Resultado em caso de missão não concluída: ${mission.missionIncompleteOutcome.join(
      ", "
    )}
    `;
  });

  /*
  - Título da fase.
  - Conteúdo de aprendizagem que será explorado.
  - Local onde ocorre.
  - Envolvidos externos.
  - Inimigos presentes na fase.
  - Descreva o problema (Caso exista).
  - Descreva o objetivo do jogador.
  - Defina a missão de acordo com o conteúdo de aprendizagem.
  - O que acontece se alguém não conseguir completar a missão?
  - Uma missão não concluída pode ser substituída por outra forma de ganho de pontos? Como a pessoa pode se redimir nesse caso?
  - No mínimo 1 (um) desafio.*/
  prompt += `
  7. O DESAFIO FINAL - Esse é o momento onde os jogadores vão se deparar com o maior dos obstáculos.
  É PRECISO...
  - Explorar o vilão ao máximo.
  - Conectar a etapa com alguns elementos encontrados pela jornada do herói, para gerar flashbacks.
  - Fazer com que o jogador entenda que tudo que ele já viu durante a jornada deve ser usado agora.
  - Dar dicas sobre o que deve ser feito para poder vencer esta etapa.
  - A aula/conteúdo mais complexo deve ser aplicada neste estágio.
  - Lembre-se de fazer com que o jogador utilize as habilidades que desenvolveu durante a sua jornada.

  8. Analise as pontuações e parabenize os jogadores conforme o placar de classificação.
  - É importante acompanhar o placar de pontos.
  - Missões realizadas + Ganhos + Presença = XP.
  - Você decide a premiação, seria a chance de se gabar? Quais as conquistas dos heróis lembrem que elas têm que estar ligadas 
  à participação, conhecimento, cumprimento das missões.

  9. Finalize a história, fale sobre como tudo voltou ao normal, ou como tudo mudou a partir das ações realizadas pelo jogador.
  `;

  return prompt;
}

module.exports = { generatePrompt };
