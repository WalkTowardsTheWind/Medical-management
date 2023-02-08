import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,

  },
  getters,
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      key: 'erabbit-client-pc-store', // 存数据的key名   自定义的  要有语义化
      paths: ['user.name','user.avatar','user.role','user.userInfo'] // 要把那些模块加入缓存
    })
  ]
})

export default store
