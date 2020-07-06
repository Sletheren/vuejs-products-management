import store from '../../src/store'
import router from '../../src/router'
import { mount, createLocalVue } from '@vue/test-utils'

export const withStoreAndRouter = (component, options = {}) => {
  const localVue = createLocalVue()
  return mount(component, {
    store,
    localVue,
    router,
    ...options
  })
}
