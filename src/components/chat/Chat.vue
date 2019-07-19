<template>
  <div class="chat">
    <div class="chatHeader">
      weChat
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
              <div class="itemFace">
                <img :src="item.portrait" alt="">
              </div>
          </li>
        </template>
      </ul>
    </div>
    <div class="chatFooter">
      <div class="mojiBox">

      </div>
      <textarea class="textBox" v-model="inputValue" autofocus @keyup.enter="sendMsg">

      </textarea>
      <div class="sendBtn" @click="sendMsg" >
        发送
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
        nickName: 'aaa',
        portrait: '',
        location: '北京',
        messages: [],
        onlineTip: ''
      }
    },
    created () {
      if (!this.$store.state.isLogin) {
        console.log('尚未登录')
        this.$router.push('/')
        return
      }
      this.nickName = this.$store.state.nickName

      if (localStorage.record_chat) {
        this.messages = JSON.parse(localStorage.record_chat)
      }

      this.portrait = this.$store.state.portrait
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
      // 监听登录成功事件
      socket.on('add', data => {
        this.messages.push({
          from: 'system',
          content: `系统消息：${data.username}进入群聊`
        })
      })

      // 监听通信事件
      socket.on('online', name => {
        console.log('online====', name)
        if (!name) {
          return
        }

        this.messages.push({
          from: 'system',
          content: `系统消息：${name}加入群聊`
        })
      })

      // 监听通信事件
      socket.on('leave', name => {
        if (name != null) {
          this.$store.commit('setLoginStatus', false)

          this.messages && this.messages.push({
            from: 'system',
            content: `系统消息：${name}离开群聊`
          })
        }
      })

      socket.on('receiveMsg', data => {
        if (data.nickName === this.nickName) {
          return
        }
        this.messages.push(data)
      })

      // 发送上线事件
      console.log('----上线', this.nickName)
    },

    methods: {
      sendMsg () {
        if (!this.inputValue) {
          return
        }
        console.log('点击发送', this.inputValue)

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
