import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../App.vue'
import { setupTest } from './setup'

describe('App.vue', () => {
  const { global } = setupTest()

  it('renders properly', () => {
    const wrapper = mount(App, { global })
    expect(wrapper.exists()).toBe(true)
  })

  it('contains router-view', () => {
    const wrapper = mount(App, { global })
    expect(wrapper.find('router-view-stub').exists()).toBe(true)
  })

  it('has correct class and structure', () => {
    const wrapper = mount(App, { global })
    expect(wrapper.find('#app').exists()).toBe(true)
    expect(wrapper.find('main').exists()).toBe(true)
  })
}) 