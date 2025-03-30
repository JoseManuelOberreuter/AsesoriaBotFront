<template>
    <div class="documents-container">
      <h2>📎 Documentos del Bot</h2>
  
      <form @submit.prevent="handleUpload" class="upload-form">
        <label for="bot">Selecciona tu bot:</label>
        <select v-model="selectedBotId" required>
          <option value="" disabled>Selecciona un bot</option>
          <option v-for="bot in botStore.bots" :key="bot._id" :value="bot._id">
            {{ bot.name }}
          </option>
        </select>
  
        <input type="file" ref="fileInput" required />
        <button type="submit">📤 Subir Documento</button>
      </form>
  
      <div v-if="documents.length">
        <h3>📄 Archivos Subidos</h3>
        <ul class="doc-list">
          <li v-for="doc in documents" :key="doc._id">
            <a :href="doc.url" target="_blank">{{ doc.filename }}</a>
            <span class="type">({{ doc.fileType }})</span>
            <span class="meta">- {{ (doc.metadata.size / 1024).toFixed(1) }} KB</span>
            <button @click="deleteDoc(doc._id)">🗑️ Eliminar</button>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  import { useBotStore } from '@/store/botStore';
  import { useUserStore } from '@/store/userStore';
  import axios from '@/api/axios';
  
  const botStore = useBotStore();
  const userStore = useUserStore();
  
  const documents = ref([]);
  const selectedBotId = ref('');
  const fileInput = ref(null);
  
  onMounted(() => {
    botStore.fetchBots();
  });
  
  watch(selectedBotId, async (id) => {
    if (id) await fetchDocuments();
  });
  
  const fetchDocuments = async () => {
    try {
      const res = await axios.get(`/documents/${selectedBotId.value}`, {
        headers: { Authorization: `Bearer ${userStore.token}` },
      });
      documents.value = res.data;
    } catch (err) {
      console.error('❌ Error al obtener documentos:', err);
    }
  };
  
  const handleUpload = async () => {
    const file = fileInput.value?.files[0];
    if (!file || !selectedBotId.value) return;
  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('botId', selectedBotId.value);
  
    try {
      await axios.post('/documents/upload', formData, {
        headers: {
          Authorization: `Bearer ${userStore.token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('✅ Documento subido con éxito');
      await fetchDocuments();
      fileInput.value.value = '';
    } catch (err) {
      console.error('❌ Error al subir documento:', err);
      alert('Error al subir el documento.');
    }
  };
  
  const deleteDoc = async (id) => {
    if (!confirm('¿Eliminar este documento?')) return;
    try {
      await axios.delete(`/documents/${id}`, {
        headers: { Authorization: `Bearer ${userStore.token}` },
      });
      documents.value = documents.value.filter(d => d._id !== id);
    } catch (err) {
      console.error('❌ Error al eliminar documento:', err);
    }
  };
  </script>
  
  <style scoped>
  .documents-container {
    max-width: 700px;
    margin: 2rem auto;
    background: var(--color-light-secondary);
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  .upload-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
  }
  select, input[type="file"] {
    padding: 0.6rem;
    border-radius: 6px;
    border: 1px solid #ccc;
  }
  button {
    background: var(--color-primary);
    color: white;
    padding: 0.7rem;
    border: none;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.3s ease;
  }
  button:hover {
    background: var(--color-dark-secondary);
  }
  .doc-list {
    list-style: none;
    padding: 0;
  }
  .doc-list li {
    margin: 0.5rem 0;
    padding: 0.5rem;
    background: #f5f5f5;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .doc-list a {
    color: var(--color-primary);
    text-decoration: none;
    font-weight: bold;
  }
  .type, .meta {
    margin-left: 10px;
    font-size: 12px;
    color: #555;
  }
  </style>
  