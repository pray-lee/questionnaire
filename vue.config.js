const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const BASE_URL = process.env.NODE_ENV === 'production' ? '/questionnaire/': '/'
module.exports = {
    lintOnSave: false,
    publicPath: './',
    chainWebpack: config => {
        config.resolve.alias    
            .set('@', resolve('src'))
            .set('_c', resolve('src/components'))
        config.plugin('html')
            .tap(args => {
                args[0].title = '体验用户管理系统'
                return args
            })
    },
    devServer: {
        proxy: {
            '/api': {
              // target: 'http://localhost:8080/jeecg',
            //   target: 'https://www.caika.net/test/',
            //   target: 'http://192.168.10.91/experience/',
              target: 'https://www.caika.net/experience/',
              secure: false,
              pathRewrite: {
                  '^/api': ''
              },
            },
          },
    }
}