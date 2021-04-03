/**
*@file : webpack.development.config
*@author : Thanh Dat / dat.dinh@dinovative.com
*@date : 11:01:11 | Thursday, March 25, 2021
*@Editor : Visual Studio Code
*@summary : the config of webpack on development-env
*/
process.env.NODE_ENV = 'production'

const path = require('path')
const openBrowser = require('react-dev-utils/openBrowser')
const commonConfig = require('./common.config')


const APP_PORT = process.env.REACT_APP_PORT || 4000


module.exports = {
  ...commonConfig,
  
  // Recommended by https://webpack.js.org/configuration/mode/
  mode: 'production',

  // Recommended by https://webpack.js.org/configuration/devtool/
  devtool: 'eval-source-map',

  devServer: {
    publicPath: '/',
    contentBase: path.resolve(__dirname ,'../public' ),
    host: '0.0.0.0',
    port: APP_PORT,
    historyApiFallback: true,
    watchOptions: {
      ignored: /node_modules/
    },
    after: () => {
      openBrowser && openBrowser(`http://127.0.0.1:${APP_PORT}`)
    }
  },

  // These are the "entry points" to our application.
  // This means they will be the "root" imports that are included in JS bundle.
  // The first two entry points enable "hot" CSS and auto-refreshes for JS.
  entry: [

    // require.resolve('react-dev-utils/webpackHotDevClient'),
    // // We ship a few polyfills by default:
    // require.resolve('./config/polyfills'),

    //  Errors should be considered fatal on development
    require.resolve('react-error-overlay'),

    // Finally, your app's code:
    path.resolve(__dirname ,'../src/index.js' )
  ],

}

