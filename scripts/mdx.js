const path = require('path');
const fsp = require('fs/promises');
const { bundleMDX } = require('mdx-bundler');
const readingTime = require('reading-time');

const CONTENT = path.join(__dirname, '../content');

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

  Object.assign(frontmatter, {
    readingTime: readingTime(fileContent)
  });
  return {
    frontmatter,
    code
  };
}

module.exports = {
  compileFile
};
