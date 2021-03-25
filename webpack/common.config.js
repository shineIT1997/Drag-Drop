/**
*@file : common.config.js
*@author : Thanh Dat / dat.dinh@dinovative.com
*@date : 14:11:03 | Thursday, March 25, 2021
*@Editor : Visual Studio Code
*@summary : common config webpack
*/

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const resovlePaths = require('../config/paths.js')

console.log(`resovlePaths.appHtml:`, resovlePaths.appRootHtml)

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
          presets:  [ '@babel/preset-react' ] ,
          plugins: [ '@babel/plugin-transform-runtime', '@babel/plugin-proposal-class-properties' ]
        }
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



    ],
  },

  // plugins: [
  //   new HtmlWebpackPlugin({
  //     template: 'public/index.html',
  //   })
  // ],
}