import { DiscordStats } from '~/services/discord.server';
import clsx from 'classnames';

export function OnlineStatus({ discord }: { discord: DiscordStats }) {
  return (
    discord && (
      <div
        className={clsx('my-6 avatar indicator', {
          online: discord.online,
          offline: !discord.online
        })}>
        {discord.coding && (
          <div className='indicator-item indicator-bottom badge'>
            <span>Coding...</span>
          </div>
        )}
        <div className='rounded-full w-24 h-24 ring ring-primary ring-offset-base-100 ring-offset-2'>
          <img
            src='/images/avatar.jpg'
            className={clsx({
              grayscale: !discord.online
            })}
          />
        </div>
      </div>
    )
  );
}
