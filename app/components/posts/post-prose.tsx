import { ReactNode, SyntheticEvent, useEffect } from 'react';
// lazy load
import 'lazysizes';
// simple light box
import SimpleLightbox from 'simple-lightbox';
import mermaid from 'mermaid';

export function PostLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    const graphs = document.querySelectorAll('.mermaid');
    if (graphs.length > 0) {
      mermaid.initialize({
        theme: 'forest'
      });
      for (let i = 0; i < graphs.length; i += 1) {
        mermaid.init(graphs[i]);
      }
    }
  }, []);

  function handleClick(e: SyntheticEvent) {
    const target = e.target as HTMLElement;
    if (target.className.includes('post-image')) {
      // eslint-disable-next-line
      SimpleLightbox.open({
        items: [target.dataset.src]
      });
    }
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      onClick={handleClick}
      className='card glass prose dark:prose-invert max-w-none p-6 mb-6 text-primary-content'>
      {children}
    </div>
  );
}
