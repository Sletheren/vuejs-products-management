import { mount, createLocalVue } from '@vue/test-utils'
import { withStoreAndRouter } from '../mocks/app'
import EditProduct from '../../src/screens/EditProduct.vue'

describe('Edit Product screen', () => {
  let wrapper
  beforeEach(() => {
    wrapper = withStoreAndRouter(EditProduct)
    wrapper.vm.$store.commit('products/getProduct', {
      id: 1,
      name: 'alienware',
      brand: 'DELL',
      price: 3000
    })
  })
  afterEach(() => {
    wrapper.destroy()
  })
  it('Stops the users from editting', async () => {
    expect(wrapper.vm.product.name).toBe('alienware')
    await wrapper.setData({
      product: {
        ...wrapper.vm.product,
        name: ''
      }
    })
    expect(wrapper.vm.product.name).toBe('')
  })
})
