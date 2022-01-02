/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
const env = process.env.NODE_ENV;

module.exports = {
  appDirectory: 'app',
  assetsBuildDirectory: 'public/build',
  publicPath: '/build/',
  ...(env === 'local' ? {} : { serverModuleFormat: 'esm' }),
  serverPlatform: 'neutral',
  serverBuildDirectory: 'build',
  devServerBroadcastDelay: 1000,
  ignoredRouteFiles: ['.*']
};
