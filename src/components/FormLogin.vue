<template>
  <div class="container-form">
    <form @submit.prevent="submitLogin" class="glassmorphism">
      <h2 class="title">Iniciar Sesión</h2>

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

      <!-- Mensaje para registrarte -->
      <div class="no-count">
        <p>No tienes cuenta?</p>
        <router-link to="/register">Registrate</router-link>
      </div>
      
      <!-- Mensaje para recuperar contraseña -->
      <div class="no-count">
        <p>Olvidaste tu contraseña?</p>
        <router-link to="/forgotpassword">Recuperar</router-link>
      </div>

      <!-- Botón de Envío con Spinner -->
      <button type="submit" :disabled="loading" class="submit-btn">
        <span v-if="loading">Verificando...</span>
        <span v-else>Ingresar</span>
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
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
    };
  },
  setup() {
    const router = useRouter();
    const userStore = useUserStore(); // Obtener el store de Pinia
    return { router, userStore };
  },
  methods: {
    async submitLogin() {
      this.loading = true;
      this.errorMessage = "";

      try {
        // Cambiar URL al servidor real
        const response = await axios.post("http://localhost:4005/users/login", this.formData);

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

  /* Mensaje de no tiene cuenta */
  .no-count {
    display: flex;
    justify-content: center; /* Centra horizontalmente */
    align-items: center; /* Centra verticalmente */
    text-align: center;
    color: var(--color-light-secondary);
    width: 100%;
    margin: 0px auto; 
    gap: 5px; 
  }

  .no-count p{
    margin: 5px;
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
  </style>
  