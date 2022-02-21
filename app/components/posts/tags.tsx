import clsx from 'classnames';
import { Link } from 'remix';
import { useI18n } from 'remix-i18n';

const classNames = [
  'btn-primary',
  'btn-warning',
  'btn-secondary',
  'btn-info',
  'btn-success',
  'btn-accent',
  'btn-error'
];

export function TagList({ tags }: { tags: [string, number][] }) {
  const i18n = useI18n();

  return (
    <div className='my-2 flex flex-wrap items-center flex-row'>
      {tags.map(([tag, count], i) => (
        <Link
          to={`/${i18n.locale()}/posts?search=${encodeURIComponent(tag)}`}
          className={clsx('btn btn-sm m-2', classNames[i % classNames.length])}
          key={`${tag}-${count}`}>
          {tag}
          <div className='ml-1 badge badge-outline'>{count}</div>
        </Link>
      ))}
    </div>
  );
}
