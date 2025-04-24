<template>
  <div class="edit-bot-container">
    <h2>✏️ Editar Bot</h2>
    <div v-if="loading" class="loading">Cargando...</div>
    <div v-else-if="error" class="error-message">❌ {{ errorMessage }}</div>
    <form v-else @submit.prevent="handleUpdateBot" class="edit-form">
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
        <button type="button" @click="goBack" class="cancel-btn">✖ Cancelar</button>
      </div>
    </form>
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
    form.value = response.data;
    loading.value = false;
  } catch (err) {
    console.error('❌ Error al cargar el bot:', err);
    error.value = true;
    errorMessage.value = 'No se pudo cargar la información del bot.';
    loading.value = false;
  }
});

const handleUpdateBot = async () => {
  try {
    await axios.put(`/bots/${route.params.id}`, form.value, {
      headers: { Authorization: `Bearer ${userStore.token}` },
    });
    alert('✅ Bot actualizado correctamente');
    router.push('/dashboard');
  } catch (err) {
    console.error('❌ Error al actualizar el bot:', err);
    error.value = true;
    errorMessage.value = 'Error al actualizar el bot.';
  }
};

const goBack = () => {
  router.push('/dashboard');
};
</script>

<style scoped>
.edit-bot-container {
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

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input, select, textarea {
  width: 100%;
  padding: 0.6rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

textarea {
  resize: vertical;
  min-height: 100px;
}

.button-group {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

.save-btn, .cancel-btn {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.save-btn {
  background: var(--color-primary);
  color: white;
}

.cancel-btn {
  background: #dc3545;
  color: white;
}

.save-btn:hover {
  background: var(--color-dark-secondary);
}

.cancel-btn:hover {
  background: #c82333;
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