/**
*@file : paths.js
*@author : Thanh Dat / dat.dinh@dinovative.com
*@date : 12:44:28 | Thursday, March 25, 2021
*@Editor : Visual Studio Code
*@summary : resolve reletive app you need for config
*/
'use strict'

const path = require('path')
const fs = require('fs')

const rootDirectoryPath = fs.realpathSync(process.cwd())
const resolveReletiveApp = (reletivePath) => path.resolve(rootDirectoryPath, reletivePath)

module.exports = {
  appBuild: resolveReletiveApp('build'),
  publicPath: resolveReletiveApp('public'),
  appIndex: resolveReletiveApp('src/index.js'),
  appRootHtml: resolveReletiveApp('public/index.html'),
}