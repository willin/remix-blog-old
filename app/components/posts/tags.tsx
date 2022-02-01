import clsx from 'classnames';
import { Link } from 'remix';

const classNames = [
  'btn-primary',
  'btn-secondary',
  'btn-accent',
  'btn-info',
  'btn-success',
  'btn-warning',
  'btn-error'
];

export function TagList({ tags }: { tags: [string, number][] }) {
  return (
    <div className='my-2 flex flex-wrap items-center flex-row'>
      {tags.map(([tag, count], i) => (
        <Link
          to={`/posts?search=${encodeURIComponent(tag)}`}
          className={clsx('btn m-2', classNames[i % classNames.length])}
          key={`${tag}-${count}`}>
          {tag}
          <div className='ml-1 badge badge-outline'>{count}</div>
        </Link>
      ))}
    </div>
  );
}
