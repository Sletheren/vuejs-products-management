import Vue from 'vue'
import Vuex from 'vuex'

import products from './modules/products'
import notification from './modules/notification'

Vue.use(Vuex)

export const modules = {
  products,
  notification
}

const store = new Vuex.Store({
  modules
})

export default store
