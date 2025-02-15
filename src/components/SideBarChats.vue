<template>
  <div>
    <aside :class="['sidebar', { open: isOpen }]">
      <button class="toggle-btn" @click="toggleSidebar">
        {{ isOpen ? '❮' : '❯' }}
      </button>

      <nav>
        <ul class="chat-list">
          <li class="first-item">
            <button @click="addChat">Nuevo Chat</button>
          </li>

          <div class="chat-container">
            <li v-for="(chat, index) in chats" :key="index">
              <a href="#">{{ chat }}</a>
            </li>
          </div>
        </ul>
      </nav>
    </aside>
  </div>
</template>

<script>
import '@/styles/index.css';

export default {
  name: 'SideBar',
  data() {
    return {
      isOpen: false,
      chats: ["Chat antiguo", "Chat antiguo", "Chat antiguo"]
    };
  },
  methods: {
    toggleSidebar() {
      this.isOpen = !this.isOpen;
    },
    addChat() {
      this.chats.unshift(`Chat ${this.chats.length + 1}`);
      this.$nextTick(() => {
        const chatContainer = this.$el.querySelector(".chat-container");
        if (chatContainer) {
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }
      });
    }
  }
};
</script>

<style scoped>
/* Sidebar izquierdo */
.sidebar {
  width: 250px;
  background-color: var(--color-secondary);
  padding: 1rem;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  transition: transform 0.3s ease-in-out;
  transform: translateX(-100%);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
}

.sidebar.open {
  transform: translateX(0);
}

/* Botón dentro del sidebar */
.toggle-btn {
  position: absolute;
  top: 45%;
  right: -40px; /* Se pega al sidebar */
  width: 40px;
  height: 40px;
  background-color: var(--color-dark-secondary);
  color: var(--color-light-secondary);
  border: none;
  cursor: pointer;
  z-index: 1100;
  border-radius: 0 10px 10px 0; /* Forma redonda pegada */
  transition: background-color 0.3s ease, transform 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
}

.toggle-btn:hover {
  background-color: var(--color-primary);
  transform: scale(1.1);
}

/* Lista de chats */
.chat-list {
  list-style: none;
  padding: 0;
  margin: 0;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

/* Contenedor con scroll aesthetic */
.chat-container {
  margin-top: 1rem;
  max-height: 80vh;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--color-primary) transparent;
}

.chat-container::-webkit-scrollbar {
  width: 6px;
}

.chat-container::-webkit-scrollbar-thumb {
  background: var(--color-primary);
  border-radius: 10px;
  transition: background 0.3s ease-in-out, transform 0.2s ease-in-out;
}

.chat-container::-webkit-scrollbar-thumb:hover {
  background: var(--color-dark-secondary);
  transform: scale(1.2);
}

.chat-container::-webkit-scrollbar-track {
  background: transparent;
}

/* Enlaces de los chats */
.sidebar a {
  color: var(--color-light-secondary);
  text-decoration: none;
  display: block;
  padding: 0.5rem 1rem;
  transition: background-color 0.3s ease;
  border-radius: 8px;
}

.sidebar a:hover {
  background-color: var(--color-primary);
}

/* Botón "Nuevo Chat" */
.sidebar .first-item button {
  background-color: var(--color-dark-secondary);
  color: var(--color-light-secondary);
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  width: 100%;
  border-radius: 8px;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.sidebar .first-item button:hover {
  background-color: var(--color-primary);
}

/* Se elimina transform: translateX(0) */
@media (min-width: 768px) {
  .sidebar {
    width: 20vw;
  }
}
</style>
