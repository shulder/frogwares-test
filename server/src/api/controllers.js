const storageClient = require('../storage/client');

// route: GET /quests
const getMainPageInfo = async (req, res) => {
  const data = await storageClient.get('main');
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// route: GET /quests/:alias/:globalId
const getQuestInfo = async (req, res) => {
  const quest = await storageClient.getQuest(req.params.alias, req.params.globalId);
  const questLeafStatuses = await storageClient.getQuestLeafStatuses(quest);
  if (quest && questLeafStatuses) {
    // format the resulting JSON, send only demanded data to client
    res.status(200).json({
      buildId: quest.globalId,
      platform: quest.platform,
      name: quest.name,
      pathway: {
        status: quest.pathway.status,
        name: quest.pathway.name,
        leafs: questLeafStatuses,
      },
    });
  } else {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// BONUS: route: POST /quests
const setLeafs = async (req, res) => {
  // validate received JSON before writing to storage
  const isValid = await storageClient.validate('leafs', req.body);
  if (isValid) {
    const isWritten = await storageClient.set('leafs', req.body);
    if (isWritten) {
      res.status(200).json({ message: 'FinishedQuestsLeafs.json was set!' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(422).json({ error: 'Unprocessable entity' });
  }
};

module.exports = {
  getMainPageInfo,
  getQuestInfo,
  setLeafs,
};
