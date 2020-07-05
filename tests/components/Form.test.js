import { mount } from '@vue/test-utils'
import Form from '../../src/components/Form.vue'

describe('Form Component', () => {
  const wrapper = mount(Form)
  it('Renders the default inputs config', () => {
    expect(wrapper.find('input#id').exists()).toBe(true)
    expect(wrapper.find('input#name').exists()).toBe(true)
    expect(wrapper.find('input#brand').exists()).toBe(true)
    expect(wrapper.find('input#price').exists()).toBe(true)
  })
  it('Renders custom inputs config', async () => {
    await wrapper.setData({
      columns: [
        {
          key: 'cool',
          title: 'cool',
          type: 'text'
        },
        {
          key: 'stuff',
          title: 'stuff',
          type: 'text'
        }
      ]
    })
    expect(wrapper.find('input#cool').exists()).toBe(true)
    expect(wrapper.find('input#stuff').exists()).toBe(true)
    expect(wrapper.find('input#id').exists()).toBe(false)
  })
  it('Emittes Form cancellation', () => {
    wrapper.find('#form-cancel-btn').trigger('click')
    expect(wrapper.emitted().formCancelled).toBeTruthy()
  })
  it('Submittes the form', async () => {
    await wrapper.setProps({
      initialData: {
        cool: '',
        stuff: ''
      }
    })
    await wrapper.setData({
      columns: [
        {
          key: 'cool',
          title: 'cool',
          type: 'text'
        },
        {
          key: 'stuff',
          title: 'stuff',
          type: 'text'
        }
      ]
    })
    wrapper.find('#cool').setValue('wow')
    wrapper.find('#stuff').setValue('hoho')
    expect(wrapper.vm.product.cool).toBe('wow')
    expect(wrapper.vm.product.stuff).toBe('hoho')
    wrapper.find('form').trigger('submit.prevent')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.hasErrors).toBe(false)
    expect(wrapper.emitted().formSubmitted).toBeTruthy()
  })
  it('Prevents submission form', async () => {
    const wrapper = mount(Form)
    await wrapper.setProps({
      initialData: {
        id: ''
      }
    })
    await wrapper.setData({
      columns: [
        {
          key: 'id',
          title: 'id',
          type: 'text'
        }
      ]
    })
    expect(wrapper.vm.product.id).toBe('')
    wrapper.find('form').trigger('submit.prevent')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.hasErrors).toBe(true)
    expect(wrapper.emitted().formSubmitted).toBeFalsy()
  })
})
