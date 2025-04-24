<template>
  <main class="dashboard-content">
    <div class="dashboard-header">
      <h1>🤖 Panel de Control</h1>
      <p>Gestiona y monitorea tus bots de asesoría</p>
    </div>

    <div class="stats">
      <div class="stat-card">
        <h2>🤖 Bots Activos</h2>
        <p>{{ botStore.bots.length }}</p>
      </div>
      <div class="stat-card">
        <h2>💬 Conversaciones</h2>
        <p>{{ totalConversations }}</p>
      </div>
      <div class="stat-card">
        <h2>👤 Usuarios</h2>
        <p>1</p>
      </div>
      <div class="stat-card">
        <h2>📊 Rendimiento</h2>
        <p>{{ performanceScore }}%</p>
      </div>
    </div>

    <div class="quick-actions">
      <router-link to="/createbot" class="quick-actions-button primary">
        <span>➕ Crear Nuevo Bot</span>
      </router-link>
      <router-link to="/uploaddocument" class="quick-actions-button">
        <span>📚 Gestionar Documentos</span>
      </router-link>
      <button @click="navigateToChats" class="quick-actions-button">
        <span>💬 Ver Conversaciones</span>
      </button>
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useBotStore } from '@/store/botStore';
import { useRouter } from 'vue-router';

const botStore = useBotStore();
const router = useRouter();
const totalConversations = ref(0);
const performanceScore = ref(95);

const navigateToCreateBot = () => router.push('/create-bot');
const navigateToDocuments = () => router.push('/documents');
const navigateToChats = () => router.push('/chats');

onMounted(async () => {
  await botStore.fetchBots();
  totalConversations.value = botStore.bots.reduce(
    (sum, bot) => sum + (bot.conversations || 0),
    0
  );
});
</script>

<style scoped>
.dashboard-content {
  background: var(--color-light-secondary);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.dashboard-header {
  margin-bottom: 2rem;
}

.dashboard-header h1 {
  color: var(--color-primary);
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.dashboard-header p {
  color: var(--color-text-secondary);
}

.stats {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.stat-card {
  background: var(--color-secondary);
  padding: 1.5rem;
  min-width: 150px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  color: var(--color-light-secondary);
  transition: transform 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
}

.stat-card h2 {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.stat-card p {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
}

.quick-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.quick-actions-button {
  background: var(--color-secondary);
  color: var(--color-light-secondary);
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  text-decoration: none;
}

.quick-actions-button.primary {
  background: var(--color-primary);
}

.quick-actions-button:hover {
  transform: translateY(-2px);
  background: var(--color-dark-secondary);
}
</style>
