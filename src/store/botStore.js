// src/store/botStore.js
import { defineStore } from 'pinia';
import axios from 'axios';
import { useUserStore } from './userStore';

export const useBotStore = defineStore('bot', {
  state: () => ({
    bots: [],
  }),
  actions: {
    async fetchBots() {
      const userStore = useUserStore();
      try {
        const response = await axios.get("http://localhost:4005/bots/mine", {
          headers: {
            Authorization: `Bearer ${userStore.token}`,
          },
        });
        this.bots = response.data;
      } catch (error) {
        console.error("❌ Error al cargar los bots:", error);
      }
    },
    clearBots() {
      this.bots = [];
    }
  }
});