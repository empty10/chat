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
          <input type="text" v-model="nickValue" class="inputNick" placeholder="请输入昵称">
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
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data () {
      return {
        isShowAvatar: true,
        isBackgroundBlur: false,
        nickValue: '',
        passValue: ''
      }
    },
    methods: {
      enterChat () {
        if (!this.passValue || !this.nickValue) {
          let text = !this.nickValue ? '昵称' : '密码'
          alert('请输入' + text)
          return
        }
        this.$router.push('/Chat')
      }
    }

  }
</script>

<style lang="scss" src="./index.scss"></style>
