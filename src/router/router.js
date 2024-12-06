const { Router } = require('express');
const mainController = require('../controllers/main');
const projectController = require('../controllers/project');
const missionController = require('../controllers/mission');

const router = Router();

/*router.get('/', mainController.index);
router.get("/main/hb1", mainController.hb1);*/

// Project
router.get('/project', projectController.index);
router.get('/project/create', projectController.create);
router.post('/project/create', projectController.create);

// Mission
router.get('/missions/create', missionController.create);
router.post('/missions/create', missionController.create);

module.exports = router;
