// mainController.js
//console.log("Carregando mainController");
const index = (req, res) => {
  console.log('Chamando index');
  res.render('index');
};

const hb1 = (req, res) => {
  console.log('Chamando hb1');
  res.render('main/hb1');
};

module.exports = { index, hb1 };
