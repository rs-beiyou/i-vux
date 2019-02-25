const CompressionPlugin = require('compression-webpack-plugin')
module.exports = {
  configureWebpack: config => {
    require('vux-loader').merge(config, {
      options: {},
      plugins: [
        'vux-ui',
        'duplicate-style',
        {
          name: 'less-theme',
          path: 'src/index.less'
        }
      ]
    })
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(
        new CompressionPlugin({
          algorithm: 'gzip',
          test: new RegExp('\\.(css|js|html)$'),
          threshold: 0,
          minRatio: 0.8
        })
      )
    }
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    // proxy: {
    //   '/api': {
    //     target: 'http://',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // }
  }
}
