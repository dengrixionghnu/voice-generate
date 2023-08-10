const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      fallback: {
        path: require.resolve("path-browserify"),
      },
    },
  },
  devServer: {
    proxy: {
      '/alibaba': {
        target: 'http://nls-meta.cn-shanghai.aliyuncs.com',
        changeOrigin: true
      }
    }
  }
})
