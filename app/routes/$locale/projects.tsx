import customCodeCss from '~/styles/code.css';
import { json, LinksFunction, useLoaderData } from 'remix';
import type { MetaFunction, LoaderFunction } from 'remix';
import { GithubRepo, LoaderFunctionArgs, NpmStats } from '~/types';
import { PostLayout } from '~/components/posts/post-prose';
import { StickyShareButton } from '~/components/share';
import { i18n } from '~/i18n';
import { githubStat, npmStat } from '~/services/statistics.server';

export const meta: MetaFunction = () => ({
  title: `${i18n.t('nav.projects')} - ${i18n.t('site.title')}`
});

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: customCodeCss
  }
];

export const loader: LoaderFunction = async ({
  context
}: LoaderFunctionArgs) => {
  const { STATISTICS } = context;
  const repos: GithubRepo[] = await githubStat(STATISTICS, 'repos');
  const npm = await npmStat(STATISTICS);
  return json({
    npm,
    repos: repos
      .sort((x, y) => (x.stargazers_count - y.stargazers_count > 0 ? -1 : 1))
      .slice(0, 20)
  });
};

export default function Post() {
  const { repos, npm } =
    useLoaderData<{ repos: GithubRepo[]; npm: NpmStats }>();
  return (
    <main className='mx-8'>
      <PostLayout>
        <div className='overflow-x-auto'>
          <h1>Github Open Sources (Personal, top 20)</h1>
          <table className='table w-full table-zebra'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Language</th>
                <th>Stars</th>
              </tr>
            </thead>
            <tbody>
              {repos.map((repo) => (
                <tr key={repo.id}>
                  <td>
                    <a href={repo.html_url} target='_blank'>
                      {repo.full_name}
                    </a>
                  </td>
                  <td>{repo.description}</td>
                  <td>{repo.language}</td>
                  <td>{repo.stargazers_count}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h1>NPM Packages (Downloads &gt; 2,000)</h1>
          <table className='table w-full table-zebra'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Downloads</th>
              </tr>
            </thead>
            <tbody>
              {npm.stats
                .filter((x) => x[1] > 2000)
                .map((stat) => (
                  <tr key={stat[0]}>
                    <td>
                      <a
                        href={`https://npmjs.com/package/${stat[0]}`}
                        target='_blank'>
                        {stat[0]}
                      </a>
                    </td>
                    <td>{stat[1]}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </PostLayout>
      <StickyShareButton />
    </main>
  );
}
