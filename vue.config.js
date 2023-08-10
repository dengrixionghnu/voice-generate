const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      fallback: {
        path: require.resolve("path-browserify")
      },
    },
  },
  devServer: {
    proxy: {     
       '/getToken': {   
          target: 'http://nls-meta.cn-shanghai.aliyuncs.com',  
          changeOrigin: true  
          },     
         '/convertVoice': {     
            target: 'https://nls-gateway.cn-shanghai.aliyuncs.com',   
            changeOrigin: true,      
            secure: true,
            pathRewrite: {'^/convertVoice': '/rest/v1/tts/async'}     
            }   
          }
  }
})
