const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const config = {
  entry: ['jquery', './src/main.js'],
  output: {
    path: path.join(__dirname, 'public', 'dist'),
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
      },
      {
        test: /\.(scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: '',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true
              } // translates CSS into CommonJS modules
            }, 
            {
              loader: 'postcss-loader', // Run post css actions
              options: {
                plugins: function () { // post css plugins, can be exported to postcss.config.js
                  return [
                    require('precss'),
                    require('autoprefixer')
                  ];
                }
              }
            }, 
            {
              loader: 'sass-loader' // compiles Sass to CSS
            }
          ]
        })
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.scss', '.json', '.web.js', '.css']
  },
  devtool: 'source-map',
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'public'), // boolean | string | array, static file location
    watchContentBase: true
    // compress: true, // enable gzip compression
    // ...
  }
};
module.exports = env => {
  if (env.NODE_ENV === 'production') {
    config.plugins.push(
      new UglifyJsPlugin({
        sourceMap: true,
        uglifyOptions: {
          output: {
            preamble: false
          },
          compress: {
            drop_console: true
          }
        }
      })
    );
  }
  return config;
};