<template>
  <div class="edit-bot-container">
    <h2>✏️ Editar Bot</h2>
    <div v-if="loading" class="loading">Cargando...</div>
    <div v-else-if="error" class="error-message">❌ {{ errorMessage }}</div>
    <div v-else-if="bot">
      <form @submit.prevent="handleUpdateBot">
        <div class="form-group">
          <label for="name">Nombre del Bot</label>
          <input v-model="form.name" type="text" id="name" required />
        </div>

        <div class="form-group">
          <label for="description">Descripción</label>
          <textarea v-model="form.description" id="description" rows="3"></textarea>
        </div>

        <div class="form-group">
          <label for="type">Tipo</label>
          <select v-model="form.type" id="type">
            <option value="support">Soporte</option>
            <option value="internal">Interno</option>
            <option value="general">General</option>
          </select>
        </div>

        <div class="button-group">
          <button type="submit" class="save-btn">💾 Guardar Cambios</button>
          <button type="button" @click="router.push('/dashboard')" class="cancel-btn">✖ Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useBotStore } from '@/store/botStore';
import { useUserStore } from '@/store/userStore';
import axios from '@/api/axios';

const route = useRoute();
const router = useRouter();
const botStore = useBotStore();
const userStore = useUserStore();

const loading = ref(true);
const error = ref(false);
const errorMessage = ref('');
const bot = ref(null);

const form = ref({
  name: '',
  description: '',
  type: 'support',
});

onMounted(async () => {
  try {
    const response = await axios.get(`/bots/${route.params.id}`, {
      headers: { Authorization: `Bearer ${userStore.token}` },
    });
    bot.value = response.data;
    form.value = {
      name: bot.value.name,
      description: bot.value.description || '',
      type: bot.value.type,
    };
  } catch (err) {
    console.error('❌ Error al cargar el bot:', err);
    error.value = true;
    errorMessage.value = 'No se pudo cargar la información del bot.';
  } finally {
    loading.value = false;
  }
});

const handleUpdateBot = async () => {
  try {
    await axios.put(`/bots/${route.params.id}`, form.value, {
      headers: { Authorization: `Bearer ${userStore.token}` },
    });
    alert('✅ Bot actualizado correctamente');
    await botStore.fetchBots();
    router.push('/dashboard');
  } catch (err) {
    console.error('❌ Error al actualizar el bot:', err);
    error.value = true;
    errorMessage.value = 'Error al actualizar el bot.';
  }
};
</script>

<style scoped>
.edit-bot-container {
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

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input, textarea, select {
  width: 100%;
  padding: 8px;
  border: 1px solid var(--color-secondary);
  border-radius: 5px;
  font-size: 1rem;
}

textarea {
  resize: vertical;
  min-height: 100px;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.save-btn, .cancel-btn {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.save-btn {
  background: var(--color-primary);
  color: white;
}

.cancel-btn {
  background: var(--color-secondary);
  color: white;
}

.save-btn:hover {
  background: var(--color-dark-secondary);
}

.cancel-btn:hover {
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