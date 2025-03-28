<template>
  <main class="dashboard-content">
    <h1>📊 Dashboard</h1>
    <p>Monitorea el rendimiento de tus bots y la actividad de tus usuarios</p>

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
        <p>1</p> <!-- Solo tú por ahora -->
      </div>
      <div class="stat-card">
        <h2>⚠️ Problemas</h2>
        <p>0</p>
      </div>
    </div>

    <div class="quick-actions">
      <router-link to="/createbot" class="quick-actions-button">➕ Crear Bot</router-link>
      <button @click="navigateToDocuments" class="quick-actions-button">📎 Ver Documentos</button>
      <button @click="navigateToChats" class="quick-actions-button">💬 Ver Chats</button>
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useBotStore } from '@/store/botStore';
import { useRouter } from 'vue-router';

const botStore = useBotStore();
const totalConversations = ref(0);
const router = useRouter();

const navigateToCreateBot = () => router.push('/create-bot');
const navigateToDocuments = () => router.push('/documents');
const navigateToChats = () => router.push('/chats');

onMounted(async () => {
  await botStore.fetchBots();

  // 🔢 Simula cantidad de conversaciones (ajusta si tienes endpoint real)
  totalConversations.value = botStore.bots.reduce(
    (sum, bot) => sum + (bot.conversations || 0),
    0
  );
});
</script>

<style scoped>
.dashboard-content {
  text-align: justify;
  background: var(--color-light-secondary);
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.stats {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 20px;
  flex-wrap: wrap;
}

.stat-card {
  background: var(--color-secondary);
  padding: 20px;
  width: 100px;
  max-width: 200px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex: 1;
  text-align: center;
  color: var(--color-light-secondary);
}

.stat-card h2 {
  font-size: 14px;
}

.stat-card p {
  font-size: 24px;
  font-weight: bold;
  margin-top: 5px;
}

.quick-actions {
  margin-top: 30px;
  display: flex;
  gap: 15px;
  justify-content: center;
}

.quick-actions-button {
  background: var(--color-primary);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s ease;
  text-decoration: none;
}

.quick-actions button:hover {
  background: var(--color-dark-secondary);
}
</style>
