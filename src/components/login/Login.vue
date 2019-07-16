<template>
  <div class="loginBox">
    <div class="head" v-show="isShowAvatar">
      <div class="headImg">
        Avatar
      </div>
    </div>
    <div class="contentBox">
      <div class="nickname">
        <div class="nickIcon">
          icon
        </div>
        <div class="nickBox">
          <input type="text"  placeholder="请输入昵称">
        </div>
      </div>
      <div class="password">
          <div class="passIcon">
            icon
          </div>
        <input type="password" class="passBox" >
      </div>
    </div>
    <div class="loginBtn">
      登录
    </div>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data(){
      return{
        isShowAvatar:true
      }
    }

  }
</script>

<style lang="scss" src="./index.scss"></style>
