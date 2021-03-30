const {
  resolve
} = require('path')
const configureWebpack = {
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
}
const url = 'http://39.102.46.213'
module.exports = {
  publicPath: './',
  devServer: {
    open: true,
    proxy: {
      '/api': {
        target: url,
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      }
    }
  },
  configureWebpack
}
