const { Router } = require('express');
const mainController = require('../controllers/main');
const projectController = require('../controllers/project');
const missionController = require('../controllers/mission');

const router = Router();

// Teste
//router.get('/', projectController.index);
/*router.get("/main/hb1", mainController.hb1);*/
router.get('/', (req, res) => {
  res.redirect('/project');
});

// Project
router.get('/project', projectController.index);
router.get('/project/create', projectController.create);
router.post('/project/create', projectController.create);

// Mission
router.get('/missions/create', missionController.create);
router.post('/missions/create', missionController.create);

module.exports = router;
