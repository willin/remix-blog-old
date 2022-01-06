import { hydrate } from 'react-dom';
import { RemixBrowser } from 'remix';
import i18next from 'i18next';
import { RemixI18NextProvider } from 'remix-i18next';
import { init } from '~/utils/i18next';

// eslint-disable-next-line @typescript-eslint/no-floating-promises
init().then(() => {
  hydrate(
    <RemixI18NextProvider i18n={i18next}>
      <RemixBrowser />
    </RemixI18NextProvider>,
    document
  );
});
