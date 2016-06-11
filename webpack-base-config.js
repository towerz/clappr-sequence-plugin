var path = require('path');
var webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(require('./package.json').version)
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
        // config in .babelrc
      }
    ],
  },
  resolve: {
    root: path.resolve(__dirname, 'src'),
    extensions: ['', '.js'],
  }
};
