import { DiscordStats } from '~/services/discord.server';
import clsx from 'classnames';

export function OnlineStatus({ discord }: { discord: DiscordStats }) {
  let status = '';
  switch (discord?.online) {
    case true: {
      status = discord.coding ? '写代码中' : '在线';
      if (discord.ide?.type) {
        status = `正在 ${discord.ide.project} 项目中编辑 ${discord.ide?.type} 文件`;
      }
      break;
    }
    case false: {
      status = '离线';
      break;
    }
    default: {
      status = '未知状态';
    }
  }

  return (
    discord && (
      <div
        data-tip={status}
        className='tooltip tooltip-primary tooltip-bottom md:pr-12 lg:pr-0'>
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
      </div>
    )
  );
}
