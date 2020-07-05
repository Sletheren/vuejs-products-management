import Vue from 'vue'
import Vuex from 'vuex'

import products from './modules/products'
import notification from './modules/notification'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    products,
    notification
  }
})

export default store
