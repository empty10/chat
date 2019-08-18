<template>
  <div class="chatBox">
    <div class="chat">
      <div class="leftBar">
          wechat
      </div>
      <div class="rightContent">
        <div class="chatHeader">
          FE交流群({{ count }})
        </div>
        <div class="chatContent" ref="chatContent">
          <ul class="messageList" >
            <template  v-for="item in messages">
              <li class="information" v-if="item.from=='system'">
                <div class="infoBox">
                  {{item.content}}
                </div>
              </li>
              <li class="listItem" :class="{ 'myself':item.from == 'myself' }" v-else>
                <div class="itemWrap">
                  <div class="userName" v-show="item.from=='other' " >{{item.nickName}}</div>

                  <div class="itemContent" :class="{'myselfContent':item.from == 'myself'}">{{item.content}}</div>
                </div>
                <div class="itemFace" @click="privateChat(item)">
                  <img :src="item.portrait" alt="">
                </div>
              </li>
            </template>
          </ul>
        </div>
        <div class="chatFooter">
          <!--<div class="mojiBox"></div>-->
          <textarea class="textBox" v-model="inputValue" autofocus @keyup.enter.prevent="sendMsg"></textarea>
          <div class="sendBtn" @click="sendMsg" >
            发送
          </div>
        </div>
      </div>
    </div>
    <div class="login" v-show="showLoginStatus">
        <div class="loginBox">
            <div class="loginTip">请输入你的昵称:)</div>
            <input type="text" class="inputNickName" autofocus v-model="nickName">
            <div  class="inputBoxButton" @click="enterChat">
                登录
            </div>
        </div>
    </div>
  </div>
</template>

<script>
  import io from 'socket.io-client'

  // 建立socket.io通信
  const socket = io.connect('http://localhost:8080')

  export default {
    name: 'Chat',
    data () {
      return {
        inputValue: '',
        nickName: '',
        portrait: 'http://tva2.sinaimg.cn/crop.0.0.180.180.50/62d8efadjw1e8qgp5bmzyj2050050aa8.jpg',
        location: '北京',
        messages: [],
        count: 0,
        onlineTip: '',
        showLoginStatus: false
      }
    },
    created () {
      if (!this.$store.state.isLogin) {
        console.log('尚未登录！')
        // this.$router.push('/')
        this.$store.commit('setLoginStatus', false)
        this.showLoginStatus = true
        return
      } else {
        console.log('已经登录！')
        this.showLoginStatus = false
      }
      this.nickName = this.$store.state.nickName

      this.portrait = this.$store.state.portrait

      if (localStorage.record_chat) {
        let messages = JSON.parse(localStorage.record_chat)
        messages.forEach(item => {
          if (item.nickName === this.nickName) {
            this.messages = this.messages.push(item)
          }
        })
      }
    },
    watch: {
      messages: {
        handler () {
          localStorage.record_chat = JSON.stringify(this.messages)
          this.fixedBottom()
        },
        deep: true
      }
    },
    mounted () {
      // 监听通信事件
      socket.on('leave', params => {
        console.log('leave', params)
        let name = params.username
        this.count = params.count
        if (name != null) {
          this.$store.commit('setLoginStatus', false)

          this.messages && this.messages.push({
            from: 'system',
            content: `系统消息：${name}离开群聊`
          })
        }

        console.log('现在有' + this.count + '人参与群聊')
      })

      socket.on('receiveMsg', data => {
        if (data.nickName === this.nickName) {
          return
        }
        this.messages.push(data)
      })

      // 发送上线事件
      console.log(this.nickName, '----上线')
    },

    methods: {
      enterChat () {
        if (!this.nickName) {
          alert('请输入昵称')
          return
        }

        /* 定义用户名 */
        if (this.nickName) {
          /* 向服务端发送登录事件 */
          socket.emit('login', {username: this.nickName})
        } else {
          alert('请输入昵称')
        }

        socket.on('loginSuccess', params => {
          console.log(params)
          let name = params.username
          this.count = params.count
          this.$store.commit('setNickname', name)
          this.$store.commit('setLoginStatus', true)
          this.showLoginStatus = false

          if (!name) {
            return
          }

          this.messages.push({
            from: 'system',
            content: `系统消息：${name}加入群聊`
          })

          console.log('此时聊天室有' + this.count + '人参加群聊')
        })

        socket.on('loginFail', data => {
          console.log(data, 'fail')
          alert('昵称重复，登录失败')
        })
      },
      privateChat (person) {
        console.log('开始私聊', person)
      },
      sendMsg () {
        if (this.inputValue === '' || this.inputValue === '\n') {
          return
        }

        socket.emit('sendMsg', {
          from: 'other',
          date: this.getTime(),
          nickName: this.nickName,
          portrait: this.portrait,
          location: this.location,
          content: this.inputValue
        })

        this.pushMine()
        this.inputValue = ''
        console.log('点击发送', this.inputValue)
      },

      getTime () {
        return this.moment().format('YYYY-MM-DD HH:mm:ss')
      },

      pushMine () {
        this.messages.push({
          from: 'myself',
          date: this.getTime(),
          nickname: this.nickName,
          portrait: this.portrait,
          location: this.location,
          content: this.inputValue
        })
      },

      fixedBottom () {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.$refs.chatContent.scrollTop = this.$refs.chatContent.scrollHeight
        }, 20)
      }
    }

  }
</script>

<style lang="scss" src="./index.scss" scoped></style>
