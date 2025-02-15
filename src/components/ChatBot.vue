<template>
  <div class="chatbot">
    <div class="messages" ref="messagesContainer">
      <div v-for="(message, index) in messages" :key="index" class="message-container">
        <!-- Mostrar imagen solo en mensajes del bot -->
        <div v-if="message.sender === 'bot'" class="bot-message">
          <img :src="LogoAsesoriaBot" alt="Imagen de perfil de AsesoriaBot" class="bot-avatar" />
          <span class="bot-text">{{ message.text }}</span>
        </div>

        <!-- Mensajes del usuario -->
        <div v-else class="user-message">
          <span class="user-text">{{ message.text }}</span>
          <img :src="UserLogo" alt="Imagen de perfil de Usuario" class="user-avatar" /> 
        </div>
      </div>
    </div>

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
      messages: [],
      newMessage: '',
      LogoAsesoriaBot,
      UserLogo
    };
  },

  methods: {
    async sendMessage() {
      const trimmedMessage = this.newMessage.trim();
      if (trimmedMessage !== '') {
        this.messages.push({ text: trimmedMessage, sender: 'user' });
        this.newMessage = '';
        this.scrollToBottom();

        await this.getBotReply(trimmedMessage);
      }
    },
    async getBotReply(userMessage) {
      try {
        const response = await axios.post('http://localhost:4005/chat', {
          prompt: userMessage
        });
        this.messages.push({ text: response.data.respuesta, sender: 'bot' });
        this.scrollToBottom();
      } catch (error) {
        console.error('Error al obtener la respuesta del bot:', error);
        this.messages.push({ text: 'Error al conectar con el servidor', sender: 'bot' });
        this.scrollToBottom();
      }
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.messagesContainer;
        container.scrollTop = container.scrollHeight;
      });
    }
  }
};
</script>

<style>
.chatbot {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 80vh;
  width: 80vw;
  max-width: 700px;
  max-height: 700px;
  border: none;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 2rem;
  background-color: var(--color-primary);
  display: flex;
  flex-direction: column;
  scrollbar-width: thin;
  scrollbar-color: var(--color-secondary) transparent;
}

.chat-container::-webkit-scrollbar {
  width: 6px;
}

.chatbot::-webkit-scrollbar-thumb {
  background: var(--color-primary);
  border-radius: 10px;
  transition: background 0.3s ease-in-out, transform 0.2s ease-in-out;
}

.chatbot::-webkit-scrollbar-thumb:hover {
  background: var(--color-dark-secondary);
  transform: scale(1.2);
}

.chatbot::-webkit-scrollbar-track {
  background: transparent;
}
.messages {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 1rem;
  padding-right: 1rem;
}

.message-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 1rem;
}

/* Estilos para mensajes del bot */
.bot-message {
  display: flex;
  align-items: center;
  color: var(--color-light-secondary);
  padding: 0.5rem;
  border-radius: 8px;
  max-width: 80%;
  align-self: flex-start;
}

.bot-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 20px;
  transform: scale(1.5);
}

.bot-text {
  font-size: 1rem;
}

/* Estilos para mensajes del usuario */
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
  margin-left: 20px;
  transform: scale(1.5);
}

.user-text {
  font-size: 1rem;
}

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

input:focus {
  background-color: var(--color-background);
}
</style>
