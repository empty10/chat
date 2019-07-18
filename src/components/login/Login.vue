<template>
  <div :class="['loginBox' , {'loginBoxBlur':isBackgroundBlur}]">
    <div class="head" v-show="isShowAvatar">
      <div class="headImg">
      </div>
    </div>
    <div class="contentBox">
      <div class="nickname">
        <div class="nickIcon">
          icon
        </div>
        <div class="nickBox">
          <input type="text" v-model="nickName" class="inputNick" placeholder="请输入昵称">
        </div>
      </div>
      <div class="password">
          <div class="passIcon">
            icon
          </div>
          <div class="passBox">
            <input type="password" v-model="passValue" class="inputPass" placeholder="密码">
          </div>
      </div>
    </div>
    <div class="loginBtn" @click="enterChat">
      <div class="btnWrap">
        登录
      </div>
    </div>
    <div class="lifeTip">
      weChat is a life way
    </div>
  </div>
</template>

<script>
  import io from 'socket.io-client'

  // 建立socket.io通信
  const socket = io.connect('http://localhost:8080')

  export default {
    name: 'Login',
    data () {
      return {
        isShowAvatar: true,
        isBackgroundBlur: false,
        nickName: '',
        passValue: ''
      }
    },
    methods: {
      enterChat () {
        if (!this.passValue || !this.nickName) {
          let text = !this.nickName ? '昵称' : '密码'
          alert('请输入' + text)
          return
        }

        /* 定义用户名 */
        if (this.nickName) {
          /* 向服务端发送登录事件 */
          socket.emit('login', {username: this.nickName})
          localStorage.nickName = this.nickName
        } else {
          alert('请输入昵称')
        }

        this.$router.push('/Chat')
      }
    }

  }
</script>

<style lang="scss" src="./index.scss"></style>
