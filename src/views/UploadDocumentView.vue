<template>
  <div class="documents-container">
    <div class="documents-layout">
      <DashboardSidebar />
      <div class="documents-card">
        <div class="documents-header">
          <h2><font-awesome-icon icon="paperclip" /> Documentos del Bot</h2>
          <p>Gestiona y sube archivos para tu bot</p>
        </div>
        <form @submit.prevent="handleUpload" class="upload-form">
          <label for="bot">Selecciona tu bot:</label>
          <select v-model="selectedBotId" required>
            <option value="" disabled>Selecciona un bot</option>
            <option v-for="bot in botStore.bots" :key="bot._id" :value="bot._id">
              {{ bot.name }}
            </option>
          </select>
          <input type="file" ref="fileInput" required />
          <button type="submit" class="upload-btn">
            <font-awesome-icon icon="upload" /> Subir Documento
          </button>
        </form>
        <div v-if="documents.length">
          <h3><font-awesome-icon icon="file-alt" /> Archivos Subidos</h3>
          <ul class="doc-list">
            <li v-for="doc in documents" :key="doc._id">
              <div class="doc-info">
                <font-awesome-icon icon="file" class="doc-icon" />
                <a :href="doc.url" target="_blank">{{ doc.filename }}</a>
                <span class="type-badge">{{ doc.fileType }}</span>
                <span class="meta">{{ (doc.metadata.size / 1024).toFixed(1) }} KB</span>
              </div>
              <button @click="deleteDoc(doc._id)" class="delete-btn">
                <font-awesome-icon icon="trash" /> Eliminar
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useBotStore } from '@/store/botStore';
import { useUserStore } from '@/store/userStore';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
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

// Import the DashboardSidebar component
import DashboardSidebar from '@/components/DashboardSidebar.vue';
</script>

<style scoped>
.documents-container {
  min-height: 100vh;
  max-height: 100vh;
  background: var(--color-background);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  overflow: auto;
}

.documents-layout {
  display: flex;
  background: var(--color-light-secondary);
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  width: 60%;
  min-height: 0;
  max-height: 88vh;
  overflow-y: auto;
  padding: 1.2rem 0.7rem;
}

.documents-card {
  flex: 1;
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  overflow-y: visible;
}

.documents-header {
  text-align: center;
  margin-bottom: 1.2rem;
}

.documents-header h2 {
  color: var(--color-primary);
  font-size: 1.3rem;
  margin-bottom: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.documents-header p {
  color: #666;
  font-size: 0.98rem;
}

.upload-form {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  margin-bottom: 1.2rem;
}

.upload-form label {
  font-weight: 500;
  color: var(--color-dark-secondary);
  margin-bottom: 0.2rem;
}

.upload-form select,
.upload-form input[type="file"] {
  padding: 0.7rem;
  border-radius: 8px;
  border: 2px solid #e9ecef;
  font-size: 0.97rem;
  background: white;
  transition: border-color 0.3s;
  box-sizing: border-box;
}

.upload-form select:focus,
.upload-form input[type="file"]:focus {
  border-color: var(--color-primary);
  outline: none;
}

.upload-btn {
  background: var(--color-primary);
  color: white;
  padding: 0.7rem 1.2rem;
  border: none;
  border-radius: 8px;
  font-size: 0.97rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  justify-content: center;
}

.upload-btn:hover:not(:disabled) {
  background: var(--color-dark-secondary);
  transform: translateY(-2px);
}

.doc-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.doc-list li {
  margin: 0.4rem 0;
  padding: 0.5rem 0.7rem;
  background: #f8f9fa;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.7rem;
}

.doc-info {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  flex-wrap: wrap;
}

.doc-icon {
  color: var(--color-primary);
  font-size: 1.1rem;
}

.doc-list a {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.97rem;
}

.type-badge {
  background: #e9ecef;
  color: var(--color-dark-secondary);
  border-radius: 6px;
  padding: 0.2rem 0.7rem;
  font-size: 0.85rem;
  font-weight: 500;
  margin-left: 0.2rem;
}

.meta {
  margin-left: 0.2rem;
  font-size: 0.85rem;
  color: #555;
}

.delete-btn {
  background: #f8f9fa;
  color: var(--color-dark-secondary);
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-size: 0.97rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  transition: all 0.3s ease;
}

.delete-btn:hover {
  background: #e9ecef;
}

@media (max-width: 1000px) {
  .documents-layout {
    flex-direction: column;
    width: 100%;
    min-width: unset;
  }
  .documents-card {
    padding: 1.5rem 0.5rem;
  }
  .upload-btn, .delete-btn {
    width: 100%;
    justify-content: center;
  }
  .doc-list li {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.3rem;
  }
  .doc-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.3rem;
  }
}
</style>
  