<template>
  <div class="wrap">
    <div class="content">
        <div class="login" @click="enterLogin">
          登录
        </div>
        <div class="register" @click="enterRegister">
          注册
        </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Home",
    data() {
      return{

      }
    },
    methods:{
      enterLogin(){
        this.$router.push('/Login')
      },
      enterRegister(){
        this.$router.push('/Register')
      }
      //todo如果有历史登录记录，则只展示背景图片，不展示'登录'，'注册'
    }
  }
</script>

<style lang="scss" src="./index.scss"></style>
