import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import FormLogin from '../FormLogin.vue'
import { setupTest } from '../../__tests__/setup'

describe('FormLogin.vue', () => {
  let wrapper
  const { global } = setupTest()

  beforeEach(() => {
    wrapper = mount(FormLogin, { global })
  })

  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('contains all required form elements', () => {
    expect(wrapper.find('form').exists()).toBe(true)
    expect(wrapper.find('input[type="email"]').exists()).toBe(true)
    expect(wrapper.find('input[type="password"]').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
  })

  it('shows error message when provided', async () => {
    await wrapper.setData({ errorMessage: 'Credenciales inválidas' })
    expect(wrapper.find('.error-message').text()).toBe('Credenciales inválidas')
  })

  it('shows loading state correctly', async () => {
    await wrapper.setData({ loading: true })
    expect(wrapper.find('button').text()).toContain('Verificando...')
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })

  it('contains links to register and forgot password', () => {
    const links = wrapper.findAll('router-link')
    expect(links.length).toBe(2)
    expect(links[0].attributes('to')).toBe('/register')
    expect(links[1].attributes('to')).toBe('/forgotpassword')
  })

  it('updates form data when input values change', async () => {
    const emailInput = wrapper.find('input[type="email"]')
    const passwordInput = wrapper.find('input[type="password"]')

    await emailInput.setValue('test@example.com')
    await passwordInput.setValue('password123')

    expect(wrapper.vm.formData.email).toBe('test@example.com')
    expect(wrapper.vm.formData.password).toBe('password123')
  })

  it('emits submit event with form data when form is submitted', async () => {
    const emailInput = wrapper.find('input[type="email"]')
    const passwordInput = wrapper.find('input[type="password"]')
    const form = wrapper.find('form')

    await emailInput.setValue('test@example.com')
    await passwordInput.setValue('password123')
    await form.trigger('submit.prevent')

    expect(wrapper.emitted('submit')).toBeTruthy()
    expect(wrapper.emitted('submit')[0][0]).toEqual({
      email: 'test@example.com',
      password: 'password123'
    })
  })
}) 