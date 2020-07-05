import { mount } from '@vue/test-utils'
import SearchInput from '../../src/components/SearchInput.vue'

describe('SearchInput Component', () => {
  const wrapper = mount(SearchInput)

  it('Renders the input', () => {
    expect(wrapper.find('input').exists()).toBe(true)
  })
  it('Passes props', () => {
    const value = 'Hello'
    wrapper.setProps({ value })
    expect(wrapper.vm.value).toBe(value)
  })
  it('Emittes onChange', () => {
    wrapper.find('#search').setValue('Hello')
    expect(wrapper.emitted().input).toBeTruthy()
  })
  it('Emittes onChange on button clear', () => {
    wrapper.find('#clear-search').trigger('click')
    expect(wrapper.emitted().input).toBeTruthy()
  })
})
