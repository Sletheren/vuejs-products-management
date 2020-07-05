import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faSearch,
  faTimesCircle,
  faPlusCircle,
  faTrash,
  faEdit,
  faTimes,
  faSort,
  faCheck
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import App from './App.vue'
import router from './router'
import store from './store'

// Adding FontAwesome Icons
library.add(
  faSearch,
  faTimesCircle,
  faPlusCircle,
  faTrash,
  faEdit,
  faTimes,
  faSort,
  faCheck
)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
