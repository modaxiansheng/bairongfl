const path = require('path');
function resolve (dir) {
  return path.resolve(__dirname, dir);
}

module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'));
  },
  devServer: {
    proxy: {
      '/study': {
        target: 'http://192.168.190.18:5000',
        pathRewrite: { '/study': '' },
        secure: false
      }
    }
  }
};
