import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ChatBot from '../ChatBot.vue'
import TypeWriter from '../TypeWriter.vue'
import { setupTest } from '../../__tests__/setup'

// Mock de axios
vi.mock('@/api/axios', () => ({
  default: {
    post: vi.fn().mockResolvedValue({
      data: {
        respuesta: 'Respuesta del bot'
      }
    })
  }
}))

describe('ChatBot.vue', () => {
  let wrapper
  const { global } = setupTest()

  beforeEach(() => {
    wrapper = mount(ChatBot, {
      global: {
        ...global,
        components: {
          TypeWriter
        }
      }
    })
  })

  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('contains all required elements', () => {
    expect(wrapper.find('.chatbot').exists()).toBe(true)
    expect(wrapper.find('.messages').exists()).toBe(true)
    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
  })

  it('displays messages correctly', async () => {
    const testMessages = [
      { sender: 'bot', text: 'Hola, ¿en qué puedo ayudarte?' },
      { sender: 'user', text: 'Necesito ayuda con mi negocio' }
    ]

    await wrapper.setData({ messages: testMessages })

    const messageContainers = wrapper.findAll('.message-container')
    expect(messageContainers.length).toBe(2)

    // Verificar mensaje del bot
    const botMessage = messageContainers[0]
    expect(botMessage.find('.bot-message').exists()).toBe(true)
    expect(botMessage.find('.bot-avatar').exists()).toBe(true)
    expect(botMessage.findComponent(TypeWriter).exists()).toBe(true)

    // Verificar mensaje del usuario
    const userMessage = messageContainers[1]
    expect(userMessage.find('.user-message').exists()).toBe(true)
    expect(userMessage.find('.user-avatar').exists()).toBe(true)
    expect(userMessage.find('.user-text').text()).toBe('Necesito ayuda con mi negocio')
  })

  it('updates newMessage when input changes', async () => {
    const input = wrapper.find('input')
    await input.setValue('Nuevo mensaje')
    expect(wrapper.vm.newMessage).toBe('Nuevo mensaje')
  })

  it('sends message when Enter key is pressed', async () => {
    const input = wrapper.find('input')
    await input.setValue('Nuevo mensaje')
    await input.trigger('keyup.enter')

    // Verificar que el mensaje se agregó al array de mensajes
    expect(wrapper.vm.messages).toContainEqual({
      sender: 'user',
      text: 'Nuevo mensaje'
    })

    // Verificar que el input se limpió
    expect(wrapper.vm.newMessage).toBe('')

    // Esperar a que se complete la llamada a la API
    await wrapper.vm.$nextTick()

    // Verificar que se agregó la respuesta del bot
    expect(wrapper.vm.messages).toContainEqual({
      sender: 'bot',
      text: 'Respuesta del bot'
    })
  })

  it('handles API error correctly', async () => {
    // Configurar el mock para que falle
    const axios = await import('@/api/axios')
    axios.default.post.mockRejectedValueOnce(new Error('API Error'))

    const input = wrapper.find('input')
    await input.setValue('Hola')
    await input.trigger('keyup.enter')

    // Esperar a que se complete la llamada a la API
    await wrapper.vm.$nextTick()

    // Verificar que se agregó el mensaje de error
    expect(wrapper.vm.messages).toContainEqual({
      sender: 'bot',
      text: '❌ Error al conectar con el servidor.'
    })
  })
}) 