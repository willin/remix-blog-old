import { createElement, useMemo } from 'react';
import * as mdxBundler from 'mdx-bundler/client';

const mdxComponents = {
  a: (props) =>
    createElement('a', {
      target: '_blank',
      ...props
    }),
  img: ({ src, ...rest }) =>
    createElement('img', {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      'data-src': src,
      className: 'post-image lazyload',
      ...rest
    })
};
/**
 * This should be rendered within a useMemo
 * @param code the code to get the component from
 * @returns the component
 */
function getMdxComponent(code: string) {
  const Component = mdxBundler.getMDXComponent(code);
  function WMdxComponent({
    components,
    ...rest
  }: Parameters<typeof Component>['0']) {
    return (
      // @ts-expect-error the types are wrong here
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      <Component components={{ ...mdxComponents, ...components }} {...rest} />
    );
  }
  return WMdxComponent;
}

export function useMdxComponent(code: string) {
  return useMemo(() => getMdxComponent(code), [code]);
}
