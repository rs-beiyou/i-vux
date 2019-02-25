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
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }
}
