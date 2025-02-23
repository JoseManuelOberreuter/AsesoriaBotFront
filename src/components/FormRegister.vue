<template>
  <div class="container-form">
    <!-- 📌 Si el usuario ya se registró, mostramos el mensaje de confirmación -->
    <div v-if="registrationSuccess" class="confirmation-card">
      <h2>¡Gracias por registrarte con nosotros! 🎉</h2>
      <p>Te hemos enviado un correo con un enlace para confirmar tu cuenta.</p>
      <p>Si ya la confirmaste, puedes iniciar sesión aquí:</p>
      <button @click="goToLogin" class="login-btn">Iniciar Sesión</button>
    </div>

    <!-- 📌 Formulario de registro (se oculta después de registrarse) -->
    <form v-else @submit.prevent="submitForm" class="glassmorphism">
      <h2 class="title">Regístrate</h2>

      <!-- Nombre -->
      <div class="form-group">
        <label>Nombre</label>
        <input 
          v-model="formData.name"
          type="text"
          placeholder="Ingresa tu nombre"
          required
        />
      </div>

      <!-- Correo -->
      <div class="form-group">
        <label>Correo Electrónico</label>
        <input 
          v-model="formData.email"
          type="email"
          placeholder="Ingresa tu correo"
          required
        />
      </div>

      <!-- Contraseña -->
      <div class="form-group">
        <label>Contraseña</label>
        <input 
          v-model="formData.password"
          type="password"
          placeholder="Ingresa tu contraseña"
          required
        />
      </div>

      <!-- Mensaje de error -->
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

      <!-- Botón de Envío con Spinner -->
      <button type="submit" :disabled="loading" class="submit-btn">
        <span v-if="loading">Enviando...</span>
        <span v-else>Registrar</span>
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
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
        const response = await axios.post("http://localhost:4005/users/register", this.formData);
        console.log(response.data.message);

        // 📌 Cambiar a estado de confirmación
        this.registrationSuccess = true;
      } catch (error) {
        console.error("Error en el registro:", error.response?.data);
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
/* 📌 Usando las variables de color */
:root {
  --color-primary: #AD8B73;
  --color-secondary: #CEAB93;
  --color-background: #E3CAA5;
  --color-light-secondary: #FFFBE9;
  --color-dark-secondary: #889E73;
}

/* 📌 Contenedor principal */
.container-form {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: var(--color-background);
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
  text-align: left;
  margin-bottom: 12px;
}

.form-group label {
  display: block;
  color: var(--color-light-secondary);
  font-weight: bold;
}

.form-group input {
  width: 92%;
  padding: 10px;
  margin: 10px 0;
  border: 2px solid var(--color-secondary);
  border-radius: 8px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  outline: none;
  transition: 0.3s;
}

/* 📌 Efecto al enfocar */
.form-group input:focus {
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.4);
}

/* 📌 Mensaje de error */
.error-message {
  color: red;
  font-weight: bold;
  margin-top: 5px;
}

/* 📌 Botón */
.submit-btn {
  width: 100%;
  background-color: var(--color-dark-secondary);
  color: white;
  font-weight: bold;
  padding: 12px;
  margin-top: 10px;
  border-radius: 12px;
  transition: background 0.3s, transform 0.2s;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

/* 📌 Efecto hover */
.submit-btn:hover {
  background-color: var(--color-secondary);
  transform: scale(1.05);
}

/* 📌 Estilo para la carta de confirmación */
.confirmation-card {
  background: var(--color-light-secondary);
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  width: 90%;
}

.confirmation-card h2 {
  font-size: 20px;
  color: var(--color-primary);
  margin-bottom: 10px;
}

.confirmation-card p {
  font-size: 16px;
  color: var(--color-dark-secondary);
  margin-bottom: 15px;
}

/* 📌 Botón de inicio de sesión */
.login-btn {
  background: var(--color-primary);
  color: white;
  font-weight: bold;
  padding: 10px 15px;
  border-radius: 8px;
  transition: background 0.3s, transform 0.2s;
  border: none;
  cursor: pointer;
}

.login-btn:hover {
  background: var(--color-secondary);
  transform: scale(1.05);
}
</style>
