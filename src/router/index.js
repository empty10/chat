import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/Login'
import Chat from '@/components/chat/Chat.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Chat',
      name: 'Chat',
      component: Chat
    }
  ]
})
