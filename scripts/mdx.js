const path = require('path');
const fsp = require('fs/promises');
const crypto = require('crypto');
const { bundleMDX } = require('mdx-bundler');
const { getMDXComponent } = require('mdx-bundler/client');
const { Link } = require('@remix-run/react');
const readingTime = require('reading-time');
const { createElement } = require('react');
const { renderToString } = require('react-dom/server');

const CONTENT = path.join(__dirname, '../content');

const mdxComponents = {
  a: Link
};

function getMdxComponent(code) {
  const Component = getMDXComponent(code);
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
    files,
    xdmOptions(options) {
      // options.remarkPlugins = [
      //   ...(options.remarkPlugins ?? []),
      //   remarkMdxCodeMeta,
      // ]
      // options.rehypePlugins = [
      //   ...(options.rehypePlugins ?? []),
      //   rehypeHighlight
      // ];
      return options;
    }
  });

  const Component = getMdxComponent(code);
  const html = renderToString(createElement(Component));
  const hasComponents = Object.keys(files).length > 0;

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
