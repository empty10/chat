import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    id: '',
    location: '',
    isLogin: false,
    nickName: 'aa',
    portrait: 'https://image.guazistatic.com/gz01190717/15/51/c5d5be61ec6032c79c7abc60ced9ed08.jpg'
  },

  mutations: {
    setNickname (state, name) {
      state.nickName = name
    },
    setLoginStatus (state, loginStatus) {
      state.isLogin = loginStatus
    },
    setLocation (state, location) {
      state.location = location
    }
  }
})
