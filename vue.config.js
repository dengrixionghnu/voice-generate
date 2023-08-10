const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      fallback: {
        "os": require.resolve("os-browserify/browser"),
        "assert": require.resolve("assert/"),
        "url": require.resolve("url/"),
        "querystring": require.resolve("querystring-es3"),
      },
    },
  },
})
