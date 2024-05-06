const jwt = require('jsonwebtoken');

module.exports = (userService) => {

getUsers = async (req, res) => {
  const users = await userService.getAllUsers();
  res.json(users);
};

register = async (req, res) => {
    const { username, email, password, confirmPassword, role } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    const existingUser = await userService.getUserByUsername(username);

    if (existingUser) {
      return res.status(400).json({ error: 'Username is already taken' });
    }

    await userService.createUser(username, email, password, role || 'user');

    return res.redirect('/login');
  };

   const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await userService.getUserByUsername(username);

    if (!user || user.password !== password) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const accessToken = jwt.sign({id: user.id, username: user.username, role: user.role }, 'access-token-secret', { expiresIn: '10m' });
    const refreshToken = jwt.sign({id: user.id, username: user.username, role: user.role }, 'refresh-token-secret', { expiresIn: '24h' });

    res.cookie('access-token', accessToken, { httpOnly: true, sameSite: 'None', secure: true });
    res.cookie('refresh-token', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, path: '/refresh-token' });


    return res.json({ message: 'Logged in successfully' });
  };

  const logout = (req, res) => {
    res.clearCookie('access-token');
    res.clearCookie('refresh-token');
    return res.json({ message: 'Logged out successfully' });
  };

 const getUserById = async (req, res) => {
    const user = await userService.getUserById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (req.user.role !== 'admin' && req.user.id != user.id) {
    return res.status(403).json({ error: 'You do not have permission to view this user information' });
    }

    res.json(user);
  };

return {
  getUsers,
  register,
  login,
  logout,
  getUserById
};
};