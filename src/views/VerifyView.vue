<template>
  <div class="verification-container">
    <div class="verification-card">
      <h2 class="fade-in" v-if="verificationStatus === 'loading'">
        🔄 Verificando cuenta...
      </h2>
      <h2 class="success fade-in" v-else-if="verificationStatus === 'success'">
        🎉 ¡Cuenta verificada con éxito!
      </h2>
      <h2 class="error fade-in" v-else>
        ❌ Error verificando tu cuenta
      </h2>

      <p v-if="verificationStatus === 'success'" class="fade-in">
        Ya puedes iniciar sesión:
      </p>
      <router-link 
        v-if="verificationStatus === 'success'" 
        to="/login" 
        class="login-btn fade-in"
      >
        Iniciar Sesión
      </router-link>
    </div>
  </div>
</template>
  
<script>
import axios from '@/api/axios';
import { useRoute } from "vue-router";

export default {
  data() {
    return {
      verificationStatus: "loading",
    };
  },
  async created() {
    const route = useRoute();
    const token = route.query.token; // Captura el token desde la URL

    if (!token) {
      this.verificationStatus = "error";
      return;
    }

    try {
      const response = await axios.get(`/users/verify/${token}`);
      console.log("✅ Respuesta del backend:", response.data.message);
      this.verificationStatus = "success";
    } catch (error) {
      console.error("❌ Error en la verificación:", error.response?.data);
      this.verificationStatus = "error";
    }
  }
};
</script>
  
<style scoped>
  /* 🎨 Centrar el contenido en pantalla */
  .verification-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  /* 📌 Tarjeta con efecto Glassmorphism */
  .verification-card {
    background: var(--color-primary);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    padding: 40px;
    text-align: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    width: 90%;
    max-width: 400px;
    color: white;
    animation: fadeIn 1s ease-in-out;
  }
  
  /* ✅ Estilos para mensajes */
  .success {
    color: var(--color-ligth-secondary);
  }
  .error {
    color: #FF5252;
  }
  
  /* 🔄 Animaciones */
  .fade-in {
    opacity: 0;
    animation: fadeIn 1s ease-in forwards;
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* 🎨 Estilos del botón */
  .login-btn {
    display: inline-block;
    padding: 12px 25px;
    background-color: var(--color-dark-secondary);
    color: white;
    border-radius: 8px;
    text-decoration: none;
    font-weight: bold;
    transition: all 0.3s ease-in-out;
    margin-top: 15px;
  }
  
  .login-btn:hover {
    background-color: #45A049;
    transform: scale(1.05);
  }
</style>