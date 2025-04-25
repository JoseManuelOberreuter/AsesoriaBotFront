<template>
  <div class="bot-status">
    <h2><font-awesome-icon icon="robot" /> Estado de tus Bots</h2>

    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Tipo</th>
          <th>Creado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="botStore.bots.length === 0">
          <td colspan="4">No tienes bots creados aún.</td>
        </tr>
        <tr v-for="bot in botStore.bots" :key="bot._id">
          <td class="bot-name">{{ bot.name }}</td>
          <td>{{ bot.type }}</td>
          <td>{{ new Date(bot.createdAt).toLocaleDateString() }}</td>
          <td>
            <button class="action-btn" @click="editBot(bot._id)"><font-awesome-icon icon="edit" /> Editar</button>
            <button class="action-btn" @click="viewBot(bot._id)"><font-awesome-icon icon="eye" /> Ver</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useBotStore } from '@/store/botStore';
import { useRouter } from 'vue-router';

const botStore = useBotStore();
const router = useRouter();

onMounted(() => {
  botStore.fetchBots();
});

const editBot = (id) => {
  router.push(`/bot/edit/${id}`);
};

const viewBot = (id) => {
  router.push(`/bot/${id}`);
};
</script>

<style scoped>
.bot-status {
  margin-top: 20px;
  background: var(--color-light-secondary);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: left;
  margin-bottom: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  text-align: left;
}

th {
  background: var(--color-secondary);
  color: var(--color-light-secondary);
}

tr:nth-child(even) {
  background: var(--color-light-secondary);
}

.bot-name {
  font-weight: bold;
}

.action-btn {
  background: none;
  border: none;
  color: var(--color-primary);
  cursor: pointer;
  margin-right: 10px;
  font-size: 14px;
}

.action-btn:hover {
  text-decoration: underline;
}
</style>
