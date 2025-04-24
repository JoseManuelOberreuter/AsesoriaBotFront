<template>
  <div class="view-bot-container">
    <h2>👁️ Ver Bot</h2>
    <div v-if="loading" class="loading">Cargando...</div>
    <div v-else-if="error" class="error-message">❌ {{ errorMessage }}</div>
    <div v-else class="bot-details">
      <div class="detail-group">
        <h3>Información General</h3>
        <div class="detail-item">
          <span class="label">Nombre:</span>
          <span class="value">{{ bot.name }}</span>
        </div>
        <div class="detail-item">
          <span class="label">Tipo:</span>
          <span class="value">{{ getBotTypeName(bot.type) }}</span>
        </div>
        <div class="detail-item">
          <span class="label">Creado:</span>
          <span class="value">{{ new Date(bot.createdAt).toLocaleDateString() }}</span>
        </div>
      </div>

      <div class="detail-group">
        <h3>Descripción</h3>
        <p class="description">{{ bot.description || 'No hay descripción disponible' }}</p>
      </div>

      <div class="button-group">
        <button @click="goToEdit" class="edit-btn">✏️ Editar</button>
        <button @click="goBack" class="back-btn">← Volver</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/store/userStore';
import axios from '@/api/axios';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const loading = ref(true);
const error = ref(false);
const errorMessage = ref('');
const bot = ref({});

const getBotTypeName = (type) => {
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
    loading.value = false;
  } catch (err) {
    console.error('❌ Error al cargar el bot:', err);
    error.value = true;
    errorMessage.value = 'No se pudo cargar la información del bot.';
    loading.value = false;
  }
});

const goToEdit = () => {
  router.push(`/bot/edit/${route.params.id}`);
};

const goBack = () => {
  router.push('/dashboard');
};
</script>

<style scoped>
.view-bot-container {
  max-width: 600px;
  margin: 3rem auto;
  background: var(--color-light-secondary);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
}

.detail-group {
  margin-bottom: 2rem;
}

h3 {
  color: var(--color-primary);
  margin-bottom: 1rem;
  border-bottom: 2px solid var(--color-primary);
  padding-bottom: 0.5rem;
}

.detail-item {
  display: flex;
  margin-bottom: 1rem;
}

.label {
  font-weight: bold;
  width: 120px;
  color: var(--color-dark-secondary);
}

.value {
  flex: 1;
}

.description {
  line-height: 1.6;
  color: #333;
}

.button-group {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

.edit-btn, .back-btn {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.edit-btn {
  background: var(--color-primary);
  color: white;
}

.back-btn {
  background: #6c757d;
  color: white;
}

.edit-btn:hover {
  background: var(--color-dark-secondary);
}

.back-btn:hover {
  background: #5a6268;
}

.loading {
  text-align: center;
  font-weight: bold;
  color: var(--color-dark-secondary);
}

.error-message {
  text-align: center;
  color: #dc3545;
  font-weight: bold;
}
</style> 