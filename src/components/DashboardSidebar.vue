<template>
  <div>
    <aside :class="['right-sidebar', { open: isOpen }]">
      <!-- Botón para abrir/cerrar -->
      <button class="toggle-btn" @click="toggleSidebar">
        <font-awesome-icon :icon="isOpen ? 'chevron-right' : 'chevron-left'" />
      </button>

      <!-- Sección del perfil -->
      <router-link  to="/dashboard" class="profile">
        <span class="profile-name">Hola {{ userData ? userData.name : 'AsesoriaBot' }}!</span>
      </router-link>

      <!-- Botones superiores -->
      <div class="top-buttons">
        <router-link to="/profile" class="contact-btn">Perfil</router-link>
        <router-link to="/config" class="contact-btn">Configuracion</router-link>
        <router-link to="/contact" class="contact-btn">Ayuda</router-link>
        <router-link to="/register" class="contact-btn">Cerrar session</router-link>
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
    ...mapState(useUserStore, ['userData']), // Mapear userData desde el store
  },
  async mounted() {
    const userStore = useUserStore();
    if (!this.userData && userStore.token) {
      await userStore.fetchUserData(); // Cargar los datos del usuario si no están disponibles
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
/* 📌 Sidebar derecho */
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

/* 📌 Botón dentro del sidebar */
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

/* 📌 Perfil */
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

/* 📌 Botones superiores */
.top-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 1rem;
}

.contact-btn {
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

/* 📌 Ajuste de ancho en pantallas más grandes */
@media (min-width: 768px) {
  .right-sidebar {
    width: 20vw;
  }
}
</style>
