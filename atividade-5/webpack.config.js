const path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'main.build.js'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: [
          'eslint-loader',
          'babel-loader'
        ]
      }
    ]
  },
  devtool: 'source-map',
  devServer: {
    proxy: { // proxy URLs to backend development server
      '/api': 'http://localhost:3000'
    },
    contentBase: path.join(__dirname, 'src'), // boolean | string | array, static file location
    watchContentBase: true
    // compress: true, // enable gzip compression
    // ...
  }
};