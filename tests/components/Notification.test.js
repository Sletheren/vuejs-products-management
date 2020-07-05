import { mount } from '@vue/test-utils'
import Notification from '../../src/components/Notification.vue'

describe('Notification Component', () => {
  const message = 'Oops'
  const type = 'error'
  const wrapper = mount(Notification, {
    propsData: {
      message,
      type
    }
  })
  it('Renders with props', () => {
    expect(wrapper.props().type).toBe(type)
    expect(wrapper.props().message).toBe(message)
  })
  it('Shows the correct message and classes', () => {
    expect(wrapper.find('span.message').text()).toBe(message)
    expect(wrapper.find('.notification').classes()).toContain('error')
  })
})
