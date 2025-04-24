<template>
  <div class="view-bot-container">
    <h2>👁️ Ver Bot</h2>
    <div v-if="loading" class="loading">Cargando...</div>
    <div v-else-if="error" class="error-message">❌ {{ errorMessage }}</div>
    <div v-else-if="bot" class="bot-details">
      <div class="detail-group">
        <h3>Información General</h3>
        <div class="detail-item">
          <span class="label">Nombre:</span>
          <span class="value">{{ bot.name }}</span>
        </div>
        <div class="detail-item">
          <span class="label">Tipo:</span>
          <span class="value">{{ getTypeLabel(bot.type) }}</span>
        </div>
        <div class="detail-item">
          <span class="label">Creado:</span>
          <span class="value">{{ new Date(bot.createdAt).toLocaleDateString() }}</span>
        </div>
        <div v-if="bot.description" class="detail-item">
          <span class="label">Descripción:</span>
          <span class="value">{{ bot.description }}</span>
        </div>
      </div>

      <div class="detail-group">
        <h3>Estadísticas</h3>
        <div class="detail-item">
          <span class="label">Conversaciones:</span>
          <span class="value">{{ bot.conversations || 0 }}</span>
        </div>
        <div class="detail-item">
          <span class="label">Documentos:</span>
          <span class="value">{{ documents.length }}</span>
        </div>
      </div>

      <div class="button-group">
        <button @click="router.push(`/bot/edit/${bot._id}`)" class="edit-btn">✏️ Editar</button>
        <button @click="router.push('/dashboard')" class="back-btn">← Volver</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/store/userStore';
import { useDocumentStore } from '@/store/documentStore';
import axios from '@/api/axios';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const documentStore = useDocumentStore();

const loading = ref(true);
const error = ref(false);
const errorMessage = ref('');
const bot = ref(null);
const documents = ref([]);

const getTypeLabel = (type) => {
  const types = {
    support: 'Soporte',
    internal: 'Interno',
    general: 'General'
  };
  return types[type] || type;
};

onMounted(async () => {
  try {
    const response = await axios.get(`/bots/${route.params.id}`, {
      headers: { Authorization: `Bearer ${userStore.token}` },
    });
    bot.value = response.data;
    
    // Fetch documents for this bot
    await documentStore.fetchDocuments(route.params.id);
    documents.value = documentStore.documents;
  } catch (err) {
    console.error('❌ Error al cargar el bot:', err);
    error.value = true;
    errorMessage.value = 'No se pudo cargar la información del bot.';
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.view-bot-container {
  max-width: 600px;
  margin: 50px auto;
  background: var(--color-light-secondary);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

h3 {
  color: var(--color-primary);
  margin-bottom: 15px;
  border-bottom: 2px solid var(--color-secondary);
  padding-bottom: 5px;
}

.detail-group {
  margin-bottom: 25px;
}

.detail-item {
  display: flex;
  margin-bottom: 10px;
  padding: 8px;
  background: var(--color-background);
  border-radius: 5px;
}

.label {
  font-weight: bold;
  min-width: 120px;
  color: var(--color-secondary);
}

.value {
  flex: 1;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.edit-btn, .back-btn {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.edit-btn {
  background: var(--color-primary);
  color: white;
}

.back-btn {
  background: var(--color-secondary);
  color: white;
}

.edit-btn:hover {
  background: var(--color-dark-secondary);
}

.back-btn:hover {
  background: var(--color-dark-secondary);
}

.loading {
  text-align: center;
  font-weight: bold;
  color: var(--color-dark-secondary);
}

.error-message {
  text-align: center;
  font-weight: bold;
  color: red;
}
</style> 