<template>
  <div class="bot-status">
    <div class="status-header">
      <h2>🤖 Estado de tus Bots</h2>
      <div class="status-summary">
        <span class="summary-item">
          <span class="icon">🟢</span>
          <span class="count">{{ activeBots }}</span>
          <span>Activos</span>
        </span>
        <span class="summary-item">
          <span class="icon">🟡</span>
          <span class="count">{{ inactiveBots }}</span>
          <span>Inactivos</span>
        </span>
      </div>
    </div>

    <div class="bots-list">
      <div v-if="botStore.bots.length === 0" class="empty-state">
        <p>No tienes bots creados aún.</p>
        <router-link to="/createbot" class="create-bot-btn">
          <span>➕ Crear mi primer bot</span>
        </router-link>
      </div>

      <div v-for="bot in botStore.bots" :key="bot._id" class="bot-card">
        <div class="bot-header">
          <div class="bot-info">
            <span class="status-indicator" :class="getStatusClass(bot.status)"></span>
            <h3 class="bot-name">{{ bot.name }}</h3>
          </div>
          <div class="bot-type">{{ bot.type }}</div>
        </div>

        <div class="bot-details">
          <div class="detail-item">
            <span class="label">Creado:</span>
            <span class="value">{{ formatDate(bot.createdAt) }}</span>
          </div>
          <div class="detail-item">
            <span class="label">Conversaciones:</span>
            <span class="value">{{ bot.conversations || 0 }}</span>
          </div>
          <div class="detail-item">
            <span class="label">Última actividad:</span>
            <span class="value">{{ formatDate(bot.lastActivity) || 'Nunca' }}</span>
          </div>
        </div>

        <div class="bot-actions">
          <button class="action-btn view" @click="viewBot(bot._id)">
            <span class="icon">👁️</span>
            <span>Ver</span>
          </button>
          <button class="action-btn edit" @click="editBot(bot._id)">
            <span class="icon">✏️</span>
            <span>Editar</span>
          </button>
          <button class="action-btn stats" @click="viewStats(bot._id)">
            <span class="icon">📊</span>
            <span>Estadísticas</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useBotStore } from '@/store/botStore';
import { useRouter } from 'vue-router';

const botStore = useBotStore();
const router = useRouter();

const activeBots = computed(() => {
  return botStore.bots.filter(bot => bot.status === 'active').length;
});

const inactiveBots = computed(() => {
  return botStore.bots.filter(bot => bot.status !== 'active').length;
});

const getStatusClass = (status) => {
  return {
    'active': status === 'active',
    'inactive': status !== 'active'
  };
};

const formatDate = (date) => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

onMounted(() => {
  botStore.fetchBots();
});

const editBot = (id) => {
  router.push(`/bot/edit/${id}`);
};

const viewBot = (id) => {
  router.push(`/bot/${id}`);
};

const viewStats = (id) => {
  router.push(`/bot/stats/${id}`);
};
</script>

<style scoped>
.bot-status {
  background: var(--color-light-secondary);
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.status-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

h2 {
  color: var(--color-primary);
  margin: 0;
}

.status-summary {
  display: flex;
  gap: 1.5rem;
}

.summary-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-text-secondary);
}

.summary-item .icon {
  font-size: 1.2rem;
}

.summary-item .count {
  font-weight: bold;
  color: var(--color-primary);
}

.bots-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: var(--color-text-secondary);
}

.create-bot-btn {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background: var(--color-primary);
  color: var(--color-light-secondary);
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.create-bot-btn:hover {
  background: var(--color-dark-secondary);
  transform: translateY(-2px);
}

.bot-card {
  background: var(--color-secondary);
  border-radius: 8px;
  padding: 1.5rem;
  color: var(--color-light-secondary);
}

.bot-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.bot-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.status-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--color-text-secondary);
}

.status-indicator.active {
  background: #4CAF50;
}

.status-indicator.inactive {
  background: #FFC107;
}

.bot-name {
  font-size: 1.2rem;
  margin: 0;
}

.bot-type {
  background: var(--color-dark-secondary);
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.9rem;
}

.bot-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.label {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
}

.value {
  font-weight: bold;
}

.bot-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.action-btn.view {
  background: var(--color-primary);
  color: var(--color-light-secondary);
}

.action-btn.edit {
  background: var(--color-secondary);
  color: var(--color-light-secondary);
}

.action-btn.stats {
  background: var(--color-dark-secondary);
  color: var(--color-light-secondary);
}

.action-btn:hover {
  transform: translateY(-2px);
  opacity: 0.9;
}
</style>
