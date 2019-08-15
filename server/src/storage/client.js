const { Validator } = require('jsonschema');
const { readFile, writeFile } = require('fs');
const { promisify } = require('util');
const { join } = require('path');
const config = require('./config.json');

// using promise-based fs methods
const readFilePromise = promisify(readFile);
const writeFilePromise = promisify(writeFile);

// get complete file path to JSON file from it's shorthand
const getFilePath = fileShorthand => join(config.dataPath, config.fileNames[fileShorthand]);
// same with schemas
const getSchemaPath = fileShorthand => join(config.schemasPath, config.schemaNames[fileShorthand]);

// read data from specific JSON file
const get = async (fileShorthand) => {
  const filePath = getFilePath(fileShorthand);
  try {
    const jsonString = await readFilePromise(filePath, 'utf-8');
    const json = JSON.parse(jsonString);
    return json;
  } catch (err) {
    console.error('error in storage.methods.get', err);
    return null;
  }
};

// write data to specific JSON file
const set = async (fileShorthand, data) => {
  const filePath = getFilePath(fileShorthand);
  try {
    const jsonString = JSON.stringify(data);
    await writeFilePromise(filePath, jsonString);
    return true;
  } catch (err) {
    console.error('error in storage.methods.set', err);
    return false;
  }
};

// BONUS: validate JSON received via POST according to the right JSON schema
const validate = async (fileShorthand, data) => {
  const v = new Validator();
  const filePath = getSchemaPath(fileShorthand);
  try {
    const schema = await readFilePromise(filePath, 'utf-8');
    const result = v.validate(data, JSON.parse(schema));
    return result.valid;
  } catch (err) {
    console.error('error in storage.methods.validate', err);
    return false;
  }
};

// find a quest with specific globalID and alias
const getQuest = async (alias, globalId) => {
  try {
    const quests = await get('quests');
    const searchedQuest = quests.find((quest) => {
      return (quest.alias === alias) && (quest.globalId.toString() === globalId);
    });
    return searchedQuest;
  } catch (err) {
    console.error('error in storage.methods.getQuest', err);
    return null;
  }
};

// create array of booleans which describes quest's leafs completion statuses
const getQuestLeafStatuses = async (quest) => {
  try {
    const leafs = await get('leafs');
    // find all leafs related to searched quest
    const completedLeafs = leafs
      .filter(leaf => leaf.questId === quest.id)
      .map(leaf => leaf.name);
    return quest.pathway.leafs.map(leafName => completedLeafs.includes(leafName));
  } catch (err) {
    console.error('error in storage.methods.getQuestLeafStatuses', err);
    return null;
  }
};

module.exports = {
  validate,
  get,
  set,
  getQuest,
  getQuestLeafStatuses,
};
