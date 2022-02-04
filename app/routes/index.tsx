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
      <div className='flex justify-center flex-wrap'>
        <div className=''>
          <OnlineStatus discord={data.discord} />
        </div>

        <div className='lg:ml-20 border stats border-base-300'>
          <div className='stat'>
            <div className='stat-figure text-primary'>
              <a href='https://github.com/willin' target='_blank'>
                <button className='btn btn-circle btn-lg bg-base-200 btn-ghost'>
                  <svg
                    className='w-6 h-6'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'></path>
                  </svg>
                </button>
              </a>
            </div>
            <div className='stat-value'>
              {formatNumber(data.github.followers)} / 1,000
            </div>
            <div className='stat-title'>Github Followers 小目标</div>
            <div className='stat-desc'>
              <progress
                value={data.github.followers}
                max='1000'
                className='progress progress-secondary'></progress>
            </div>
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
          <div className='stat-desc'>Total Stars Earned</div>
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
          <div className='stat-desc'>hours in last 7 days</div>
        </div>
      </div>

      <div className='p-2 flex flex-wrap justify-center'>
        {/* <div className='basis-full lg:basis-1/2'>
          <p>ddd</p>
          <p>ddd</p>
          <p>ddd</p>
          <p>
            dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
          </p>
          <p>ddd</p>
          <p>ddd</p>
          <p>ddd</p>
          <p>ddd</p>
          <p>ddd</p>
        </div> */}
        <div className='basis-full lg:basis-1/2 border shadow border-base-300 glass card p-6'>
          <GithubEvents events={data.github.events} />
        </div>
      </div>
    </>
  );
}
