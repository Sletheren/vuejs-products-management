import { mount } from '@vue/test-utils'
import Modal from '../../src/components/Modal.vue'

describe('Modal Component', () => {
  it('Trigger Router back on close', () => {
    const go = jest.fn()
    const wrapper = mount(Modal, {
      mocks: {
        $router: {
          go
        }
      }
    })
    wrapper.find('button.close-btn').trigger('click')
    expect(go).toHaveBeenCalled()
  })
})
