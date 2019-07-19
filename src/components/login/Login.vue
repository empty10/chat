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
  // import {debounce} from '../../util/debounce.js'

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
        } else {
          alert('请输入昵称')
        }

        socket.on('loginSuccess', data => {
          console.log(data)
          // localStorage.nickName = JSON.stringify(data.username)
          this.$store.commit('setNickname', data.username)
          this.$store.commit('setLoginStatus', true)
          this.$router.push('/Chat')
        })

        socket.on('loginFail', data => {
          console.log(data)
          alert('昵称重复，登录失败')
        })
      }
    }
  }
</script>

<style lang="scss" src="./index.scss"></style>
