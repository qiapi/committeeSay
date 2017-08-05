// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'Vuex'
import LoginStatus from '../lib/LoginStatus'

Vue.config.productionTip = false

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    currentUser: {},
    currentHomework: '',
    submitHomework: []
  },
  mutations: {
    setUser (state, userMsg) {
      state.currentUser = userMsg
    }
  }
})

let loginStatus = new LoginStatus(store)
loginStatus.decode()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
