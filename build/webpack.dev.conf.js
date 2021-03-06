'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

// 搭建一个socket.io服务
const app = require('express')
const server = require('http').Server(app)
const io = require('socket.io')(server, {'pingInterval': 200000, 'pingTimeout': 500000, 'perMessageDeflate': false})

server.listen(8080)

let users = []

io.sockets.on('connection', socket => {
  /* 是否是新用户标识 */
  let isNewPerson = true
  /* 当前登录用户 */
  let username = null
  /* 监听登录 */
  socket.on('login', function (data) {
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === data.username) {
        isNewPerson = false
        break
      } else {
        isNewPerson = true
      }
    }

    if (isNewPerson) {
      username = data.username
      users.push({
        username: data.username
      })
      console.log('users++++', users)
      /* 登录成功 */
      // socket.emit('loginSuccess', data, users.length)
      io.sockets.emit('loginSuccess', {username, count: users.length})
    } else {
      /* 登录失败 */
      socket.emit('loginFail', data)
    }
  })

  // 群聊
  socket.on('sendMsg', data => {
    io.sockets.emit('receiveMsg', data)
  })

  // 发送图片
  socket.on('sendImg', data => {
    console.log('image', data)
    data.id = socket.id
    io.sockets.emit('receiveImg', data)
  })

  // 上线
  socket.emit('online', data => {
    // socket.broadcast.emit('online', data)
    io.sockets.emit('online', data)

    console.log('上线了', data)
  })

  // 断开连接
  socket.on('disconnect', () => {
    if (users.length === 0) {
      console.log('聊天室暂时无人')
      return
    }

    if (username) {
      let usr = users.map(item => item.username)
      let index = usr.indexOf(username)
      console.log(username, '离开群聊', usr, index)
      if (index < 0) {
        console.log('用户组中没有这个人')
        return
      }
      users.splice(index, 1)
      let length = users.length
      console.log(username, '离开群聊后user=', length)
      socket.broadcast.emit('leave', {username, count: length})
    }
  })
})

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') }
      ]
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`]
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
