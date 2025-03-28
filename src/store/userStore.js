import { defineStore } from 'pinia';
import axios from '@/api/axios';

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem("token") || null, // Cargar el token desde localStorage
    userData: null,
  }),
  actions: {
    setToken(token) {
      this.token = token;
      localStorage.setItem("token", token); // Guardar el token en localStorage
    },
    setUserData(userData) {
      this.userData = userData;
    },
    clearUserData() {
      this.token = null;
      this.userData = null;
      localStorage.removeItem("token"); // Eliminar el token de localStorage
    },
    async fetchUserData() {
      if (this.token) {
        try {
          const response = await axios.get("/users/user-data", {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          });
          this.setUserData(response.data); // Guardar los datos del usuario
          console.log("Datos del usuario cargados:", response.data);
        } catch (error) {
          console.error("Error al cargar los datos del usuario:", error);
          this.clearUserData(); // Limpiar los datos si hay un error
        }
      }
    },
  },
});