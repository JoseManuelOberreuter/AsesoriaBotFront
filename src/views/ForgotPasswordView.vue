<template>
    <SideBarMenu />
    <div class="forgot-password-container">
      <form @submit.prevent="sendResetEmail" class="glassmorphism">
        <h2 class="title">Recuperar Contraseña</h2>
        <p class="description">
          Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.
        </p>
  
        <input 
          v-model="email" 
          type="email" 
          placeholder="Tu correo electrónico" 
          required
          class="input-field"
        />
  
        <button type="submit" :disabled="loading" class="submit-btn">
          <span v-if="loading">Enviando...</span>
          <span v-else>Enviar Correo</span>
        </button>
  
        <p v-if="message" :class="['message', messageType]">{{ message }}</p>
      </form>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import SideBarMenu from "@/components/SideBarMenu.vue";
  
  export default {
    data() {
      return {
        email: "",
        message: "",
        messageType: "", // 📌 'success' o 'error' para estilos diferentes
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
            //! Cambiar link
          const response = await axios.post("http://localhost:4005/users/forgot-password", { email: this.email });
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
  /* 📌 Contenedor principal */
  .forgot-password-container {
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
    padding: 30px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    width: 90%;
    max-width: 400px;
    text-align: center;
  }
  
  /* 📌 Título */
  .title {
    font-size: 22px;
    font-weight: bold;
    color: var(--color-light-secondary);
    margin-bottom: 10px;
  }
  
  /* 📌 Descripción */
  .description {
    font-size: 14px;
    color: var(--color-light-secondary);
    width: 70%;
    margin: 20px auto;
  }
  
  /* 📌 Input */
  .input-field {
    width: 92%;
    padding: 12px;
    margin-bottom: 15px;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    background: rgba(255, 255, 255, 0.2);
    color: white;
    outline: none;
    transition: 0.3s;
  }
  
  /* 📌 Efecto al enfocar */
  .input-field::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
  
  .input-field:focus {
    background: rgba(255, 255, 255, 0.3);
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.4);
  }
  
  /* 📌 Botón */
  .submit-btn {
    width: 100%;
    background-color: var(--color-dark-secondary);
    color: white;
    font-weight: bold;
    padding: 12px;
    border-radius: 12px;
    transition: background 0.3s, transform 0.2s;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  }
  
  /* 📌 Efecto hover */
  .submit-btn:hover {
    background-color: var(--color-secondary);
    transform: scale(1.05);
  }
  
  /* 📌 Mensaje de éxito o error */
  .message {
    margin-top: 15px;
    font-weight: bold;
    padding: 10px;
    border-radius: 8px;
  }
  
  .success {
    color: green;
    background: rgba(0, 255, 0, 0.2);
  }
  
  .error {
    color: red;
    background: rgba(255, 0, 0, 0.2);
  }
  </style>
  