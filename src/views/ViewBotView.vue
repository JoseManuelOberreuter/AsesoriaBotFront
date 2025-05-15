<template>
  <div class="view-bot-container">
    <DashboardSidebar />
    <div class="view-bot-card">
      <div class="view-header">
        <h2><font-awesome-icon icon="robot" /> Ver Bot</h2>
        <p>Consulta la información y detalles de tu bot</p>
      </div>
      <div v-if="loading" class="loading-state">
        <font-awesome-icon icon="spinner" spin />
        <span>Cargando información del bot...</span>
      </div>
      <div v-else-if="error" class="error-state">
        <font-awesome-icon icon="exclamation-circle" />
        <span>{{ errorMessage }}</span>
      </div>
      <div v-else class="bot-details">
        <div class="detail-group">
          <h3>Información General</h3>
          <div class="detail-item">
            <span class="label">Nombre:</span>
            <span class="value">{{ bot.name }}</span>
          </div>
          <div class="detail-item">
            <span class="label">Tipo:</span>
            <span class="value type-badge">
              <font-awesome-icon :icon="getTypeIcon(bot.type)" />
              {{ getBotTypeName(bot.type) }}
            </span>
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
          <button @click="goToEdit" class="edit-btn">
            <font-awesome-icon icon="pen" /> Editar
          </button>
          <button @click="goBack" class="back-btn">
            <font-awesome-icon icon="arrow-left" /> Volver
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/store/userStore';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import axios from '@/api/axios';
import DashboardSidebar from '@/components/DashboardSidebar.vue';
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

const getTypeIcon = (type) => {
  const icons = {
    support: 'headset',
    internal: 'building',
    general: 'robot'
  };
  return icons[type] || 'robot';
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
  min-height: 100vh;
  background: var(--color-background);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.view-bot-card {
  background: var(--color-light-secondary);
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  width: 100%;
  max-width: 800px;
  padding: 1.2rem 1.2rem 1.2rem 1.2rem;
  min-height: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow-y: visible;
}

.view-header {
  text-align: center;
  margin-bottom: 1.2rem;
}

.view-header h2 {
  color: var(--color-primary);
  font-size: 1.3rem;
  margin-bottom: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.view-header p {
  color: #666;
  font-size: 0.98rem;
}

.detail-group {
  margin-bottom: 1.1rem;
}

.detail-group h3 {
  color: var(--color-primary);
  margin-bottom: 0.7rem;
  border-bottom: 2px solid var(--color-primary);
  padding-bottom: 0.3rem;
  font-size: 1.05rem;
}

.detail-item {
  display: flex;
  margin-bottom: 0.7rem;
  align-items: center;
}

.label {
  font-weight: bold;
  width: 110px;
  color: var(--color-dark-secondary);
  font-size: 0.97rem;
}

.value {
  flex: 1;
  font-size: 0.97rem;
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.type-badge {
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  padding: 0.3rem 0.8rem;
  font-weight: 600;
  color: var(--color-primary);
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.97rem;
}

.description {
  line-height: 1.5;
  color: #333;
  background: #fff;
  border-radius: 8px;
  padding: 0.7rem 1rem;
  font-size: 0.97rem;
  border: 1.5px solid #e9ecef;
}

.button-group {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1.2rem;
}

.edit-btn, .back-btn {
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
}

.edit-btn {
  background: var(--color-primary);
  color: white;
}

.edit-btn:hover:not(:disabled) {
  background: var(--color-dark-secondary);
  transform: translateY(-2px);
}

.back-btn {
  background: #f8f9fa;
  color: var(--color-dark-secondary);
}

.back-btn:hover {
  background: #e9ecef;
}

.loading-state,
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 3rem;
  text-align: center;
}

.loading-state {
  color: var(--color-primary);
}

.error-state {
  color: #dc3545;
}

.loading-state svg,
.error-state svg {
  font-size: 2rem;
}

@media (max-width: 768px) {
  .view-bot-card {
    padding: 1.5rem 0.5rem;
    max-width: 98vw;
  }
  .button-group {
    flex-direction: column;
  }
  .edit-btn, .back-btn {
    width: 100%;
    justify-content: center;
  }
}
</style> 