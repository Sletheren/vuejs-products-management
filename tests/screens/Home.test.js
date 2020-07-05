import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

import store from '../../src/store'
import router from '../../src/router'
import Home from '../../src/screens/Home.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

const mockData = [
  { id: 1, name: 'SmartTV 900', brand: 'HP', price: 100 },
  { id: 2, name: 'USB 1GB', brand: 'DELL', price: 10 }
]
describe('Home screen', () => {
  const wrapper = mount(Home, {
    store,
    localVue,
    router
  })
  store.commit('products/initProducts', mockData)
  it('Renders 2 rows of data', () => {
    expect(wrapper.vm.rows.length).toBe(2)
  })
  it('Changes sort order and target', () => {
    expect(wrapper.vm.sortDirection).toBe('asc')
    expect(wrapper.vm.sortTarget).toBe('id')
    wrapper.vm.onTableSort('id')
    expect(wrapper.vm.sortDirection).toBe('desc')
    wrapper.vm.onTableSort('name')
    expect(wrapper.vm.sortTarget).toBe('name')
    expect(wrapper.vm.sortDirection).toBe('desc')
  })
})
