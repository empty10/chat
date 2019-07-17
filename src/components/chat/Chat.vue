<template>
  <div class="chat">
    <div class="chatHeader">
      weChat
    </div>
    <div class="chatContent">
      <ul class="messageList">
        <template  v-for="item in messages">
          <li class="information" v-if="item.form=='system'">
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
  export default {
    name: 'Chat',
    data () {
      return {
        inputValue: '',
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
            form: 'system',
            content: '张三加入群聊'
          }
        ]
      }
    },
    methods: {

    }

  }
</script>

<style lang="scss" src="./index.scss" scoped></style>
