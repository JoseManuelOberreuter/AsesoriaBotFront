<template>
    <SideBarMenu />
    <div class="reset-password-container">
      <form v-if="!success" @submit.prevent="resetPassword" class="glassmorphism">
        <h2 class="title">Restablecer Contraseña</h2>
        <p class="description">
          Ingresa tu nueva contraseña y confírmala para actualizarla.
        </p>

        <input 
          v-model="password" 
          type="password" 
          placeholder="Nueva contraseña" 
          required
          class="input-field"
        />

        <input 
          v-model="confirmPassword" 
          type="password" 
          placeholder="Confirma tu contraseña" 
          required
          class="input-field"
        />

        <button type="submit" :disabled="loading" class="submit-btn">
          <span v-if="loading">Actualizando...</span>
          <span v-else>Confirmar Cambio</span>
        </button>

        <p v-if="message" :class="['message', messageType]">{{ message }}</p>
      </form>

      <!-- 📌 Mensaje de éxito con botón a Login -->
      <div v-else class="success-message">
        <h2 class="title">✅ Contraseña Restablecida</h2>
        <p class="description">
          Tu contraseña ha sido actualizada correctamente. Ahora puedes iniciar sesión con tu nueva contraseña.
        </p>
        <router-link to="/login" class="login-btn">Ir a Iniciar Sesión</router-link>
      </div>
    </div>
</template>

<script>
import axios from '@/api/axios';
import { useRoute } from "vue-router";
import SideBarMenu from "../components/SideBarMenu.vue";

export default {
    components: {
        SideBarMenu
    },
    data() {
        return {
            password: "",
            confirmPassword: "",
            message: "",
            messageType: "",
            loading: false,
            success: false, // 📌 Nuevo estado para mostrar mensaje de éxito
            token: ""
        };
    },
    mounted() {
        this.token = useRoute().query.token; // ✅ Obtener correctamente el token desde la URL
    },
    methods: {
        async resetPassword() {
            if (!this.token) {
                this.message = "El enlace de restablecimiento no es válido.";
                this.messageType = "error";
                return;
            }

            if (this.password !== this.confirmPassword) {
                this.message = "Las contraseñas no coinciden.";
                this.messageType = "error";
                return;
            }

            this.loading = true;
            this.message = "";

            try {
                const response = await axios.post(`/users/reset-password/${this.token}`, {
                    password: this.password
                });

                this.message = response.data.message;
                this.messageType = "success";

                // 📌 Cambiar a vista de éxito
                this.success = true;
            } catch (error) {
                this.message = error.response?.data?.error || "Error al actualizar la contraseña.";
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
.reset-password-container {
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

/* 📌 Mensaje de éxito */
.success-message {
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
  margin-bottom: 20px;
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

/* 📌 Botón para ir a iniciar sesión */
.login-btn {
  display: inline-block;
  padding: 12px;
  width: 80%;
  background-color: var(--color-dark-secondary);
  color: white;
  text-align: center;
  font-weight: bold;
  border-radius: 12px;
  text-decoration: none;
  transition: background 0.3s, transform 0.2s;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.login-btn:hover {
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
