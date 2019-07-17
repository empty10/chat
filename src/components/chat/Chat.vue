<template>
  <div class="chat">
    <div class="chatHeader">
      weChat
    </div>
    <div class="chatContent">
      <ul class="messageList">
        <template  v-for="item in messages">
          <li class="information" v-if="item.from=='system'">
            <div class="infoBox">
              {{item.content}}
            </div>
          </li>
          <li class="listItem" :class="{ 'myself':item.from == 'myself' }" v-else>
              <div class="itemContent" :class="{'myselfContent':item.from == 'myself'}">{{item.content}}</div>
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
      <textarea class="textBox" v-model="inputValue">

      </textarea>
      <div class="sendBtn">
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
        nickName: '',
        portrait: '',
        messages: [
          {
            date: '19-07-17 15:06:32',
            from: 'myself',
            nickName: 'empty',
            portrait: 'https://image.guazistatic.com/gz01190717/15/51/c5d5be61ec6032c79c7abc60ced9ed08.jpg',
            content: 'dfhjdsg132131237653512736812735123521367',
            location: '北京'
          },
          {
            date: '19-07-17 15:06:32',
            from: 'others',
            nickName: 'empty',
            portrait: 'https://image.guazistatic.com/gz01190717/15/51/c5d5be61ec6032c79c7abc60ced9ed08.jpg',
            content: 'dfhjdsg132131237653512736812735123521367',
            location: '北京'
          },
          {
            date: '19-07-17',
            from: 'system',
            content: '张三加入群聊'
          }
        ],
        onlineTip: ''
      }
    },
    created () {
      try {
        this.nickName = JSON.parse(localStorage.nickName)
      } catch (e) {
        this.nickName = 'aaa'
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
        this.messages.push(data)
      })
      // 发送上线事件
      socket.emit('online', this.nickName)
    },

    methods: {
      sendMsg () {
        if (!this.inputText) {
          return
        }

        socket.emit('sendMsg', {
          from: 'other',
          date: this.getTime(),
          nickName: this.nickName,
          portrait: this.portrait,
          location: this.location
        })
      }
    }

  }
</script>

<style lang="scss" src="./index.scss" scoped></style>
