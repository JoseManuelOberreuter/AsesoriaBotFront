<template>
  <div class="container-form">
    <form @submit.prevent="submitLogin" class="form-card">
      <div class="form-header">
        <font-awesome-icon icon="user" class="form-icon" />
        <h2 class="title">Iniciar Sesión</h2>
      </div>

      <!-- Correo -->
      <div class="form-group">
        <label for="email">
          <font-awesome-icon icon="envelope" class="input-icon" />
          Correo Electrónico
        </label>
        <input 
          v-model="formData.email"
          type="email"
          id="email"
          placeholder="Ingresa tu correo"
          required
        />
      </div>

      <!-- Contraseña -->
      <div class="form-group">
        <label for="password">
          <font-awesome-icon icon="lock" class="input-icon" />
          Contraseña
        </label>
        <div class="password-input-container">
          <input 
            v-model="formData.password"
            :type="showPassword ? 'text' : 'password'"
            id="password"
            placeholder="Ingresa tu contraseña"
            required
          />
          <div class="show-password-toggle" @click="togglePasswordVisibility">
            <font-awesome-icon :icon="showPassword ? 'eye-slash' : 'eye'" class="password-toggle-icon" :class="{ 'visible': showPassword }" />
          </div>
        </div>
      </div>

      <!-- Mensaje de error -->
      <p v-if="errorMessage" class="error-message">
        <font-awesome-icon icon="exclamation-triangle" />
        {{ errorMessage }}
      </p>

      <!-- Botón de Envío con Spinner -->
      <button type="submit" :disabled="loading" class="submit-btn">
        <span v-if="loading">
          <font-awesome-icon icon="circle-notch" spin />
          Verificando...
        </span>
        <span v-else>
          <font-awesome-icon icon="sign-in-alt" />
          Ingresar
        </span>
      </button>

      <!-- Mensaje para registrarte -->
      <div class="form-footer">
        <div class="action-link">
          <p>¿No tienes cuenta?</p>
          <router-link to="/register" class="link">
            <font-awesome-icon icon="user-plus" />
            Registrate
          </router-link>
        </div>
        
        <!-- Mensaje para recuperar contraseña -->
        <div class="action-link">
          <p>¿Olvidaste tu contraseña?</p>
          <router-link to="/forgotpassword" class="link">
            <font-awesome-icon icon="key" />
            Recuperar
          </router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from '@/api/axios';
import { useRouter } from "vue-router";
import { useUserStore } from '../store/userStore'; // Importar el store de Pinia

export default {
  data() {
    return {
      formData: {
        email: "",
        password: "",
      },
      loading: false,
      errorMessage: "",
      showPassword: false,
    };
  },
  setup() {
    const router = useRouter();
    const userStore = useUserStore(); // Obtener el store de Pinia
    return { router, userStore };
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    async submitLogin() {
      this.loading = true;
      this.errorMessage = "";

      try {
        // Cambiar URL al servidor real
        const response = await axios.post("/users/login", this.formData);

        // Guardar el token y los datos del usuario en Pinia
        this.userStore.setToken(response.data.token);
        
        // Redirigir al dashboard
        this.router.push("/dashboard");
      } catch (error) {
        console.error("Error en el login:", error.response?.data);
        this.errorMessage = error.response?.data?.error || "Error al iniciar sesión.";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
  
<style scoped>
/* Contenedor principal */
.container-form {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: var(--color-background);
  padding: 20px;
}

/* Tarjeta del formulario */
.form-card {
  background: var(--color-light-secondary);
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 420px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.form-card:hover {
  transform: translateY(-5px);
}

/* Encabezado del formulario */
.form-header {
  background: var(--color-primary);
  color: var(--color-light-secondary);
  padding: 20px;
  text-align: center;
  border-radius: 16px 16px 0 0;
  position: relative;
}

.form-icon {
  font-size: 32px;
  margin-bottom: 8px;
  color: var(--color-light-secondary);
}

.title {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

/* Estilos de grupo de formulario */
.form-group {
  padding: 12px 30px;
  position: relative;
}

.password-input-container {
  position: relative;
  width: 100%;
}

.show-password-toggle {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: var(--color-dark-secondary);
  opacity: 0.7;
  transition: all 0.2s ease;
}

.show-password-toggle:hover {
  opacity: 1;
}

.password-toggle-icon {
  font-size: 18px;
}

.password-toggle-icon.visible {
  color: var(--color-primary);
}

.form-group:last-of-type {
  padding-bottom: 5px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: var(--color-primary);
  font-weight: 600;
  font-size: 14px;
  display: flex;
  align-items: center;
}

.input-icon {
  margin-right: 8px;
  color: var(--color-dark-secondary);
}

.form-group input {
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 15px;
  color: #333;
  background: white;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.form-group input:focus {
  border-color: var(--color-dark-secondary);
  box-shadow: 0 0 0 3px rgba(136, 158, 115, 0.2);
  outline: none;
}

/* Mensaje de error */
.error-message {
  color: #e74c3c;
  font-size: 14px;
  font-weight: 500;
  margin: 0 30px;
  padding: 10px;
  background: rgba(231, 76, 60, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Botón de envío */
.submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: calc(100% - 60px);
  margin: 10px 30px;
  padding: 12px;
  background: var(--color-dark-secondary);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-btn:hover, .submit-btn:focus {
  background: var(--color-primary);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

/* Footer del formulario */
.form-footer {
  padding: 0 30px 15px;
}

.action-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
  font-size: 14px;
}

.action-link p {
  color: #666;
  margin: 0;
}

.link {
  color: var(--color-primary);
  font-weight: 600;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: color 0.3s ease;
}

.link:hover {
  color: var(--color-dark-secondary);
  text-decoration: underline;
}

/* Animación para el botón */
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.submit-btn:hover {
  animation: pulse 1.5s infinite;
}
</style>
  