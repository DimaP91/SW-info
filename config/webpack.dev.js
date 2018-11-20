const merge = require('webpack-merge');
const common = require('./webpack.common');


module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    stats: 'errors-only',
    port: '8000',
    hot: true,
    https: true,
    open: true,
    overlay:true,
    // proxy: {
    //   '/api': 'http://localhost:3000'
    // }
  }
})
