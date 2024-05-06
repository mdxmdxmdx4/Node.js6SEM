module.exports = (repoService) => {

  const getAllRepos = async (req, res) => {
    const repos = await repoService.getAllRepos();
    res.json(repos);
  };

  const getRepoById = async (req, res) => {
    const repo = await repoService.getRepoById(req.params.id);

    if (!repo) {
      return res.status(404).json({ error: 'Repo not found' });
    }

    res.json(repo);
  };

  const createRepo = async (req, res) => {
    const { name } = req.body;
    const repo = await repoService.createRepo(name, req.user.id);
    res.json(repo);
  };

  const updateRepo = async (req, res) => {
  const { name } = req.body;
  const repo = await repoService.getRepoById(req.params.id);
  if (!repo) {
    return res.status(404).json({ error: 'Repo not found' });
  }
  if (req.user.role !== 'admin' && req.user.id !== repo.authorId) {
    return res.status(403).json({ error: 'You do not have permission to update this repo' });
  }
  await repoService.updateRepo(req.params.id, name);
  res.json({ message: 'Repo updated successfully' });
};

const deleteRepo = async (req, res) => {
  const repo = await repoService.getRepoById(req.params.id);
  if (!repo) {
    return res.status(404).json({ error: 'Repo not found' });
  }
  if (req.user.role !== 'admin' && req.user.id !== repo.authorId) {
    return res.status(403).json({ error: 'You do not have permission to delete this repo' });
  }
  await repoService.deleteRepo(req.params.id);
  res.json({ message: 'Repo deleted successfully' });
};


  return {
    getAllRepos,
    getRepoById,
    createRepo,
    updateRepo,
    deleteRepo
  };
};
