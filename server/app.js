/* app.js */
/* 构建http服务 */
let app = require('http').createServer()
/* 引入socket.io */
let io = require('socket.io')(app)
/* 定义监听端口，可以自定义，端口不要被占用 */
let PORT = 8080
/* 监听端口 */
app.listen(PORT)

/* 定义用户数组 */
let users = []

/**
 *监听客户端连接
 *io是我们定义的服务端的socket
 *回调函数里面的socket是本次连接的客户端socket
 *io与socket是一对多的关系
 */
io.on('connection', function (socket) {
  /* 所有的监听on，与发送emit都得写在连接里面，包括断开连接 */
  /* 监听登录 */
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
      /* 登录成功 */
      socket.emit('loginSuccess', data)
      /* 向所有连接的客户端广播add事件 */
      io.sockets.emit('add', data)
    } else {
      /* 登录失败 */
      socket.emit('loginFail', '')
    }
  })

  socket.on('disconnect', function () {
    /* 向所有连接的客户端广播leave事件 */
    io.sockets.emit('leave', username)
    users.map(function (val, index) {
      if (val.username === username) {
        users.splice(index, 1)
      }
    })
  })

  socket.on('sendMessage', function (data) {
    io.sockets.emit('receiveMessage', data)
  })
})
console.log('app listen at' + PORT)
