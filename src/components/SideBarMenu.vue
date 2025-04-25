<template>
  <div>
    <aside :class="['right-sidebar', { open: isOpen }]">
      <!-- Botón para abrir/cerrar -->
      <button class="toggle-btn" @click="toggleSidebar">
        <font-awesome-icon :icon="isOpen ? 'chevron-right' : 'chevron-left'" />
      </button>

      <!-- Logo y nombre de la aplicación -->
      <div class="sidebar-header">
        <img :src="profileImage" alt="AsesoriaBot" class="sidebar-logo" />
        <h3>AsesoriaBot</h3>
      </div>

      <!-- Navegación principal -->
      <nav class="sidebar-nav">
        <router-link to="/contact" class="nav-item highlight">
          <font-awesome-icon icon="plus" />
          <span>Cotiza Ahora!</span>
        </router-link>
        <router-link to="/register" class="nav-item">
          <font-awesome-icon icon="user" />
          <span>Registrarse</span>
        </router-link>
        <router-link to="/login" class="nav-item">
          <font-awesome-icon icon="user" />
          <span>Iniciar Sesión</span>
        </router-link>
      </nav>

      <!-- Línea separadora -->
      <div class="separator"></div>

      <!-- Enlaces adicionales -->
      <div class="sidebar-footer">
        <router-link to="/about" class="footer-item">
          <font-awesome-icon icon="chart-bar" />
          <span>Sobre Nosotros</span>
        </router-link>
        <a href="https://github.com/JoseManuelOberreuter/AsesoriaBot" 
           target="_blank" 
           rel="noopener noreferrer" 
           class="footer-item">
          <font-awesome-icon icon="paperclip" />
          <span>Documentación</span>
        </a>
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
      isOpen: true,
      profileImage: ProfileImage
    };
  },
  mounted() {
    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkScreenSize);
  },
  methods: {
    toggleSidebar() {
      this.isOpen = !this.isOpen;
    },
    checkScreenSize() {
      if (window.innerWidth < 768) {
        this.isOpen = false;
      }
    }
  }
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
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;
}

.sidebar-header h3 {
  font-size: 1.4rem;
  font-weight: 600;
  margin: 0;
  letter-spacing: 0.5px;
  color: var(--color-light-secondary);
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
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
  transform: translateY(-2px);
}

.nav-item.highlight {
  background: var(--color-dark-secondary);
  color: var(--color-light-secondary);
  font-weight: bold;
}

.nav-item.highlight:hover {
  background: var(--color-primary);
  transform: translateY(-2px);
}

.router-link-active.nav-item:not(.highlight) {
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
  gap: 0.8rem;
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
  transform: translateY(-2px);
}

.footer-item svg {
  margin-right: 10px;
  font-size: 1rem;
}

@media (min-width: 768px) {
  .right-sidebar {
    width: 300px;
  }
}
</style>
