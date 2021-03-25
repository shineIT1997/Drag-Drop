/**
*@file : webpack.development.config
*@author : Thanh Dat / dat.dinh@dinovative.com
*@date : 11:01:11 | Thursday, March 25, 2021
*@Editor : Visual Studio Code
*@summary : the config of webpack on development-env
*/
process.env.NODE_ENV = 'development'

const path = require('path')
const openBrowser = require('react-dev-utils/openBrowser')
const resovlePaths = require('../config/paths.js')

const APP_PORT = process.env.REACT_APP_PORT || 4000

const  test = {
  mode: 'development',

  devtool : 'eval-source-map',

  entry: [
    // require.resolve('react-dev-utils/webpackHotDevClient'),
    // require.resolve('../config/pollyfills.js') if you need some polyfills for your project
    resovlePaths.appIndex
  ],

  output: {

  },

  devServer: {
    publicPath: resovlePaths.publicPath,
    contentBase: resovlePaths.publicPath,
    host: '0.0.0.0',
    // historyApiFallback:true,
    port: APP_PORT,
    // watchOptions: {
    //   ignored: /node_modules/
    // },

    after: () => {
      openBrowser && openBrowser(`http://127.0.0.1:${APP_PORT}`)
    }
  }
}

console.log(`test.entry:`, resovlePaths)

module.exports = test

