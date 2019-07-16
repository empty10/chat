import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'
import Chat from '@/components/chat/Chat'
import Login from '@/components/login/Login'
import Register from '@/components/register/Register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/Chat',
      name: 'Chat',
      component: Chat
    }
  ]
})
