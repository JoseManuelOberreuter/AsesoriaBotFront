<template>
  <div>
    <aside :class="['right-sidebar', { open: isOpen }]">
      <!-- Botón para abrir/cerrar -->
      <button class="toggle-btn" @click="toggleSidebar">
        {{ isOpen ? '❯' : '❮' }}
      </button>

      <!-- Sección del perfil -->
      <router-link class="profile">
        <img :src="profileImage" alt="Usuario" class="profile-avatar" />
        <span class="profile-name">AsesoriaBot</span>
      </router-link>

      <!-- Botones superiores -->
      <div class="top-buttons">
        <router-link to="/contact" class="contact-btn">🔥 Cotiza Ahora!</router-link>
        <router-link to="/register" class="contact-btn">Registrate</router-link>
        <router-link to="/about" class="about-btn">📘 Sobre Nosotros</router-link>
        <a href="https://github.com/JoseManuelOberreuter/AsesoriaBot" target="_blank" rel="noopener noreferrer" class="docs-btn">📄 Documentación</a>
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
      isOpen: true, // Inicia oculto por defecto
      profileImage: ProfileImage
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
  justify-content: start;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
}

.right-sidebar.open {
  transform: translateX(0);
}

/* Botón dentro del sidebar */
.toggle-btn {
  position: absolute;
  top: 45%;
  left: -40px;
  width: 40px;
  height: 40px;
  background-color: var(--color-primary);
  color: var(--color-light-secondary);
  border: none;
  cursor: pointer;
  z-index: 1100;
  border-radius: 10px 0 0 10px;
  transition: background-color 0.3s ease, transform 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: -2px 2px 5px rgba(0, 0, 0, 0.2);
}

.toggle-btn:hover {
  background-color: var(--color-dark-secondary);
  transform: scale(1.1);
}

/* Perfil */
.profile {
  display: flex;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-dark-secondary);
  text-decoration: none;
}

.profile-avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin-right: 10px;
  transition: 0.5s;
}

.profile-avatar:hover {
  transform: scale(1.3);
}

.profile-name {
  font-size: 1.1rem;
  font-weight: bold;
  color: var(--color-light-secondary);
}

/* Botones superiores */
.top-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 1rem;
}

.contact-btn{
  background-color: var(--color-dark-secondary);
  color: var(--color-light-secondary);
  border: none;
  padding: 0.6rem;
  cursor: pointer;
  border-radius: 8px;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  text-align: center;
  text-decoration: none;
}

.about-btn,
.docs-btn {
  background-color: var(--color-primary);
  color: var(--color-light-secondary);
  border: none;
  padding: 0.6rem;
  cursor: pointer;
  border-radius: 8px;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  text-align: center;
  text-decoration: none;
}

.contact-btn:hover,
.about-btn:hover,
.docs-btn:hover {
  background-color: var(--color-background);
  color: var(--color-primary);
}

/* Ajuste de ancho en pantallas más grandes */
@media (min-width: 768px) {
  .right-sidebar {
    width: 20vw;
  }
}
</style>
