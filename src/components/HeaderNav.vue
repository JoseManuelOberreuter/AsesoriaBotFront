<template>
  <header class="sticky-header">
    <div class="header-container">
      <!-- Logo y nombre -->
      <div class="header-logo">
        <router-link to="/" class="logo-link">
          <img :src="logoImage" alt="AsesorIA" class="logo-img" />
          <span class="logo-text">AsesorIA</span>
        </router-link>
      </div>

      <!-- Navegación principal -->
      <nav class="header-nav">
        <router-link to="/about" class="nav-link">Sobre Nosotros</router-link>
        <a href="https://github.com/JoseManuelOberreuter/AsesoriaBot" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="nav-link">Documentación</a>
      </nav>

      <!-- Botones de acción -->
      <div class="header-actions">
        <router-link to="/login" class="btn btn-outline">Iniciar Sesión</router-link>
        <router-link to="/register" class="btn btn-solid">Registrarse</router-link>
        <router-link to="/contact" class="btn btn-primary">Cotiza Ahora</router-link>
      </div>

      <!-- Botón menú móvil -->
      <button class="mobile-menu-btn" @click="toggleMobileMenu">
        <font-awesome-icon :icon="isMobileMenuOpen ? 'times' : 'bars'" />
      </button>
    </div>

    <!-- Menú móvil -->
    <div class="mobile-menu" :class="{ open: isMobileMenuOpen }">
      <router-link to="/about" class="mobile-nav-link" @click="closeMobileMenu">Sobre Nosotros</router-link>
      <a href="https://github.com/JoseManuelOberreuter/AsesoriaBot" 
         class="mobile-nav-link" 
         target="_blank" 
         rel="noopener noreferrer"
         @click="closeMobileMenu">Documentación</a>
      <router-link to="/login" class="mobile-nav-link" @click="closeMobileMenu">Iniciar Sesión</router-link>
      <router-link to="/register" class="mobile-nav-link" @click="closeMobileMenu">Registrarse</router-link>
      <router-link to="/contact" class="mobile-nav-link highlight" @click="closeMobileMenu">
        <font-awesome-icon icon="plus" />
        Cotiza Ahora
      </router-link>
    </div>
  </header>
</template>

<script>
import '@/styles/index.css';
import LogoImage from '@/assets/LogoAsesoriaBot.png';

export default {
  name: 'HeaderNav',
  data() {
    return {
      logoImage: LogoImage,
      isMobileMenuOpen: false
    };
  },
  methods: {
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    closeMobileMenu() {
      this.isMobileMenuOpen = false;
    },
    handleResize() {
      if (window.innerWidth >= 992 && this.isMobileMenuOpen) {
        this.isMobileMenuOpen = false;
      }
    }
  },
  mounted() {
    // Cerrar menú móvil al cambiar tamaño de pantalla a desktop
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    // Corregido: se debe pasar la misma referencia de función
    window.removeEventListener('resize', this.handleResize);
  }
};
</script>

<style scoped>
.sticky-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(244, 237, 220, 0.98);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  z-index: 1000;
  transition: all 0.3s ease;
  border-bottom: 1px solid rgba(0, 112, 112, 0.2);
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 5%;
  max-width: 1400px;
  margin: 0 auto;
}

.header-logo {
  display: flex;
  align-items: center;
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--color-primary);
  font-weight: 700;
}

.logo-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-primary);
  transition: color 0.2s ease;
}

.logo-link:hover .logo-text {
  color: var(--color-accent);
}

.header-nav {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.2s ease;
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 3px;
  bottom: -6px;
  left: 0;
  background-color: var(--color-primary);
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

.header-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.btn {
  padding: 0.6rem 1.2rem;
  border-radius: 5px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  cursor: pointer;
  display: inline-block;
  text-align: center;
  position: relative;
}

.btn:active {
  transform: scale(0.98);
}

.btn-outline {
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
  background-color: transparent;
}

.btn-outline:hover {
  background-color: var(--color-primary);
  color: var(--color-light-secondary);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.btn-solid {
  background-color: var(--color-secondary);
  color: var(--color-light-secondary);
  border: 1px solid var(--color-secondary);
}

.btn-solid:hover {
  background-color: var(--color-accent);
  border-color: var(--color-accent);
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.btn-primary {
  background-color: var(--color-primary);
  color: var(--color-light-secondary);
  padding: 0.6rem 1.4rem;
  border: 1px solid var(--color-primary);
}

.btn-primary:hover {
  background-color: var(--color-accent);
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.router-link-active.btn-outline {
  background-color: var(--color-primary);
  color: var(--color-light-secondary);
}

.router-link-active.btn-solid,
.router-link-active.btn-primary {
  background-color: var(--color-accent);
  border-color: var(--color-accent);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--color-primary);
  cursor: pointer;
}

.mobile-menu {
  display: none;
  position: fixed;
  top: 77px;
  left: 0;
  right: 0;
  background-color: rgba(244, 237, 220, 0.98);
  backdrop-filter: blur(10px);
  padding: 1rem;
  flex-direction: column;
  gap: 0.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transform: translateY(-100%);
  opacity: 0;
  transition: all 0.3s ease;
  z-index: 999;
  border-bottom: 1px solid rgba(0, 112, 112, 0.2);
}

.mobile-menu.open {
  transform: translateY(0);
  opacity: 1;
}

.mobile-nav-link {
  padding: 0.8rem 1rem;
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 600;
  border-radius: 5px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.mobile-nav-link:hover {
  background-color: var(--color-neutral);
}

.mobile-nav-link.highlight {
  background-color: var(--color-primary);
  color: var(--color-light-secondary);
  font-weight: 600;
}

.mobile-nav-link.highlight:hover {
  background-color: var(--color-accent);
}

.router-link-active.mobile-nav-link:not(.highlight) {
  background-color: var(--color-neutral);
  color: var(--color-primary);
  font-weight: 700;
}

@media (max-width: 991px) {
  .header-nav {
    display: none;
  }
  
  .header-actions {
    display: none;
  }
  
  .mobile-menu-btn {
    display: block;
  }
  
  .mobile-menu {
    display: flex;
  }
}

@media (max-width: 480px) {
  .logo-text {
    font-size: 1.2rem;
  }
  
  .logo-img {
    width: 35px;
    height: 35px;
  }
  
  .header-container {
    padding: 0.7rem 4%;
  }
}
</style> 