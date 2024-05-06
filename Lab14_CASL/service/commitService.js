module.exports = (sequelize) => {
const Commit = require('../model/Commit.js')(sequelize);

const getAllCommits = async (repoId) => {
  return await Commit.findAll({ where: { repoId } });
};

const getCommitById = async (repoId, id) => {
  return await Commit.findOne({ where: { repoId, id } });
};

const createCommit = async (repoId, message) => {
  return await Commit.create({ repoId, message });
};

const updateCommit = async (id, message) => {
  return await Commit.update({ message }, { where: { id } });
};

const deleteCommit = async (id) => {
  return await Commit.destroy({ where: { id } });
};

  return {
    getAllCommits,
    getCommitById,
    createCommit,
    updateCommit,
    deleteCommit
  };
};