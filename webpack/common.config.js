/**
*@file : common.config.js
*@author : Thanh Dat / dat.dinh@dinovative.com
*@date : 14:11:03 | Thursday, March 25, 2021
*@Editor : Visual Studio Code
*@summary : common config webpack
*/

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin')
const getClientEnvironment = require('../config/env')
const paths = require('../config/paths')

const publicUrl = ''
const env = getClientEnvironment(publicUrl)

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
        use: [
          // not support alidas import
          { loader: 'webpack-glob-loader' },

          {
            loader: 'eslint-loader',
            options: {
              configFile: path.join(__dirname, '../.eslintrc')
            }
          }
        ]
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
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [ '@babel/preset-react', [ '@babel/preset-env', {
                targets: {
                  browsers: [ 'last 2 chrome versions' ]
                }
              } ] ],
              plugins: [ '@babel/plugin-transform-runtime', '@babel/plugin-proposal-class-properties' ]
            }
          }
        ]
      },

      {
        test: /\.(woff(2)?|ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: './font/[hash].[ext]',
              mimetype: 'application/font-woff'
            }
          }
        ]
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
  resolve: {
    alias: {
      _src: path.resolve(__dirname, '../src'),
      _static: path.resolve(__dirname, '../public/static'),
      _store: path.resolve(__dirname, '../src/store'),
      _modulus: path.resolve(__dirname, '../src/modulus'),
      _layout: path.resolve(__dirname, '../src/layout'),
      _apis: path.resolve(__dirname, '../src/api'),
      _styles: path.resolve(__dirname, '../src/styles'),
      _utils: path.resolve(__dirname, '../src/utils'),
      _router: path.resolve(__dirname, '../src/router'),
      _components: path.resolve(__dirname, '../src/components'),
      _constants: path.resolve(__dirname, '../src/constants')
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml
    }),
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),

    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
    // It is absolutely essential that NODE_ENV is set to production
    // during a production build.
    // Otherwise React will be compiled in the very slow development mode.

    new webpack.DefinePlugin(env.stringified)

    // Generate an asset manifest file with the following content:
    // - "files" key: Mapping of all asset filenames to their corresponding
    //   output file so that tools can pick it up without having to parse
    //   `index.html`
    // - "entrypoints" key: Array of files which are included in `index.html`,
    //   can be used to reconstruct the HTML if necessary

  ]

}
