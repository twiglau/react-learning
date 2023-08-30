const CracoLessPlugin = require('craco-less');
const path = require('path')
// 当前文件(craco.config.js)所在的路径
const resolve = dir => path.resolve(__dirname, dir)
module.exports = {
    plugins: [
      {
        plugin: CracoLessPlugin,
        options: {
          lessLoaderOptions: {
            lessOptions: {
              modifyVars: { '@primary-color': '#1DA57A' },
              javascriptEnabled: true,
            }
          }
        }
      }
    ],
    webpack: {
      alias: {
        '@': resolve('src'),
        'components': resolve('src/components')
      }
    }
}