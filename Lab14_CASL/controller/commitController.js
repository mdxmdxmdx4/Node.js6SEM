module.exports = (commitService, repoService) => {

  const getAllCommits = async (req, res) => {
    const commits = await commitService.getAllCommits(req.params.id);
    res.json(commits);
  };

  const getCommitById = async (req, res) => {
    const commit = await commitService.getCommitById(req.params.id, req.params.commitId);

    if (!commit) {
      return res.status(404).json({ error: 'Commit not found' });
    }

    res.json(commit);
  };

const createCommit = async (req, res) => {
    const { message } = req.body;
    console.log(req.user.id);
    const repo = await repoService.getRepoById(req.params.id);
    console.log(repo);
    if (!repo || req.user.id !== repo.authorId) {
      return res.status(403).json({ error: 'You do not have permission to add a commit to this repo' });
    }
    const commit = await commitService.createCommit(req.params.id, message);
    res.json(commit);
  };

const updateCommit = async (req, res) => {
    const { message } = req.body;
    const repo = await repoService.getRepoById(req.params.id);
    const commit = await commitService.getCommitById(repo.id, req.params.commitId);
    if (!commit) {
      return res.status(404).json({ error: 'Commit not found' });
    }
    if (!repo || (req.user.role !== 'admin' && req.user.id !== repo.authorId)) {
      return res.status(403).json({ error: 'You do not have permission to update this commit' });
    }
    await commitService.updateCommit(req.params.commitId, message);
    res.json({ message: 'Commit updated successfully' });
  };

 const deleteCommit = async (req, res) => {
    const repo = await repoService.getRepoById(req.params.id);
    const commit = await commitService.getCommitById(repo.id, req.params.commitId);
    if (!repo || (req.user.role !== 'admin' && req.user.id !== repo.authorId)) {
      return res.status(403).json({ error: 'You do not have permission to delete this commit' });
    }
    if (!commit) {
      return res.status(404).json({ error: 'Commit not found' });
    }
    await commitService.deleteCommit(req.params.commitId);
    res.json({ message: 'Commit deleted successfully' });
  };

  return {
    getAllCommits,
    getCommitById,
    createCommit,
    updateCommit,
    deleteCommit
  };
};
