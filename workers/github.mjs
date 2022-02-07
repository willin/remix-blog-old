import { get } from './fetch.mjs';

export async function GithubJob() {
  const repositories = await get(
    `https://api.github.com/users/${GITHUB_ID}/repos?per_page=1000`
  );
  console.log(`GitHub data: repositories > ${repositories.length}`);
  const user = await get(`https://api.github.com/users/${GITHUB_ID}`);
  const events = await get(`https://api.github.com/users/${GITHUB_ID}/events`);
  // statistics
  const statistics = {
    size: 0,
    followers: user.followers,
    stars: 0,
    forks: 0,
    open_issues: 0,
    languages: [],
    topics: [],
    events
  };
  repositories.forEach((repository) => {
    statistics.stars += repository.stargazers_count;
    statistics.forks += repository.forks_count;
    statistics.open_issues += repository.open_issues;
    // owner only
    if (!repository.fork && repository.owner.login === 'willin') {
      statistics.size += repository.size;
      statistics.topics.push(...repository.topics);
      if (repository.language) {
        statistics.languages.push(repository.language);
      }
    }
  });

  statistics.topics = Array.from(new Set([...statistics.topics]));
  statistics.languages = Array.from(new Set([...statistics.languages]));
  await STATISTICS.put('$$github', JSON.stringify(statistics));
  await STATISTICS.put('$$github_repos', JSON.stringify(repositories));
}
