<template>
  <div>
    <aside :class="['right-sidebar', { open: isOpen }]">
      <!-- Botón para abrir/cerrar -->
      <button class="toggle-btn" @click="toggleSidebar">
        <font-awesome-icon :icon="isOpen ? 'chevron-right' : 'chevron-left'" />
      </button>

      <!-- Logo y nombre de la aplicación -->
      <div class="sidebar-header">
        <font-awesome-icon icon="robot" class="sidebar-logo" />
        <h3>AsesoriaBot</h3>
      </div>

      <!-- Sección del perfil -->
      <router-link to="/dashboard" class="profile">
        <div class="profile-circle">
          <font-awesome-icon icon="user" />
        </div>
        <div class="profile-info">
          <span class="profile-name">{{ userData ? userData.name : 'Usuario' }}</span>
          <span class="profile-role">Administrador</span>
        </div>
      </router-link>

      <!-- Navegación principal -->
      <nav class="sidebar-nav">
        <router-link to="/dashboard" class="nav-item">
          <font-awesome-icon icon="chart-bar" />
          <span>Dashboard</span>
        </router-link>
        <router-link to="/createbot" class="nav-item">
          <font-awesome-icon icon="plus" />
          <span>Crear Bot</span>
        </router-link>
        <router-link to="/uploaddocument" class="nav-item">
          <font-awesome-icon icon="paperclip" />
          <span>Documentos</span>
        </router-link>
        <router-link to="/chats" class="nav-item">
          <font-awesome-icon icon="comment" />
          <span>Conversaciones</span>
        </router-link>
      </nav>

      <!-- Línea separadora -->
      <div class="separator"></div>

      <!-- Configuración y soporte -->
      <div class="sidebar-footer">
        <router-link to="/profile" class="footer-item">
          <font-awesome-icon icon="user" />
          <span>Mi Perfil</span>
        </router-link>
        <router-link to="/config" class="footer-item">
          <font-awesome-icon icon="cog" />
          <span>Configuración</span>
        </router-link>
        <router-link to="/contact" class="footer-item">
          <font-awesome-icon icon="comment" />
          <span>Soporte</span>
        </router-link>
        <router-link to="/register" class="footer-item logout">
          <font-awesome-icon icon="chevron-left" />
          <span>Cerrar sesión</span>
        </router-link>
      </div>
    </aside>
  </div>
</template>

<script>
import { useUserStore } from '../store/userStore';
import { mapState } from 'pinia';

export default {
  name: 'RightSidebar',
  data() {
    return {
      isOpen: true,
    };
  },
  computed: {
    ...mapState(useUserStore, ['userData']),
  },
  async mounted() {
    const userStore = useUserStore();
    if (!this.userData && userStore.token) {
      await userStore.fetchUserData();
    }
  },
  methods: {
    toggleSidebar() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style scoped>
.right-sidebar {
  width: 280px;
  background: var(--color-secondary);
  padding: 1.5rem 1rem;
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  transition: transform 0.3s ease;
  transform: translateX(100%);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  color: var(--color-light-secondary);
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
}

.right-sidebar.open {
  transform: translateX(0);
}

.toggle-btn {
  position: absolute;
  top: 50%;
  left: -42px;
  width: 42px;
  height: 42px;
  background: var(--color-primary);
  color: var(--color-light-secondary);
  border: none;
  cursor: pointer;
  z-index: 1100;
  border-radius: 8px 0 0 8px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: -3px 0 10px rgba(0, 0, 0, 0.1);
}

.toggle-btn:hover {
  background: var(--color-dark-secondary);
  transform: translateX(-5px);
}

.sidebar-header {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
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

.profile {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  margin-bottom: 1.5rem;
  text-decoration: none;
  background: var(--color-background);
  border-radius: 10px;
  transition: all 0.3s ease;
}

.profile:hover {
  background: var(--color-light-secondary);
  color: var(--color-primary);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

.profile-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--color-dark-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  font-size: 1.2rem;
  color: var(--color-light-secondary);
}

.profile-info {
  display: flex;
  flex-direction: column;
}

.profile-name {
  font-weight: 600;
  font-size: 1rem;
  color: var(--color-dark-secondary);
}

.profile-role {
  font-size: 0.8rem;
  color: var(--color-primary);
  margin-top: 2px;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  text-decoration: none;
  color: var(--color-light-secondary);
  border-radius: 8px;
  transition: all 0.2s ease;
}

.nav-item:hover {
  background: var(--color-background);
  color: var(--color-dark-secondary);
}

.router-link-active.nav-item {
  background: var(--color-primary);
  color: var(--color-light-secondary);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.nav-item svg {
  margin-right: 10px;
  font-size: 1.1rem;
}

.separator {
  height: 1px;
  background: var(--color-light-secondary);
  margin: 0.5rem 0 1.5rem 0;
  opacity: 0.5;
}

.sidebar-footer {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-item {
  display: flex;
  align-items: center;
  padding: 0.6rem 1rem;
  text-decoration: none;
  color: var(--color-light-secondary);
  border-radius: 8px;
  transition: all 0.2s ease;
  font-size: 0.9rem;
}

.footer-item:hover {
  background: var(--color-background);
  color: var(--color-dark-secondary);
}

.footer-item svg {
  margin-right: 10px;
  font-size: 1rem;
}

.logout {
  margin-top: 0.5rem;
  color: #ff6b6b;
}

.logout:hover {
  background: rgba(255, 107, 107, 0.1);
  color: #ff6b6b;
}

@media (min-width: 768px) {
  .right-sidebar {
    width: 300px;
  }
}
</style>
