import { mount, createLocalVue } from '@vue/test-utils'
import { withStoreAndRouter } from '../mocks/app'
import Home from '../../src/screens/Home.vue'

const mockData = [
  { id: 1, name: 'SmartTV 900', brand: 'HP', price: 100 },
  { id: 2, name: 'USB 1GB', brand: 'DELL', price: 10 }
]
describe('Home screen', () => {
  let wrapper
  beforeEach(() => {
    wrapper = withStoreAndRouter(Home)
    wrapper.vm.$store.commit('products/initProducts', mockData)
  })
  afterEach(() => {
    wrapper.destroy()
  })
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
  it('Trigger confirm box for deletion', () => {
    expect(wrapper.vm.showDeleteAlert).toBe(false)
    expect(wrapper.vm.toBeDeletedId).toBe(null)
    wrapper.find('table .action-delete').trigger('click')
    expect(wrapper.vm.showDeleteAlert).toBe(true)
    expect(wrapper.vm.toBeDeletedId).toBe(1)
    wrapper.vm.cancelDelete()
    expect(wrapper.vm.showDeleteAlert).toBe(false)
    expect(wrapper.vm.toBeDeletedId).toBe(null)
  })
})
