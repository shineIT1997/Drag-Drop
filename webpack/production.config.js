/**
*@file : webpack.development.config
*@author : Thanh Dat / dat.dinh@dinovative.com
*@date : 11:01:11 | Thursday, March 25, 2021
*@Editor : Visual Studio Code
*@summary : the config of webpack on development-env
*/
process.env.NODE_ENV = 'production'

const path = require('path')
const paths = require('../config/paths')
const CopyPlugin = require('copy-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const commonConfig = require('./common.config')
const isWsl = require('is-wsl')
const safePostCssParser = require('postcss-safe-parser')
const { merge } = require('webpack-merge')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = merge(commonConfig, {
  // Recommended by https://webpack.js.org/configuration/mode/
  mode: 'production',
  bail: true,

  // Recommended by https://webpack.js.org/configuration/devtool/
  devtool: false,

  // These are the "entry points" to our application.
  // This means they will be the "root" imports that are included in JS bundle.
  // The first two entry points enable "hot" CSS and auto-refreshes for JS.
  entry: [
    // load polyfills
    // require.resolve('../config/polyfills'),
    // Finally, your app's code:
    paths.appIndexJs
  ],

  output: {
    // The build folder.
    path: paths.appBuild,
    // This does not produce a real file. It's just the virtual path that is
    // served by WebpackDevServer in development. This is the JS bundle
    // containing code from all our entry points, and the Webpack runtime.
    filename: 'static/js/[name].[hash].js',
    // There are also additional JS chunk files if you use code splitting.
    chunkFilename: 'static/js/[name].[hash].js',
    // This is the URL that app is served from. We use "/" in development.
    publicPath: '/',
    // Point sourcemap entries to original disk location (format as URL on Windows)
    devtoolModuleFilenameTemplate: info =>
      path
        .relative(paths.appSrc, info.absoluteResourcePath)
        .replace(/\\/g, '/')
  },

  plugins: [
    // Generates an `index.html` file with the <script> injected.
    // new HtmlWebpackPlugin(
    //   Object.assign(
    //     {},
    //     {
    //       inject: true,
    //       template: paths.appHtml
    //     },
    //     {
    //       minify: {
    //         removeComments: true,
    //         collapseWhitespace: true,
    //         removeRedundantAttributes: true,
    //         useShortDoctype: true,
    //         removeEmptyAttributes: true,
    //         removeStyleLinkTypeAttributes: true,
    //         keepClosingSlash: true,
    //         minifyJS: true,
    //         minifyCSS: true,
    //         minifyURLs: true
    //       }
    //     }

    //   )
    // )
  ],

  optimization: {
    nodeEnv: 'production',
    minimize: true,
    minimizer: [
    // This is only used in production mode
      (compiler) => {
        new TerserPlugin({
          terserOptions: {
            parse: {
              // We want terser to parse ecma 8 code. However, we don't want it
              // to apply any minification steps that turns valid ecma 5 code
              // into invalid ecma 5 code. This is why the 'compress' and 'output'
              // sections only apply transformations that are ecma 5 safe
              // https://github.com/facebook/create-react-app/pull/4234
              ecma: 8
            },
            compress: {
              ecma: 5,
              warnings: false,
              // Disabled because of an issue with Uglify breaking seemingly valid code:
              // https://github.com/facebook/create-react-app/issues/2376
              // Pending further investigation:
              // https://github.com/mishoo/UglifyJS2/issues/2011
              comparisons: false,
              // Disabled because of an issue with Terser breaking valid code:
              // https://github.com/facebook/create-react-app/issues/5250
              // Pending further investigation:
              // https://github.com/terser-js/terser/issues/120
              inline: 2
            },
            mangle: {
              safari10: true
            },
            // Added for profiling in devtools
            keep_classnames: true,
            keep_fnames: true,
            output: {
              ecma: 5,
              comments: false,
              // Turned on because emoji and regex is not minified properly using default
              // https://github.com/facebook/create-react-app/issues/2488
              ascii_only: true
            }
          },
          // Use multi-process parallel running to improve the build speed
          // Default number of concurrent runs: os.cpus().length - 1
          // Disabled on WSL (Windows Subsystem for Linux) due to an issue with Terser
          // https://github.com/webpack-contrib/terser-webpack-plugin/issues/21
          parallel: !isWsl
          // // Enable file caching
          // cache: true,
          // sourceMap: true,
        }).apply(compiler)
      },

      // This is only used in production mode
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          parser: safePostCssParser,
          map: {
            // `inline: false` forces the sourcemap to be output into a
            // separate file
            inline: false,
            // `annotation: true` appends the sourceMappingURL to the end of
            // the css file, helping the browser find the sourcemap
            annotation: true
          }
        },
        cssProcessorPluginOptions: {
          preset: [ 'default', { minifyFontValues: { removeQuotes: false } } ]
        }
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(paths.appPublic, 'favicon.ico'),
            to: path.resolve(paths.appBuild, 'favicon.ico'),
            toType: 'file'
          },
          {
            from: path.resolve(paths.appPublic, 'static'),
            to: path.resolve(paths.appBuild, 'static'),
            toType: 'dir'
          }
        ]
      })
    ],
    // Automatically split vendor and commons
    // https://twitter.com/wSokra/status/969633336732905474
    // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }

}

)
