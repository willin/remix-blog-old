const path = require('path');
const fsp = require('fs/promises');
const crypto = require('crypto');
const { bundleMDX } = require('mdx-bundler');
const { getMDXComponent: getComponent } = require('mdx-bundler/client');
const readingTime = require('reading-time');
const { createElement } = require('react');
const { renderToString } = require('react-dom/server');
const { remarkMdxImages } = require('remark-mdx-images');

const CONTENT = path.join(__dirname, '../content');

const mdxComponents = {
  // Custom Components
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
      // options.remarkPlugins = [
      //   ...(options.remarkPlugins ?? []),
      //   remarkMdxCodeMeta,
      // ]
      // options.rehypePlugins = [
      //   ...(options.rehypePlugins ?? []),
      //   rehypeHighlight
      // ];
      // eslint-disable-next-line no-param-reassign
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkMdxImages
      ];

      return options;
    }
    // esbuildOptions: (options) => {
    //   // eslint-disable-next-line no-param-reassign
    //   // options.loader = {
    //   //   ...options.loader,
    //   //   '.png': 'dataurl'
    //   // };

    //   return options;
    // }
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

module.exports = {
  compileFile
};
