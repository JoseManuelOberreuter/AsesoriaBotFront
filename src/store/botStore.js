import axios from '@/api/axios';
import { defineStore } from 'pinia';
import { useUserStore } from './userStore';

export const useBotStore = defineStore('bot', {
  state: () => ({
    bots: [],
  }),
  actions: {
    async fetchBots() {
      const userStore = useUserStore();
      try {
        const response = await axios.get("/bots/mine", {
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