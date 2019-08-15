const router = require('express').Router();
const controllers = require('./controllers');
// main page route
router.get('/quests', controllers.getMainPageInfo);
// BONUS: server can receive FinishedQuestsLeafs.json via POST request
router.post('/quests', controllers.setLeafs);
// quest page route
router.get('/quests/:alias/:globalId', controllers.getQuestInfo);

module.exports = router;
