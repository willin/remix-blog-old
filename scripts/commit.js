const axios = require('axios');

async function getCommit(commit) {
  if (!commit) return { sha: '' };
  try {
    const { data } = await axios.get(
      `https://api.github.com/repos/willin/willin.wang/commits/${commit}`
    );

    return {
      isDeployCommit: commit === 'HEAD' ? 'Unknown' : true,
      sha: data.sha,
      author: data.commit.author.name,
      date: data.commit.author.date,
      message: data.commit.message,
      link: data.html_url
    };
  } catch (error) {
    return `Unable to get git commit info: ${error.message}`;
  }
}

module.exports = {
  getCommit
};
