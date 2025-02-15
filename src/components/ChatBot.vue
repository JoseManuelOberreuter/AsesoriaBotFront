<template>
  <div class="chatbot">
    <div class="messages" ref="messagesContainer">
      <div v-for="(message, index) in messages" :key="index" class="message-container">
        <!-- Mensajes del bot con imagen de avatar -->
        <div v-if="message.sender === 'bot'" class="bot-message">
          <img :src="LogoAsesoriaBot" alt="Imagen de perfil de AsesoriaBot" class="bot-avatar" />
          <span class="bot-text">{{ message.text }}</span>
        </div>

        <!-- Mensajes del usuario con imagen de avatar -->
        <div v-else class="user-message">
          <span class="user-text">{{ message.text }}</span>
          <img :src="UserLogo" alt="Imagen de perfil de Usuario" class="user-avatar" /> 
        </div>
      </div>
    </div>

    <!-- Campo de entrada para escribir mensajes -->
    <input
      v-model="newMessage"
      @keyup.enter="sendMessage"
      type="text"
      placeholder="Escribe tu mensaje..."
    />
  </div>
</template>

<script>
import '@/styles/index.css';
import LogoAsesoriaBot from '@/assets/LogoAsesoriaBot.png';
import UserLogo from '@/assets/UserLogo.png';
import axios from 'axios';

export default {
  name: 'ChatBot',
  data() {
    return {
      messages: [], // Almacena los mensajes enviados y recibidos
      newMessage: '', // Texto del mensaje en el input
      LogoAsesoriaBot,
      UserLogo
    };
  },

  methods: {
    // Envía un mensaje del usuario y obtiene la respuesta del bot
    async sendMessage() {
      const trimmedMessage = this.newMessage.trim();
      if (!trimmedMessage) return;

      // Agregar mensaje del usuario a la conversación
      this.messages.push({ text: trimmedMessage, sender: 'user' });
      this.newMessage = '';
      this.scrollToBottom();

      // Obtener respuesta del bot
      await this.getBotReply(trimmedMessage);
    },

    // Llama a la API del bot y agrega la respuesta a la conversación
    async getBotReply(userMessage) {
      try {
        const response = await axios.post('http://localhost:4005/chat', { prompt: userMessage });
        this.messages.push({ text: response.data.respuesta, sender: 'bot' });
      } catch (error) {
        console.error('Error al obtener la respuesta del bot:', error);
        this.messages.push({ text: 'Error al conectar con el servidor', sender: 'bot' });
      } finally {
        this.scrollToBottom();
      }
    },

    // Hace scroll automático al último mensaje
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.messagesContainer;
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      });
    }
  }
};
</script>

<style>
/* Estilos generales del chatbot */
.chatbot {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 87vh;
  width: 80vw;
  max-width: 700px;
  max-height: 700px;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 2rem;
  background-color: var(--color-primary);
  display: flex;
  flex-direction: column;
}

/* Contenedor de mensajes con scroll */
.messages {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 1rem;
  padding-right: 1rem;
  scrollbar-width: thin;
  scrollbar-color: var(--color-secondary) transparent;
}

/* Contenedor de cada mensaje */
.message-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 1rem;
}

/* Mensajes del bot */
.bot-message {
  display: flex;
  align-items: center;
  color: var(--color-light-secondary);
  padding: 0.5rem;
  border-radius: 8px;
  max-width: 80%;
}

.bot-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}

.bot-text {
  font-size: 1rem;
}

/* Mensajes del usuario */
.user-message {
  align-self: flex-end;
  display: flex;
  align-items: center;
  color: var(--color-light-secondary);
  padding: 0.5rem;
  border-radius: 8px;
  max-width: 80%;
}

.user-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-left: 10px;
}

.user-text {
  font-size: 1rem;
}

/* Estilos del campo de entrada de texto */
input {
  border: none;
  border-radius: 20px;
  padding: 0.8rem 1rem;
  width: 80%;
  max-width: 500px;
  background-color: var(--color-light-secondary);
  color: black;
  margin: auto;
  display: block;
  outline: none;
  transition: background-color 0.2s ease;
}

/* Estilo cuando el input está enfocado */
input:focus {
  background-color: var(--color-background);
}
</style>
