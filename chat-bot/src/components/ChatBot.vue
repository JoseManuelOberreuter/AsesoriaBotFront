  <template>
    <div class="chatbot">
      <div class="messages" ref="messagesContainer">
        <div v-for="(message, index) in messages" :key="index" class="message">
          <span :class="message.sender">{{ message.text }}</span>
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
  export default {
    name: 'ChatBot',
    data() {
      return {
        messages: [],
        newMessage: ''
      };
    },
    methods: {
      sendMessage() {
        const trimmedMessage = this.newMessage.trim();
        if (trimmedMessage !== '') {
          this.messages.push({ text: trimmedMessage, sender: 'user' });
          this.newMessage = '';
          this.botReply();
          this.scrollToBottom();
        }
      },
      botReply() {
        setTimeout(() => {
          this.messages.push({ text: 'Esta es una respuesta automática', sender: 'bot' });
          this.scrollToBottom();
        }, 1000);
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

  <style scoped>
  .chatbot {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 80vh;
    width: 80vw;
    max-width: 700px;
    max-height: 700px;
    border: 1px solid #fff;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 2rem;
    background-color: #ccc;
    display: flex;
    flex-direction: column;
  }

  .messages {
    flex: 1;
    overflow-y: auto;
    margin-bottom: 1rem;
    padding-right: 1rem; /* Añade un poco de espacio a la derecha para evitar que el contenido quede pegado */
  }

  .message {
    margin: 0.5rem 0;
    display: flex;
  }

  .message .user {
    margin-left: auto;
    background-color: #007bff;
    color: white;
    padding: 0.5rem;
    border-radius: 8px;
  }

  .message .bot {
    margin-right: auto;
    background-color: #3d3d3d;
    color: white; /* Añade color blanco para mejorar la legibilidad */
    padding: 0.5rem;
    border-radius: 8px;
  }

  input {
    border: none;
    border-radius: 20px;
    padding: 0.8rem 1rem;
    width: 80%;
    max-width: 500px;
    background-color: #ffffff;
    margin: auto;
    display: block;
    outline: none;
    transition: background-color 0.2s ease;
  }

  input:focus {
    background-color: #eae7e7;
  }
  </style>
