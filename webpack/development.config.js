/**
*@file : webpack.development.config
*@author : Thanh Dat / dat.dinh@dinovative.com
*@date : 11:01:11 | Thursday, March 25, 2021
*@Editor : Visual Studio Code
*@summary : the config of webpack on development-env
*/
process.env.NODE_ENV = 'development'

const webpack = require('webpack')
const paths = require('../config/paths')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const openBrowser = require('react-dev-utils/openBrowser')
const commonConfig = require('./common.config')
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin')
const getHttpsConfig = require('../config/getHttpsConfig')
const { merge } = require('webpack-merge')
const getClientEnvironment = require('../config/env')

const publicUrl = ''
const env = getClientEnvironment(publicUrl)

const APP_PORT = process.env.REACT_APP_PORT || 4000

const host = process.env.HOST || '0.0.0.0'

module.exports = merge(commonConfig, {

  // Recommended by https://webpack.js.org/configuration/mode/
  mode: 'development',

  // Recommended by https://webpack.js.org/configuration/devtool/
  devtool: 'cheap-module-source-map',

  devServer: {
    publicPath: paths.publicPath,
    contentBase: paths.appPublic,
    contentBasePublicPath: paths.publicUrlOrPath,
    // By default files from `contentBase` will not trigger a page reload.
    watchContentBase: true,
    // contentBase: path.resolve(__dirname ,'../public' ),
    host,
    hot: true,
    quiet: true,
    inline: true,
    compress: true,
    port: APP_PORT,
    https: getHttpsConfig(),
    historyApiFallback: true,
    watchOptions: {
      ignored: /node_modules/
    },
    proxy: {
      '/api': {
        target: process.env.API_PROXY || 'https://api.onib.link',
        secure: false,
        changeOrigin: true
      }
    },

    after: () => {
      openBrowser && openBrowser(`http://127.0.0.1:${APP_PORT}`)
    }
  },

  output: {
    // The build folder.
    path: undefined,
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: true,
    // There will be one main bundle, and one file per asynchronous chunk.
    // In development, it does not produce real files.
    filename: 'static/js/bundle.js',

    // There are also additional JS chunk files if you use code splitting.
    chunkFilename: 'static/js/[name].chunk.js',
    // webpack uses `publicPath` to determine where the app is being served from.
    // It requires a trailing slash, or the file assets will get an incorrect path.
    // We inferred the "public path" (such as / or /my-project) from homepage.
    publicPath: paths.publicUrlOrPath
    // Point sourcemap entries to original disk location (format as URL on Windows)
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
    paths.appIndexJs
  ],

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml
    }),
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
    // This gives some necessary context to module not found errors, such as
    // the requesting resource.s
    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
    // It is absolutely essential that NODE_ENV is set to production
    // during a production build.
    // Otherwise React will be compiled in the very slow development mode.
    new webpack.DefinePlugin(env.stringified)
  ]

}
)
