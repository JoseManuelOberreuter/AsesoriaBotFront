<template>
  <div>
    <aside :class="['sidebar', { open: isOpen }]">
      <button class="toggle-btn" @click="toggleSidebar">
        <font-awesome-icon :icon="isOpen ? 'chevron-left' : 'chevron-right'" />
      </button>

      <!-- Encabezado del sidebar -->
      <div class="sidebar-header">
        <font-awesome-icon icon="comment" class="sidebar-logo" />
        <h3>Conversaciones</h3>
      </div>

      <!-- Botón de nuevo chat -->
      <button @click="addChat" class="new-chat-btn">
        <font-awesome-icon icon="plus" />
        <span>Nuevo Chat</span>
      </button>

      <!-- Lista de chats con scroll -->
      <div class="chat-container">
        <nav>
          <ul class="chat-list">
            <li v-for="(chat, index) in chats" :key="index" class="chat-item">
              <span v-if="!chat.isEditing" @click="editChat(index)" class="chat-name">
                <font-awesome-icon icon="comment" class="chat-icon" />
                {{ chat.name }}
              </span>
              <input 
                v-else 
                v-model="chat.name" 
                @blur="saveChat(index)" 
                @keyup.enter="saveChat(index)" 
                class="chat-input"
                autofocus
              />
              <div class="chat-actions">
                <button class="edit-btn" @click="editChat(index)">
                  <font-awesome-icon icon="edit" />
                </button>
                <button class="delete-btn" @click="deleteChat(index)">
                  <font-awesome-icon icon="chevron-left" class="delete-icon" />
                </button>
              </div>
            </li>
          </ul>
        </nav>
      </div>
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
.sidebar {
  width: 280px;
  background: var(--color-secondary);
  padding: 1.5rem 1rem;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  transition: transform 0.3s ease;
  transform: translateX(-100%);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  color: var(--color-light-secondary);
  box-shadow: 5px 0 15px rgba(0, 0, 0, 0.1);
}

.sidebar.open {
  transform: translateX(0);
}

.toggle-btn {
  position: absolute;
  top: 50%;
  right: -42px;
  width: 42px;
  height: 42px;
  background: var(--color-primary);
  color: var(--color-light-secondary);
  border: none;
  cursor: pointer;
  z-index: 1100;
  border-radius: 0 8px 8px 0;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 3px 0 10px rgba(0, 0, 0, 0.1);
}

.toggle-btn:hover {
  background: var(--color-dark-secondary);
  transform: translateX(5px);
}

.sidebar-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-light-secondary);
}

.sidebar-logo {
  font-size: 1.8rem;
  margin-right: 10px;
  color: var(--color-primary);
}

.sidebar-header h3 {
  font-size: 1.4rem;
  font-weight: 600;
  margin: 0;
  letter-spacing: 0.5px;
  color: var(--color-light-secondary);
}

.new-chat-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: var(--color-dark-secondary);
  color: var(--color-light-secondary);
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
}

.new-chat-btn:hover {
  background: var(--color-primary);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.chat-container {
  flex-grow: 1;
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
}

.chat-container::-webkit-scrollbar-thumb:hover {
  background: var(--color-dark-secondary);
}

.chat-container::-webkit-scrollbar-track {
  background: transparent;
}

.chat-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.chat-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--color-background);
  padding: 0.75rem 1rem;
  border-radius: 8px;
  margin-bottom: 0.75rem;
  transition: all 0.3s ease;
}

.chat-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.chat-name {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-weight: 500;
  color: var(--color-dark-secondary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 160px;
}

.chat-icon {
  color: var(--color-primary);
  font-size: 0.9rem;
}

.chat-input {
  background: var(--color-light-secondary);
  border: 1px solid var(--color-primary);
  padding: 0.5rem;
  border-radius: 4px;
  color: var(--color-dark-secondary);
  font-size: 0.9rem;
  width: 70%;
  outline: none;
}

.chat-actions {
  display: flex;
  gap: 8px;
}

.edit-btn,
.delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-primary);
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 4px;
}

.edit-btn:hover,
.delete-btn:hover {
  background: rgba(0, 0, 0, 0.05);
  transform: scale(1.1);
}

.delete-btn:hover {
  color: #ff6b6b;
}

.delete-icon {
  transform: rotate(180deg);
}

@media (min-width: 768px) {
  .sidebar {
    width: 300px;
  }
}
</style>
