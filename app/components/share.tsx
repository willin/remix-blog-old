import { StickyShareButtons } from 'sharethis-reactjs';
import { useI18n } from 'remix-i18n';
import { useLocation } from 'remix';

export const StickyShareButton = () => {
  const i18n = useI18n();
  const location = useLocation();

  return (
    <StickyShareButtons
      config={{
        alignment: 'right',
        language: i18n.locale(),
        color: 'social',
        labels: 'counts',
        hide_desktop: false,
        show_total: true,
        enabled: true,
        show_mobile: true,
        show_toggle: true,
        min_count: 0,
        radius: 4,
        size: 40,
        networks: [
          'weibo',
          'wechat',
          'linkedin',
          'twitter',
          'facebook',
          'sharethis'
        ],

        url: `https://willin.wang${location.pathname}${location.hash}`
      }}
    />
  );
};
