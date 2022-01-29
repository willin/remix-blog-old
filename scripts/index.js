const axios = require('axios');
const { getChangedFiles, fileDirExists, scanDirLocales } = require('./files');
const { getCommit } = require('./commit');
const { compileFile } = require('./mdx');

const [currentCommitSha = process.env.GITHUB_SHA] = process.argv.slice(2);
const API_URL = process.env.API_URL || 'http://127.0.0.1:8788/api';
axios.defaults.headers.common.Authorization = `Bearer ${
  process.env.API_KEY || 'undefined'
}`;

const createBatchTasks = (file, tempLocales, deleted) => {
  const { slug, type } = file;
  return tempLocales.map((l) => ({
    type,
    locale: l,
    slug,
    deleted
  }));
};

async function main() {
  // 全量更新或增量更新
  const {
    data: { commit }
  } = await axios.get(`${API_URL}/build`);
  const {
    data: { locales }
  } = await axios.get(`${API_URL}/locale`);
  const compareCommitSha = commit.sha;
  const files = await getChangedFiles(currentCommitSha, compareCommitSha);

  // 避免重复任务
  // Avoid duplicate tasks
  const tasks = {};
  /* eslint-disable no-await-in-loop */
  while (files.length > 0) {
    const file = files.shift();
    const { type, locale, slug, deleted } = file;
    const key = `${type}:${slug}:${locale}:${deleted}`;
    // eslint-disable-next-line no-continue
    if (tasks[key]) continue;

    // 标记任务开启
    tasks[key] = true;
    if (deleted) {
      // 检查目录是否被删除
      if (!fileDirExists(file)) {
        // 删除发布所有语言
        files.unshift(...createBatchTasks(file, locales, deleted));
      } else if (locale) {
        // 删除单语言
        const {
          data: { success }
        } = await axios.delete(`${API_URL}/build`, file);
        console.log(`${success ? 'Deleted' : 'Failed to delete'} `, file);
      } else {
        // 重新发布所有语言
        files.push(...createBatchTasks(file, scanDirLocales(file), false));
      }
    } else if (locale) {
      // 生成单语言
      const result = await compileFile(file);
      console.log(result);
      const {
        data: { success }
      } = await axios.post(`${API_URL}/build`, {
        ...file,
        ...result
      });
      console.log(`${success ? 'Created' : 'Failed to created'} `, file);
    } else {
      // 生成全部语言
      files.push(...createBatchTasks(file, scanDirLocales(file), false));
    }
  }

  // 更新状态
  const buildInfo = {
    buildTime: Date.now(),
    commit: await getCommit(currentCommitSha)
  };
  const {
    data: { success }
  } = await axios.put(`${API_URL}/build`, buildInfo);
  console.log(`${success ? 'Deployed' : 'Failed to update build info.'} `);
}

main()
  .then(() => {
    console.log('Done.');
  })
  .catch((e) => {
    console.error(e);
    console.log('Errored.');
  });
