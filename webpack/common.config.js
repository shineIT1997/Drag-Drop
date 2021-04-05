/**
*@file : common.config.js
*@author : Thanh Dat / dat.dinh@dinovative.com
*@date : 14:11:03 | Thursday, March 25, 2021
*@Editor : Visual Studio Code
*@summary : common config webpack
*/

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const paths = require('../config/paths.js')
const getClientEnvironment = require('../config/env')

const publicUrl = ''
const env = getClientEnvironment(publicUrl)

console.log('env:', env)

module.exports = {
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },

      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          configFile: path.join(__dirname, '../.eslintrc')
        }
      },

      {
        test: /\.css$/i,
        use: [ 'style-loader', 'css-loader' ]
      },

      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader'
        ]
      },

      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      },

      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [ '@babel/preset-react', [ '@babel/preset-env', {
            targets: {
              browsers: [ 'last 2 chrome versions' ]
            }
          } ] ],
          plugins: [ '@babel/plugin-transform-runtime', '@babel/plugin-proposal-class-properties' ]
        }
      },

      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.css$/,
          /\.scss$/,
          /\.json$/
          // /\.bmp$/,
          // /\.gif$/,
          // /\.jpe?g$/,
          // /\.png$/,
        ],
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
      }

    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml
    })
  ]
}
