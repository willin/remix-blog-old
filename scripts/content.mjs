import path from 'path';
import fsp from 'fs/promises';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import readingTime from 'reading-time';

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(__filename);

const CONTENT = path.resolve(__dirname, '../content');
const OUTPUT = path.resolve(__dirname, '../public/_content');

const listFolders = (dir) =>
  fsp
    .readdir(dir, { withFileTypes: true })
    .then((files) => files.filter((f) => f.isDirectory()).map((f) => f.name));

const getAllFiles = async () => {
  const fileList = [];
  // `content/` 下面第一层目录代表类型，如 posts、pages
  // `content/` folders here are the types, like posts and pages
  const types = await listFolders(CONTENT);
  for (let i = 0; i < types.length; i += 1) {
    const type = types[i];
    // 下面第二层目录代表文章或页面的 slug
    // then sub folders are slugs of posts or pages
    const slugs = await listFolders(path.join(CONTENT, type));
    for (let j = 0; j < slugs.length; j += 1) {
      const slug = slugs[j];
      const files = await fsp.readdir(path.join(CONTENT, type, slug));
      const source = files.filter((f) => !f.endsWith('.mdx'));
      files
        .filter((f) => f.endsWith('.mdx'))
        .forEach((file) => {
          // .mdx 文件名为语言代码， 如 en、 zh
          // content .mdx named with locale like en, zh
          fileList.push({
            type,
            slug,
            locale: file.replace(/\.mdx$/, ''),
            files: source
          });
        });
    }
  }
  return fileList;
};

const checkDir = (dir) =>
  fsp
    .stat(path.resolve(OUTPUT, dir))
    .catch(() => false)
    .then((result) => {
      if (!result) {
        return fsp.mkdir(path.resolve(OUTPUT, dir), { recursive: true });
      }
    });

const readFile = (p) => fsp.readFile(p, 'utf-8');
const writeFile = (p, d) => fsp.writeFile(p, d, 'utf-8');

const main = async () => {
  const n = new Date();
  await fsp.rmdir(OUTPUT, { recursive: true }).catch(() => {});
  await fsp.mkdir(OUTPUT, { recursive: true });
  const all = await getAllFiles();
  // Build
  // locale: number
  const totalWords = {};
  // locale: [Post]
  const totalPosts = {};
  // locale: [[Tag, count]]
  const totalTags = {};

  for (let i = 0; i < all.length; i += 1) {
    const item = all[i];
    const { type, slug, locale, files } = item;
    await checkDir(path.resolve(OUTPUT, locale, type));
    const source = await readFile(
      path.resolve(CONTENT, type, slug, `${locale}.mdx`)
    );
    const { data, content } = matter(source);
    const frontmatter = {
      type,
      slug,
      ...data,
      readingTime: readingTime(content)
    };
    const sourceFiles = await Promise.all(
      files.map((f) =>
        readFile(path.resolve(CONTENT, type, slug, f)).then((c) => ({
          [`./${f}`]: c
        }))
      )
    );
    // Build Content
    writeFile(
      path.resolve(OUTPUT, locale, type, `${slug}.json`),
      JSON.stringify({ frontmatter, content, files: sourceFiles })
    );
    const { tags = [] } = frontmatter;
    if (totalWords[locale]) {
      totalWords[locale] += frontmatter.readingTime.words;
    } else {
      totalWords[locale] = frontmatter.readingTime.words;
    }
    if (totalTags[locale]) {
      totalTags[locale].push(...tags);
    } else {
      totalTags[locale] = tags;
    }
    if (totalPosts[locale]) {
      totalPosts[locale].push(frontmatter);
    } else {
      totalPosts[locale] = [frontmatter];
    }
  }
  // Statistics
  const arr = Object.entries(totalWords);
  for (let i = 0; i < arr.length; i += 1) {
    const [locale, words] = arr[i];
    const tags = Object.entries(
      totalTags[locale].reduce((r, c) => {
        // {[tag]:count}
        if (r[c]) {
          // eslint-disable-next-line no-param-reassign
          r[c] += 1;
        } else {
          // eslint-disable-next-line no-param-reassign
          r[c] = 1;
        }
        return r;
      }, {})
    ).sort((a, b) => (a[1] < b[1] ? 1 : -1));

    await writeFile(
      path.resolve(OUTPUT, locale, 'meta.json'),
      JSON.stringify({
        words,
        posts: totalPosts[locale],
        tags
      })
    );
  }
  const n2 = new Date();
  console.log(`Done, used ${n2 - n} ms`);
};

main()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
