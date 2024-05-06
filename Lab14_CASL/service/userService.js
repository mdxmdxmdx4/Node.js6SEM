module.exports = (sequelize) => {
const User = require('../model/User.js')(sequelize);

const getAllUsers = async () => {
  return await User.findAll({ attributes: { exclude: ['password'] } });
};

const getUserByUsername = async (username) => {
    return await User.findOne({ where: { username } });
};

const createUser = async (username, email, password, role = 'user') => {
    return await User.create({ username, email, password, role });
  };

const getUserById = async (id) => {
    return await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });
  };

  return {
  getAllUsers,
  getUserByUsername,
  createUser,
  getUserById
  };
};