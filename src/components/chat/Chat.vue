<template>
  <div class="chat">
    <div class="chatHeader">
      weChat
    </div>
    <div class="chatContent">

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
        inputValue: ''

      }
    },
    methods: {

    }

  }
</script>

<style lang="scss" src="./index.scss" scoped></style>
