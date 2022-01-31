import 'lazysizes';
import { hydrate } from 'react-dom';
import { RemixBrowser } from 'remix';

import SimpleLightbox from 'simple-lightbox';

hydrate(<RemixBrowser />, document);

document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  if (target.className.includes('post-image')) {
    console.log(SimpleLightbox);
    // eslint-disable-next-line
    SimpleLightbox.open({
      items: [target.dataset.src]
    });
  }
});
