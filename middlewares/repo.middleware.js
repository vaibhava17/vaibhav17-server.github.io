const axios = require("axios");
require("dotenv").config();

const getRepoInfo = async (req, res, next) => {
  try {
    const { githubURL, webURL } = req.body;
    if (!githubURL || !webURL) return res.status(400).json({ message: "Please fill all the fields", success: false });
    const githubURLArr = githubURL.split("/");
    const owner = githubURLArr[githubURLArr.length - 2];
    const repo = githubURLArr[githubURLArr.length - 1];
    const RepoData = await axios.get(`${process.env.GITHUB_API_URL}/${owner}/${repo}`);
    req.body.name = RepoData.data.name;
    req.body.description = RepoData.data.description;
    req.body.owner = RepoData.data.owner.login;
    req.body.publishedAt = RepoData.data.created_at;
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid Github URL", success: false, error });
  }
};

module.exports = { getRepoInfo };