import axios from '@/api/axios';
import { defineStore } from 'pinia';
import { useUserStore } from './userStore';

export const useDocumentStore = defineStore('document', {
  state: () => ({
    documents: [],
  }),
  actions: {
    async fetchDocuments(botId) {
      const userStore = useUserStore();
      try {
        const response = await axios.get(`/documents/${botId}`, {
          headers: {
            Authorization: `Bearer ${userStore.token}`,
          },
        });
        this.documents = response.data;
      } catch (error) {
        console.error("❌ Error al cargar documentos:", error);
      }
    },
    clearDocuments() {
      this.documents = [];
    }
  }
});
