import { useI18n } from 'remix-i18n';
import { formatNumber } from '~/lib/utils';
import { WFrontMatter } from '~/types';
import { LocaleLink } from '../atom/locale-link';

export function PostMeta({
  frontmatter,
  hide
}: {
  frontmatter: WFrontMatter;
  hide: boolean;
}) {
  return (
    <div>
      <div className='badge badge-info mr-2 text-secondary'>
        发表于： {frontmatter.date}
      </div>
      {!hide && (
        <>
          <div className='badge badge-info mr-2 text-secondary'>
            阅读预计： {Math.ceil(frontmatter.readingTime?.minutes)} 分钟
          </div>
          <div className='badge badge-info mr-2 text-secondary'>
            文章字数： {formatNumber(frontmatter.readingTime?.words)}
          </div>
        </>
      )}
    </div>
  );
}

export function PostTags({ frontmatter }: { frontmatter: WFrontMatter }) {
  return (
    <div className='btn-group content-center'>
      {frontmatter.tags?.map((tag) => (
        <button
          className='btn btn-outline btn-xs'
          key={`${frontmatter.slug}-${tag}`}>
          <LocaleLink
            to={`/posts?search=${encodeURIComponent(tag)}`}
            className='no-underline'>
            {tag}
          </LocaleLink>
        </button>
      ))}
    </div>
  );
}

export function PostCopyright({
  frontmatter,
  type
}: {
  frontmatter: WFrontMatter;
  type: string;
}) {
  const { locale } = useI18n();
  let typePrefix = '';
  switch (type) {
    case 'pages': {
      typePrefix = '';
      break;
    }
    case 'playground': {
      typePrefix = 'playground/';
      break;
    }
    default: {
      typePrefix = 'posts/';
    }
  }
  return (
    <div className='alert alert-info'>
      <div className='flex-1'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          className='w-6 h-6 stroke-current mx-2 flex-shrink-0'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path>
        </svg>
        <label>
          <h4 className='mt-0'>版权信息</h4>
          <p className='text-sm text-base-content text-opacity-60'>
            文章作者： <a href='https://willin.wang'>Willin Wang</a>
          </p>
          <p className='text-sm text-base-content text-opacity-60'>
            本文链接：{' '}
            <a
              href={`https://willin.wang/${locale()}/${typePrefix}${
                frontmatter.slug
              }`}>
              https://willin.wang/{locale()}/{typePrefix}
              {frontmatter.slug}
            </a>
          </p>
          <p className='text-sm text-base-content text-opacity-60'>
            本博客所有文章除特别声明外，均为 Willin Wang 原创，采用{' '}
            <a
              rel='license'
              href='http://creativecommons.org/licenses/by-nc/4.0/'
              target='_blank'>
              知识共享署名-非商业性使用 4.0 国际许可协议
            </a>
            进行许可。
          </p>
        </label>
      </div>
    </div>
  );
}
