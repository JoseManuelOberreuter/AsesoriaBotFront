// src/store/documentStore.js
import { defineStore } from 'pinia';
import axios from 'axios';
import { useUserStore } from './userStore';

export const useDocumentStore = defineStore('document', {
  state: () => ({
    documents: [],
  }),
  actions: {
    async fetchDocuments(botId) {
      const userStore = useUserStore();
      try {
        const response = await axios.get(`http://localhost:4005/documents/${botId}`, {
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
