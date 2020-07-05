import { mount } from '@vue/test-utils'
import Table from '../../src/components/Table.vue'

describe('Table Component', () => {
  it('Emittes Sort and ActionClick events', () => {
    const wrapper = mount(Table, {
      propsData: {
        columns: [{ key: 'id' }],
        rows: [{ id: 1 }, { id: 2 }]
      }
    })
    wrapper.find('tr > th').trigger('click')
    expect(wrapper.emitted().tableSort).toBeTruthy()
    wrapper.find('button.action-edit').trigger('click')
    expect(wrapper.emitted().actionClick).toBeTruthy()
  })
})
