import { fileURLToPath } from 'url';
import path from 'path';
import fsp from 'fs/promises';
import crypto from 'crypto';
import { bundleMDX } from 'mdx-bundler';
import { getMDXComponent as getComponent } from 'mdx-bundler/client/index.js';
import readingTime from 'reading-time';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server.js';
// Plugins
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import remarkGithub from 'remark-github';
// import { remarkMermaid } from 'remark-mermaidjs';
import { remarkCodeHike } from '@code-hike/mdx';
import remarkMermaid from './mermaid.mjs';
import theme from './highlight.mjs';

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(__filename);
const CONTENT = path.join(__dirname, '../content');

const mdxComponents = {
  // Custom Components
  a: (props) =>
    createElement('a', {
      target: '_blank',
      ...props
    }),
  img: ({ src, ...rest }) =>
    createElement('img', {
      'data-src': src,
      className: 'post-image lazyload',
      ...rest
    })
};

function getMdxComponent(code) {
  const Component = getComponent(code);
  function WMdxComponent({ components, ...rest }) {
    return Component({
      components: { ...mdxComponents, ...components },
      ...rest
    });
  }
  return WMdxComponent;
}

async function compileFile(file) {
  const { type, slug, locale } = file;
  const fileDir = path.join(CONTENT, type, slug);
  const filePath = path.join(fileDir, `${locale}.mdx`);
  const fileContent = await fsp.readFile(filePath, 'utf-8');
  let files = {};
  files = await fsp
    .readdir(fileDir)
    .then((list) => list.filter((x) => !x.endsWith('.mdx')));
  const results = await Promise.all(
    files.map(async (filename) =>
      fsp.readFile(path.join(fileDir, filename), 'utf8')
    )
  );
  files = Object.fromEntries(
    results.map((content, i) => [`./${files[i]}`, content])
  );

  const { frontmatter, code } = await bundleMDX({
    source: fileContent,
    ...(Object.keys(files).length > 0 ? { files } : {}),
    xdmOptions(options) {
      // eslint-disable-next-line no-param-reassign
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeSlug,
        rehypeAutolinkHeadings
      ];
      // eslint-disable-next-line no-param-reassign
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkGfm,
        [remarkGithub, { repository: 'willin/willin.wang' }],
        [
          remarkMermaid,
          {
            theme: 'dark'
          }
        ],
        [
          remarkCodeHike,
          {
            theme,
            lineNumbers: true
          }
        ]
      ];

      return options;
    }
  });

  const Component = getMdxComponent(code);
  const html = renderToString(createElement(Component));
  const hasComponents = true || Object.keys(files).length > 0;

  const hash = crypto
    .createHash('sha256')
    .update(frontmatter + code)
    .digest('hex');

  Object.assign(frontmatter, {
    readingTime: readingTime(fileContent)
  });
  return {
    hash,
    frontmatter,
    html,
    code: hasComponents ? code : undefined
  };
}

export { compileFile };
