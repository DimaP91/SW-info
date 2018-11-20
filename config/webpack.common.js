const paths = require('./paths');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
  entry: paths.appIndexJs,
  output: {
    path: paths.appBuild,
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: require.resolve('eslint-loader'),
        options: {
          failOnWarning: true,
          failOnError: true,
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            presets: ['env', 'react', 'stage-2']
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          require.resolve('css-hot-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
                importLoaders: 2,
                sourceMap: true
            }
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              plugins: () => [
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8
                  ],
                  flexbox: 'no-2009',
                })
              ],
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)/,
        use: [
          {
            loader: require.resolve('file-loader'),
            options: {
              name: 'images/[name].[ext]'
            }
          }
        ]
      },
    ]
  },
  resolve: {
    modules: ['node_modules', paths.appAssets],
    extensions: ['*', '.js', '.jsx', '.css'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style.css'
    }),
    new HtmlWebpackPlugin({
      template: paths.appHtml,
      filename: 'index.html'
    })
  ],
};
