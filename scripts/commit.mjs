import axios from 'axios';

async function getCommit(commit) {
  if (!commit) return { sha: '' };
  const { data } = await axios.get(
    `https://api.github.com/repos/willin/willin.wang/commits/${commit}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
      }
    }
  );

  return {
    isDeployCommit: commit === 'HEAD' ? 'Unknown' : true,
    sha: data.sha,
    author: data.commit.author.name,
    date: data.commit.author.date,
    message: data.commit.message,
    link: data.html_url
  };
}

export { getCommit };
