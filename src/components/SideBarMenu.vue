<template>
  <div>
    <aside :class="['right-sidebar', { open: isOpen }]">
      <!-- Botón para abrir/cerrar -->
      <button class="toggle-btn" @click="toggleSidebar">
        {{ isOpen ? '❯' : '❮' }}
      </button>

      <!-- Sección del perfil -->
      <div class="profile">
        <img :src="profileImage" alt="Usuario" class="profile-avatar" />
        <span class="profile-name">AsesoriaBot</span>
      </div>

      <!-- Sección de notificaciones -->
      <div class="notifications">
        <h3>Notificaciones</h3>
        <ul>
          <li v-for="(notification, index) in notifications" :key="index">
            {{ notification }}
          </li>
        </ul>
      </div>

      <!-- Botones inferiores -->
      <div class="bottom-buttons">
        <button class="settings-btn">⚙ Configuración</button>
        <button class="docs-btn">📄 Documentación</button>
      </div>
    </aside>
  </div>
</template>

<script>
import '@/styles/index.css';
import ProfileImage from '@/assets/LogoAsesoriaBot.png';

export default {
  name: 'RightSidebar',
  data() {
    return {
      isOpen: false, // Inicia oculto por defecto
      profileImage: ProfileImage,
      notifications: [
        "Nuevo mensaje recibido",
        "Actualización disponible",
        "Revisión de documento completada"
      ]
    };
  },
  methods: {
    toggleSidebar() {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>

<style scoped>
/* Sidebar derecho */
.right-sidebar {
  width: 260px;
  background-color: var(--color-secondary);
  padding: 1rem;
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  transition: transform 0.3s ease;
  transform: translateX(100%);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
}

.right-sidebar.open {
  transform: translateX(0);
}

/* Botón dentro del sidebar */
.toggle-btn {
  position: absolute;
  top: 45%;
  left: -40px; /* Se pega al sidebar */
  width: 40px;
  height: 40px;
  background-color: var(--color-dark-secondary);
  color: var(--color-light-secondary);
  border: none;
  cursor: pointer;
  z-index: 1100;
  border-radius: 10px 0 0 10px; /* Forma redonda pegada */
  transition: background-color 0.3s ease, transform 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: -2px 2px 5px rgba(0, 0, 0, 0.2);
}

.toggle-btn:hover {
  background-color: var(--color-primary);
  transform: scale(1.1);
}

/* Perfil */
.profile {
  display: flex;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-dark-secondary);
}

.profile-avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin-right: 10px;
}

.profile-name {
  font-size: 1.1rem;
  font-weight: bold;
  color: var(--color-light-secondary);
}

/* Notificaciones */
.notifications {
  flex-grow: 1;
  padding: 1rem 0;
  overflow-y: auto;
}

.notifications h3 {
  color: var(--color-light-secondary);
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.notifications ul {
  list-style: none;
  padding: 0;
}

.notifications li {
  background-color: var(--color-light-secondary);
  color: var(--color-primary);
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 5px;
  font-size: 0.9rem;
}

/* Botones inferiores */
.bottom-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.settings-btn,
.docs-btn {
  background-color: var(--color-dark-secondary);
  color: var(--color-light-secondary);
  border: none;
  padding: 0.6rem;
  cursor: pointer;
  border-radius: 8px;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  text-align: center;
}

.settings-btn:hover,
.docs-btn:hover {
  background-color: var(--color-primary);
}

/* Ajuste de ancho en pantallas más grandes */
@media (min-width: 768px) {
  .right-sidebar {
    width: 20vw;
  }
}
</style>
