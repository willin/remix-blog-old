import { GithubEvent, GithubEventType } from '~/types';
import dayjs from 'dayjs';

function SwitchEvent(event: GithubEvent) {
  let title = `有关 ${event.type} 的神秘操作`;
  let url = 'https://github.com/';
  let linkTitle = event.repo.name;

  switch (event.type) {
    case GithubEventType.PushEvent: {
      title = '提交代码';
      url += `${event.repo.name}/commit/${event.payload.head}`;
      break;
    }
    case GithubEventType.IssuesEvent: {
      title = `${event.payload.action === 'opened' ? '创建' : '关闭'} Issue`;
      url = event.payload.issue.html_url;
      linkTitle = `${event.repo.name}#${event.payload.issue.number}`;
      break;
    }
    case GithubEventType.IssueCommentEvent: {
      title = '评论了 Issue';
      linkTitle = `${event.repo.name}#${event.payload.issue.number}`;
      url = event.payload.comment.html_url;
      break;
    }
    case GithubEventType.WatchEvent: {
      title = '关注项目';
      break;
    }
    case GithubEventType.PullRequestEvent: {
      title = `${event.payload.action === 'opened' ? '创建' : '关闭'} PR`;
      url = event.payload.pull_request.html_url;
      linkTitle = `${event.repo.name}#${event.payload.pull_request.number}`;
      break;
    }
    case GithubEventType.PullRequestReviewEvent: {
      title = '进行了代码审查';
      url = event.payload.review.html_url;
      linkTitle = `${event.repo.name}#${event.payload.pull_request.number}`;
      break;
    }
    case GithubEventType.CreateEvent: {
      title = `创建了 ${event.payload.ref_type}: ${event.payload.ref}`;
      url += event.repo.name;
      break;
    }
    case GithubEventType.DeleteEvent: {
      title = `删除了 ${event.payload.ref_type}: ${event.payload.ref}`;
      url += event.repo.name;
      break;
    }
    default: {
      url += event.repo.name;
    }
  }
  return (
    <li key={event.id} className='mb-10 ml-6'>
      <span className='flex absolute -left-3 justify-center items-center w-6 h-6 bg-secondary rounded-full ring-8 ring-neutral'>
        <svg
          className='w-3 h-3 fill-current'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            fillRule='evenodd'
            d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z'
            clipRule='evenodd'></path>
        </svg>
      </span>
      <h3 className='flex items-center mb-1 text-lg font-semibold text-base-content'>
        {title}
      </h3>
      <time className='block mb-2 text-sm font-normal leading-none text-neutral-content'>
        {dayjs(event.created_at).format('YYYY-MM-DD HH:mm:ss')}
      </time>
      <p className='mb-4 text-base font-normal text-neutral-content'>
        <a href={url} target='_blank' rel='noopener noreferrer'>
          {linkTitle}
        </a>
      </p>
    </li>
  );
}

export function GithubEvents({ events }: { events: GithubEvent[] }) {
  return (
    <ol className='relative border-l border-primary-content'>
      {events.map((event, i) => i < 210 && SwitchEvent(event))}
    </ol>
  );
}
