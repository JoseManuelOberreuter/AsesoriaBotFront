<!-- TODO: cambiar el mensaje del principio personalizado -->
<!-- TODO: agregar la informacion del usuario / empresa personalizado a la api de deepseek-->
<template>
  <div class="chatbot">
    <div class="messages" ref="messagesContainer">
      <div v-for="(message, index) in messages" :key="index" class="message-container">
        <!-- Mensajes del bot con imagen de avatar -->
        <div v-if="message.sender === 'bot'" class="bot-message">
          <img :src="LogoAsesoriaBot" alt="Imagen de perfil de AsesoriaBot" class="bot-avatar" />
          <TypeWriter :text="message.text" :speed="15" class="bot-text" />
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
import TypeWriter from './TypeWriter.vue';
import axios from '@/api/axios';

export default {
  name: 'ChatBot',
  components: {
    TypeWriter
  },
  data() {
    return {
      messages: [], // Almacena los mensajes enviados y recibidos
      newMessage: '', // Texto del mensaje en el input
      LogoAsesoriaBot,
      UserLogo,
    };
  },

  mounted() {
    this.showIntroMessages();
  },

  methods: {
    // 📌 Mensajes iniciales cuando se abre el chatbot
    showIntroMessages() {
      const introMessages = [
            { 
              text: "👋 <strong>¡Bienvenido a AsesoriaBot!</strong> Soy tu asistente virtual inteligente, diseñado para optimizar la comunicación en tu empresa. 🚀<br><br>" +
                    "🔹 <strong>Si buscas mejorar la atención a tus clientes</strong>, puedo responder preguntas frecuentes, brindar información sobre tus servicios y optimizar el soporte en tiempo real.<br><br>" +
                    "🔹 <strong>Si necesitas mejorar la eficiencia interna</strong>, puedo facilitar documentos, automatizar procesos y proporcionar información clave en segundos.<br><br>" +
                    "💡 <strong>Descubre cómo AsesoriaBot puede potenciar tu negocio.</strong> ¡Hablemos! 💬", 
              sender: "bot"
            },
          ];

      this.messages.push(...introMessages);
      this.scrollToBottom();
    },

    // 📌 Enviar mensaje del usuario y obtener respuesta del bot
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

    // 📌 Llama a la API del bot y agrega la respuesta a la conversación
    async getBotReply(userMessage) {
      try {
        const response = await axios.post('/chat', { prompt: userMessage });
        this.messages.push({ text: response.data.respuesta, sender: 'bot' });
      } catch (error) {
        console.error('Error al obtener la respuesta del bot:', error);
        this.messages.push({ text: '❌ Error al conectar con el servidor.', sender: 'bot' });
      } finally {
        this.scrollToBottom();
      }
    },

    // 📌 Hace scroll automático al último mensaje
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
/* 📌 Estilos generales del chatbot */
.chatbot {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 90vh;
  width: 80vw;
  max-width: 700px;
  max-height: 90vh;
  border-radius: 10px;
  padding: 2vh;
  margin-bottom: 3vh;
  background-color: var(--color-primary);
  display: flex;
  flex-direction: column;
}

/* 📌 Contenedor de mensajes con scroll */
.messages {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 1rem;
  padding-right: 1rem;
  scrollbar-width: thin;
  scrollbar-color: var(--color-secondary) transparent;
}

/* 📌 Contenedor de cada mensaje */
.message-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 1rem;
}

/* 📌 Mensajes del bot */
.bot-message {
  display: flex;
  align-items: top;
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
  text-align: justify;
  padding: 10px;
  border-radius: 8px;
  line-height: 1.5; 
}

/* 📌 Mensajes del usuario */
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

/* 📌 Estilos del campo de entrada de texto */
input {
  border: none;
  border-radius: 20px;
  padding: 0.8rem 1rem;
  width: 80%;
  max-width: 500px;
  background-color: var(--color-background);
  color: var(--color-light-secondary);
  margin: auto;
  display: block;
  outline: none;
  transition: background-color 0.2s ease;
}

/* 📌 Estilo cuando el input está enfocado */
input:focus {
  background-color: var(--color-secondary);
}
</style> 