<template>
  <SideBarMenu />
  <div class="container-form">
    <form @submit.prevent="sendResetEmail" class="form-card">
      <div class="form-header">
        <font-awesome-icon icon="key" class="form-icon" />
        <h2 class="title">Recuperar Contraseña</h2>
      </div>

      <p class="description">
        Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.
      </p>

      <div class="form-group">
        <label for="email">
          <font-awesome-icon icon="envelope" class="input-icon" />
          Correo Electrónico
        </label>
        <input 
          v-model="email" 
          type="email" 
          id="email"
          placeholder="Ingresa tu correo" 
          required
        />
      </div>

      <button type="submit" :disabled="loading" class="submit-btn">
        <span v-if="loading">
          <font-awesome-icon icon="circle-notch" spin />
          Enviando...
        </span>
        <span v-else>
          <font-awesome-icon icon="paper-plane" />
          Enviar Correo
        </span>
      </button>

      <p v-if="message" :class="['message', messageType]">
        <font-awesome-icon :icon="messageType === 'success' ? 'check-circle' : 'exclamation-triangle'" />
        {{ message }}
      </p>

      <div class="form-footer">
        <div class="action-link">
          <p>¿Recordaste tu contraseña?</p>
          <router-link to="/login" class="link">
            <font-awesome-icon icon="sign-in-alt" />
            Iniciar Sesión
          </router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from '@/api/axios';
import SideBarMenu from "@/components/SideBarMenu.vue";

export default {
  data() {
    return {
      email: "",
      message: "",
      messageType: "", // 'success' o 'error' para estilos diferentes
      loading: false
    };
  },
  components: {
    SideBarMenu
  },
  methods: {
    async sendResetEmail() {
      this.loading = true;
      this.message = "";

      try {
        const response = await axios.post("/users/forgot-password", { email: this.email });
        this.message = response.data.message;
        this.messageType = "success";
      } catch (error) {
        this.message = error.response?.data?.error || "Error enviando la solicitud.";
        this.messageType = "error";
      } finally {
        this.loading = false;
      }
    }
  }
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

/* Descripción */
.description {
  padding: 15px 30px 0;
  margin: 0;
  text-align: center;
  color: #666;
  font-size: 15px;
}

/* Estilos de grupo de formulario */
.form-group {
  padding: 12px 30px;
  position: relative;
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

/* Mensaje de éxito o error */
.message {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 15px 30px;
  padding: 10px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
}

.success {
  color: #28a745;
  background: rgba(40, 167, 69, 0.1);
}

.error {
  color: #e74c3c;
  background: rgba(231, 76, 60, 0.1);
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
  