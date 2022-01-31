import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(__filename);

const changeTypes = {
  M: 'modified',
  A: 'added',
  D: 'deleted',
  R: 'moved'
};
const CONTENT = path.join(__dirname, '../content');

function listFolders(dir) {
  return fs
    .readdirSync(dir)
    .filter((f) => fs.statSync(path.join(dir, f)).isDirectory());
}

/**
 * 所有文件（全量更新）
 */
function getAllFiles() {
  const fileList = [];
  // `content/` 下面第一层目录代表类型，如 posts、pages
  // `content/` folders here are the types, like posts and pages
  const types = listFolders(CONTENT);
  types.forEach((type) => {
    // 下面第二层目录代表文章或页面的 slug
    // then sub folders are slugs of posts or pages
    const slugs = listFolders(path.join(CONTENT, type));
    slugs.forEach((slug) => {
      const files = fs.readdirSync(path.join(CONTENT, type, slug));
      files.forEach((file) => {
        // .mdx 文件名为语言代码， 如 en、 zh
        // content .mdx named with locale like en, zh
        if (file.endsWith('.mdx')) {
          fileList.push({
            type,
            slug,
            locale: file.replace(/\.mdx$/, ''),
            deleted: false
          });
        }
      });
    });
  });
  return fileList;
}

/**
 * 增量更新文件
 */
async function getChangedFiles(currentCommitSha, compareCommitSha) {
  if (currentCommitSha === compareCommitSha) {
    return getAllFiles();
  }
  try {
    const lineParser = /^(?<change>\w).*?\s+(?<filename>.+$)/;
    const gitOutput = execSync(
      `git diff --name-status ${compareCommitSha} ${currentCommitSha}`,
      { encoding: 'utf8' }
    );
    const changedFiles = gitOutput
      .split('\n')
      .map((line) => line.match(lineParser)?.groups)
      .filter(Boolean);
    const changes = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const { change, filename } of changedFiles) {
      const changeType = changeTypes[change];
      if (filename.startsWith('content/')) {
        if (changeType) {
          const [, type, slug, locale] = filename.split('/');
          const deleted =
            changeType === changeTypes.D || changeType === changeTypes.M;
          changes[deleted ? 'unshift' : 'push']({
            type,
            slug,
            locale: locale.endsWith('.mdx')
              ? locale.replace(/\.mdx$/, '')
              : false,
            deleted
          });
        } else {
          console.error(`Unknown change type: ${change} ${filename}`);
        }
      }
    }
    return [...new Set(changes)];
  } catch (error) {
    console.error(error);
    return getAllFiles();
  }
}

function fileDirExists(file) {
  const dir = path.join(CONTENT, file.type, file.slug);
  return fs.existsSync(dir);
}

function scanDirLocales(file) {
  const dir = path.join(CONTENT, file.type, file.slug);
  const list = fs.readdirSync(dir);
  return list
    .filter((f) => f.endsWith('.mdx'))
    .map((x) => x.replace(/\.mdx$/, ''));
}

export { getChangedFiles, fileDirExists, scanDirLocales };
