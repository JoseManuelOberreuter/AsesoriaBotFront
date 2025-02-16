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
            <li v-for="(chat, index) in chats" :key="index" class="chat-item">
              <span v-if="!chat.isEditing" @click="editChat(index)">{{ chat.name }}</span>
              <input 
                v-else 
                v-model="chat.name" 
                @blur="saveChat(index)" 
                @keyup.enter="saveChat(index)" 
                class="chat-input"
                autofocus
              />
              <div class="chat-actions">
                <button class="edit-btn" @click="editChat(index)">✏️</button>
                <button class="delete-btn" @click="deleteChat(index)">🗑️</button>
              </div>
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
      isOpen: true,
      chats: [
        { name: "Chat antiguo", isEditing: false },
        { name: "Chat antiguo", isEditing: false },
        { name: "Chat antiguo", isEditing: false }
      ]
    };
  },
  methods: {
    toggleSidebar() {
      this.isOpen = !this.isOpen;
    },
    addChat() {
      this.chats.unshift({ name: `Chat ${this.chats.length + 1}`, isEditing: false });
    },
    editChat(index) {
      this.chats.forEach((chat, i) => {
        if (i === index) chat.isEditing = true;
        else chat.isEditing = false;
      });
    },
    saveChat(index) {
      this.chats[index].isEditing = false;
    },
    deleteChat(index) {
      this.chats.splice(index, 1);
    }
  }
};
</script>

<style scoped>
/* Sidebar izquierdo */
.sidebar {
  width: 250px;
  background-color: var(--color-secondary);
  padding: 2rem 1rem;
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
  right: -40px;
  width: 40px;
  height: 40px;
  background-color: var(--color-primary);
  color: var(--color-light-secondary);
  border: none;
  cursor: pointer;
  border-radius: 0 10px 10px 0;
  transition: background-color 0.3s ease, transform 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
}

.toggle-btn:hover {
  background-color: var(--color-dark-secondary);
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

/* Items de chat */
.chat-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--color-background);
  color: var(--color-light-secondary);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  margin: 10px 0;
  transition: background-color 0.3s ease;
}

.chat-item:hover {
  background-color: var(--color-primary);
}

/* Input para editar el nombre del chat */
.chat-input {
  width: 70%;
  padding: 4px;
  font-size: 1rem;
  border: 1px solid var(--color-dark-secondary);
  border-radius: 4px;
  outline: none;
}

/* Botones de acción */
.chat-actions {
  display: flex;
  gap: 5px;
}

.edit-btn,
.delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  transition: transform 0.2s ease;
}

.edit-btn:hover,
.delete-btn:hover  {
  transform: scale(1.3);
}
/* Botón "Nuevo Chat" */
.sidebar .first-item button {
  background-color: var(--color-primary);
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
  background-color: var(--color-dark-secondary);
}

/* Responsive */
@media (min-width: 768px) {
  .sidebar {
    width: 20vw;
  }
}
</style>
