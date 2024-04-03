const path = require('path');

module.exports = (userService) => {
    getUserByUsernameTest =  async (req, res) => {
    const { username } = req.body;
    const user = await userService.getUserByUsename(username);
    res.json(user);
}

getUserByUsername =  async (req, res) => {
    const { username } = req.body;
    const user = await userService.getUserByUsename(username);
    return user
}

  return {  
  getUserByUsernameTest,
  getUserByUsername
};
}