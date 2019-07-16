<template>
  <div class="wrap">
    <div class="content">
        <div class="login" @click="enterChat">
          登录
        </div>
        <div class="register">
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
      enterChat(){
        console.log('111chat');
        this.$router.push('/Chat')
      }

      //todo如果有历史登录记录，则只展示背景图片，不展示'登录'，'注册'
    }
  }
</script>

<style lang="scss" src="./index.scss"></style>
