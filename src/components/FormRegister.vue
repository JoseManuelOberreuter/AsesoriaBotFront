<template>
  <div class="container-form">
    <!-- 📌 Si el usuario ya se registró, mostramos el mensaje de confirmación -->
    <div v-if="registrationSuccess" class="confirmation-card">
      <div class="confirmation-header">
        <font-awesome-icon icon="check-circle" class="success-icon" />
        <h2>¡Registro Exitoso!</h2>
      </div>
      <div class="confirmation-body">
        <p>Te hemos enviado un correo con un enlace para confirmar tu cuenta.</p>
        <p>Si ya la confirmaste, puedes iniciar sesión aquí:</p>
        <button @click="goToLogin" class="login-btn">
          <font-awesome-icon icon="sign-in-alt" />
          Iniciar Sesión
        </button>
      </div>
    </div>

    <!-- 📌 Formulario de registro (se oculta después de registrarse) -->
    <form v-else @submit.prevent="submitForm" class="form-card">
      <div class="form-header">
        <font-awesome-icon icon="user-plus" class="form-icon" />
        <h2 class="title">Regístrate</h2>
      </div>

      <!-- Nombre -->
      <div class="form-group">
        <label for="name">
          <font-awesome-icon icon="user" class="input-icon" />
          Nombre
        </label>
        <input 
          v-model="formData.name"
          type="text"
          id="name"
          placeholder="Ingresa tu nombre"
          required
        />
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
        <input 
          v-model="formData.password"
          type="password"
          id="password"
          placeholder="Ingresa tu contraseña"
          required
        />
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
          Enviando...
        </span>
        <span v-else>
          <font-awesome-icon icon="user-plus" />
          Registrar
        </span>
      </button>

      <!-- Link a inicio de sesión -->
      <div class="form-footer">
        <div class="action-link">
          <p>¿Ya tienes cuenta?</p>
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
import { useRouter } from "vue-router";

export default {
  data() {
    return {
      formData: {
        name: "",
        email: "",
        password: "",
      },
      loading: false,
      errorMessage: "",
      registrationSuccess: false, // 📌 Controla si el usuario se registró exitosamente
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    async submitForm() {
      this.loading = true;
      this.errorMessage = "";

      try {
        console.log("📌 Enviando datos al backend:", this.formData); // Log para verificar

        const response = await axios.post("/users/register", this.formData);
        console.log("✅ Respuesta del backend:", response.data.message);

        // Mostrar mensaje de éxito
        this.registrationSuccess = true;
      } catch (error) {
        console.error("❌ Error en el registro:", error.response);
        this.errorMessage = error.response?.data?.error || "Error al registrar usuario.";
      } finally {
        this.loading = false;
      }
    },
    goToLogin() {
      this.router.push("/login"); // 📌 Redirige a la vista de inicio de sesión
    },
  },
};
</script>

<style scoped>
/* 📌 Contenedor principal */
.container-form {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: var(--color-background);
  padding: 20px;
}

/* 📌 Estilo Glassmorphism */
.glassmorphism {
  background: var(--color-primary);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 350px;
  text-align: center;
}

/* 📌 Título */
.title {
  font-size: 22px;
  font-weight: bold;
  color: var(--color-light-secondary);
  margin-bottom: 15px;
}

/* 📌 Estilos de Input */
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

.form-group input {
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 15px;
  color: var(--color-dark-secondary);
  background: var(--color-light-secondary);
  transition: all 0.3s ease;
  box-sizing: border-box;
}

/* 📌 Efecto al enfocar */
.form-group input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(0, 112, 112, 0.2);
  outline: none;
}

/* 📌 Mensaje de error */
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

/* Mensaje de no tiene cuenta */
.no-count {
  display: flex;
  text-align: center;
  align-items: center;
  color: var(--color-light-secondary);
  width: 15rem;
  margin: 0 auto;
}
.no-count p {
  margin-right: 10px;
}

/* 📌 Botón */
.submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: calc(100% - 60px);
  margin: 10px 30px;
  padding: 12px;
  background: var(--color-primary);
  color: var(--color-light-secondary);
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-btn:hover, .submit-btn:focus {
  background: var(--color-accent);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

/* 📌 Estilo para la carta de confirmación */
.confirmation-card {
  background: var(--color-light-secondary);
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 420px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.confirmation-card h2 {
  font-size: 20px;
  color: var(--color-primary);
  margin-bottom: 10px;
}

.confirmation-card p {
  font-size: 16px;
  color: var(--color-primary);
  margin-bottom: 15px;
}

/* 📌 Botón de inicio de sesión */
.login-btn {
  background: var(--color-primary);
  color: var(--color-light-secondary);
  font-weight: bold;
  padding: 10px 15px;
  border-radius: 8px;
  transition: background 0.3s, transform 0.2s;
  border: none;
  cursor: pointer;
}

.login-btn:hover {
  background: var(--color-accent);
  transform: scale(1.05);
}

/* 📌 Estilo para la tarjeta del formulario */
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

/* 📌 Encabezado del formulario */
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

/* 📌 Estilos de grupo de formulario */
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
  color: var(--color-primary);
}

.form-group input {
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 15px;
  color: var(--color-dark-secondary);
  background: var(--color-light-secondary);
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.form-group input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(0, 112, 112, 0.2);
  outline: none;
}

/* 📌 Footer del formulario */
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
  color: var(--color-accent);
  text-decoration: underline;
}

/* 📌 Tarjeta de confirmación */
.confirmation-card {
  background: var(--color-light-secondary);
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 420px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.confirmation-header {
  background: var(--color-dark-secondary);
  color: var(--color-light-secondary);
  padding: 20px;
  text-align: center;
  border-radius: 16px 16px 0 0;
}

.success-icon {
  font-size: 50px;
  margin-bottom: 8px;
  color: var(--color-light-secondary);
}

.confirmation-header h2 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
}

.confirmation-body {
  padding: 25px;
  text-align: center;
}

.confirmation-body p {
  margin: 0 0 12px;
  color: #555;
  font-size: 16px;
}

.login-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 15px auto 0;
  padding: 12px 25px;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.login-btn:hover {
  background: var(--color-dark-secondary);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Animación para el botón */
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.submit-btn:hover, .login-btn:hover {
  animation: pulse 1.5s infinite;
}
</style>
