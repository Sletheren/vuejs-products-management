import Vue from 'vue'
import VueRouter from 'vue-router'

import HomeScreen from '../screens/Home'
import CreateProductScreen from '../screens/CreateProduct'
import EditProductScreen from '../screens/EditProduct'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: HomeScreen,
      children: [
        {
          path: 'create',
          component: CreateProductScreen,
          props: true,
          meta: {
            showModal: true
          }
        },
        {
          path: 'edit/:id',
          component: EditProductScreen,
          props: true,
          meta: {
            showModal: true
          }
        }
      ]
    }
  ]
})
