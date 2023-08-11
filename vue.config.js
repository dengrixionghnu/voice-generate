const { defineConfig } = require('@vue/cli-service')
module.exports = {
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: config => {
       config.resolve.fallback = {
          path: require.resolve("path-browserify"),
          crypto: require.resolve("crypto-browserify"),
          stream: require.resolve("stream-browserify")
       };
  
      config.module.rules.push({
        test: /\.worker.js$/,
        use: {
          loader: 'worker-loader',
          options: { inline: true, name: 'workerName.[hash].js' }
        }
        }),
      config.devtool='source-map'
    },
parallel: false,
chainWebpack: config => {
      config.output.globalObject('this')
    }
}
