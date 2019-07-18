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
      try {
        this.nickName = JSON.parse(localStorage.nickName)
      } catch (err) {
        console.log(err)
      }

      this.portrait = 'https://image.guazistatic.com/gz01190717/15/51/c5d5be61ec6032c79c7abc60ced9ed08.jpg'
      console.log('huode nickname', this.nickName)
    },
    watch: {
      messages: {
        handler () {
          this.fixedBottom()
        },
        deep: true
      }
    },
    mounted () {
      // 发送上线事件
      // 监听通信事件
      socket.on('online', name => {
        if (!name) {
          return
        }

        this.messages.push({
          from: 'system',
          content: `${name}加入群聊`
        })
      })

      socket.on('receiveMsg', data => {
        console.log(data)
        this.messages.push(data)
      })
      // 发送上线事件
      socket.emit('online', this.nickName)
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
