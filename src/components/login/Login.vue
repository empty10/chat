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
    name: "Login",
    data() {
      return{

      }
    },
    methods:{
      enterChat(){
        console.log('111chat');
        this.$router.push('/Chat')
      }
    }
  }
</script>

<style lang="scss" src="./index.scss"></style>
