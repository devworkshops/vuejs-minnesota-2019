import { shallowMount } from '@vue/test-utils'
import MyCounter from '@/components/MyCounter.vue'

describe('MyCounter.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(MyCounter)
    expect(wrapper.vm.counter).toBe(0)
  })

  it('increase when click', () => {
    wrapper.find('button').trigger('click')
    expect(wrapper.vm.counter).toBe(1)
    expect(wrapper.find('button').classes('positive')).toBeTruthy()
  })
  
  it('decrease when right-click', () => {
    wrapper.find('button').trigger('contextmenu')
    expect(wrapper.vm.counter).toBe(-1)
    expect(wrapper.find('button').classes('negative')).toBeTruthy()
  })
})
