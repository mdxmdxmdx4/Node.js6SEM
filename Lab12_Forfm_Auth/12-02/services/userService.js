module.exports = (sequelize) => {
   const { Op } = require('sequelize');
  const User = require('../models/user')(sequelize);

  async function getUserByUsename(username) {
  return await User.findOne({
        where: {
          username: username
        }
      });
}

async function createUser(username, password) {
  return await User.create({ username, password });
}


  return {
    getUserByUsename,
    createUser
  };
}