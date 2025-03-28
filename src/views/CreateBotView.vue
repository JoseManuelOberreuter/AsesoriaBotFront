<template>
    <div class="create-bot-container">
      <h2>🛠️ Crear Nuevo Bot</h2>
      <form @submit.prevent="handleCreateBot">
        <label for="name">Nombre del Bot</label>
        <input v-model="form.name" type="text" id="name" required />
  
        <label for="description">Descripción</label>
        <textarea v-model="form.description" id="description" rows="3"></textarea>
  
        <label for="type">Tipo</label>
        <select v-model="form.type" id="type">
            <option value="support">Soporte</option>
            <option value="internal">Interno</option>
            <option value="general">General</option>
        </select>

  
        <!-- <label for="avatar">Avatar (opcional)</label>
        <input type="text" v-model="form.avatar" id="avatar" placeholder="URL o deja vacío" /> -->
  
        <button type="submit">Crear Bot</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from '@/api/axios';
  import { useRouter } from 'vue-router';
  import { useUserStore } from '@/store/userStore';
  
  const router = useRouter();
  const userStore = useUserStore();
  
  const form = ref({
    name: '',
    description: '',
    type: 'soporte',
    avatar: '',
    settings: {},
  });
  
  const handleCreateBot = async () => {
    try {
      await axios.post('/bots/create', form.value, {
        headers: { Authorization: `Bearer ${userStore.token}` },
      });
      alert('✅ Bot creado correctamente');
      router.push('/dashboard');
    } catch (err) {
      console.error('❌ Error al crear bot:', err);
      alert('Hubo un error al crear el bot.');
    }
  };
  </script>
  
  <style scoped>
  .create-bot-container {
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
  
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  input, select, textarea {
    padding: 0.6rem;
    border-radius: 6px;
    border: 1px solid #ccc;
    font-size: 1rem;
  }
  
  button {
    background: var(--color-primary);
    color: white;
    padding: 0.8rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.3s ease;
  }
  
  button:hover {
    background: var(--color-dark-secondary);
  }
  </style>
  