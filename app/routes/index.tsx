import { json, LoaderFunction, useLoaderData } from 'remix';
import { Counter } from '~/components/statistics/counter';
import { GithubEvents } from '~/components/statistics/events';
import { OnlineStatus } from '~/components/statistics/online';
import { formatNumber } from '~/lib/utils';
import { getDiscordUser } from '~/services/discord.server';
import { AllStatistics, LoaderFunctionArgs } from '~/types';

export const loader: LoaderFunction = async ({
  context
}: LoaderFunctionArgs) => {
  const { STATISTICS } = context.env;
  const discord = await getDiscordUser();
  const github = await STATISTICS.get('$$github', 'json');
  const npm = await STATISTICS.get('$$npm', 'json');
  const wakatime = await STATISTICS.get('$$wakatime', 'json');
  return json({ discord, github, npm, wakatime });
};
export default function Page() {
  const data = useLoaderData<AllStatistics>();
  return (
    <>
      <OnlineStatus discord={data.discord} />
      <div className='w-full mt-2 border stats border-base-300'>
        <div className='stat'>
          <div className='stat-figure text-primary'>
            <button className='btn loading btn-circle btn-lg bg-base-200 btn-ghost'></button>
          </div>
          <div className='stat-value'>
            {formatNumber(data.github.followers)} / 1,000
          </div>
          <div className='stat-title'>Github Followers 小目标</div>
          <div className='stat-desc'>
            <progress
              value={data.github.followers}
              max='10000'
              className='progress progress-secondary'></progress>
          </div>
        </div>
      </div>

      <div className='my-2 w-full shadow stats'>
        <div className='stat'>
          <div className='stat-figure text-secondary'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              className='inline-block w-8 h-8 stroke-current'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path>
            </svg>
          </div>
          <div className='stat-title'>Github</div>
          <div className='stat-value'>
            <Counter from={0} to={data.github.stars} />
          </div>
          <div className='stat-desc'>Total Stars</div>
        </div>
        <div className='stat'>
          <div className='stat-figure text-secondary'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              className='inline-block w-8 h-8 stroke-current'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4'></path>
            </svg>
          </div>
          <div className='stat-title'>NPM</div>
          <div className='stat-value'>
            <Counter from={500000} to={data.npm.sum} />
          </div>
          <div className='stat-desc'>Total Downloads</div>
        </div>
        <div className='stat'>
          <div className='stat-figure text-secondary'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              className='inline-block w-8 h-8 stroke-current'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4'></path>
            </svg>
          </div>
          <div className='stat-title'>Coding</div>
          <div className='stat-value'>
            <Counter
              from={0}
              to={parseInt(data.wakatime.cummulative_total.decimal, 10)}
            />
          </div>
          <div className='stat-desc'>hours / week</div>
        </div>
      </div>

      <div className='flex flex-row'>
        <div className='basis-1/2'>01</div>
        <div className='basis-1/2'>
          <GithubEvents events={data.github.events} />
        </div>
      </div>
    </>
  );
}
