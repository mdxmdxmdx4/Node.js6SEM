module.exports = (sequelize) => {
  const Repo = require('../model/Repo.js')(sequelize);

  const getAllRepos = async () => {
    return await Repo.findAll();
  };

  const getRepoById = async (id) => {
    return await Repo.findOne({ where: { id } });
  };

  const createRepo = async (name, authorId) => {
    return await Repo.create({ name, authorId });
  };

  const updateRepo = async (id, name) => {
    return await Repo.update({ name }, { where: { id } });
  };

  const deleteRepo = async (id) => {
    return await Repo.destroy({ where: { id } });
  };

  return {
    getAllRepos,
    getRepoById,
    createRepo,
    updateRepo,
    deleteRepo
  };
};
