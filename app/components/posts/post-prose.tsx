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
    <div
      onClick={handleClick}
      className='card glass prose max-w-none p-6 mb-6 text-primary-content'>
      {children}
    </div>
  );
}
