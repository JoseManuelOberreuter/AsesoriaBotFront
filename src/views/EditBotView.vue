<template>
  <div class="edit-bot-container">
    <div class="edit-bot-card">
      <div class="edit-header">
        <h2><font-awesome-icon icon="robot" /> Editar Bot</h2>
        <p>Actualiza la información de tu bot según tus necesidades</p>
      </div>

      <div v-if="loading" class="loading-state">
        <font-awesome-icon icon="spinner" spin />
        <span>Cargando información del bot...</span>
      </div>

      <div v-else-if="error" class="error-state">
        <font-awesome-icon icon="exclamation-circle" />
        <span>{{ errorMessage }}</span>
      </div>

      <form v-else @submit.prevent="handleUpdateBot" class="edit-form">
        <div class="input-group">
          <label for="name">Nombre del Bot</label>
          <div class="input-wrapper">
            <input 
              v-model="form.name" 
              type="text" 
              id="name" 
              required 
              placeholder="Ej: Asistente de Ventas"
              :class="{ 'error': errors.name }"
              @input="validateField('name')"
            />
            <span class="input-icon"><font-awesome-icon icon="robot" /></span>
          </div>
          <span class="error-message" v-if="errors.name">{{ errors.name }}</span>
        </div>

        <div class="input-group">
          <label for="type">Tipo de Bot</label>
          <div class="type-options">
            <div 
              v-for="type in botTypes" 
              :key="type.value"
              class="type-option"
              :class="{ selected: form.type === type.value }"
              @click="selectType(type.value)"
            >
              <span class="type-icon"><font-awesome-icon :icon="type.icon" /></span>
              <div class="type-texts">
                <span class="type-name">{{ type.label }}</span>
                <span class="type-description">{{ type.description }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="input-group">
          <label for="description">Descripción</label>
          <div class="input-wrapper">
            <textarea 
              v-model="form.description" 
              id="description" 
              rows="3"
              placeholder="Describe el propósito y las capacidades de tu bot..."
              :class="{ 'error': errors.description }"
              @input="validateField('description')"
            ></textarea>
          </div>
          <span class="error-message" v-if="errors.description">{{ errors.description }}</span>
        </div>

        <div class="button-group">
          <button type="submit" class="save-btn" :disabled="isSubmitting">
            <font-awesome-icon icon="save" />
            {{ isSubmitting ? 'Guardando...' : 'Guardar Cambios' }}
          </button>
          <button type="button" @click="goBack" class="cancel-btn">
            <font-awesome-icon icon="times" />
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
//! AXIOS PROBLEM 
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useBotStore } from '@/store/botStore';
import { useUserStore } from '@/store/userStore';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import axios from '@/api/axios';

const route = useRoute();
const router = useRouter();
const botStore = useBotStore();
const userStore = useUserStore();

const loading = ref(true);
const error = ref(false);
const errorMessage = ref('');
const isSubmitting = ref(false);

const botTypes = [
  {
    value: 'support',
    label: 'Soporte',
    icon: 'headset',
    description: 'Atención al cliente y resolución de dudas'
  },
  {
    value: 'internal',
    label: 'Interno',
    icon: 'building',
    description: 'Asistente para empleados y procesos internos'
  },
  {
    value: 'general',
    label: 'General',
    icon: 'robot',
    description: 'Bot multipropósito y personalizable'
  }
];

const form = ref({
  name: '',
  description: '',
  type: 'support',
});

const errors = ref({
  name: '',
  description: '',
  type: ''
});

const validateField = (field) => {
  errors.value[field] = '';
  
  switch (field) {
    case 'name':
      if (form.value.name.length < 3) {
        errors.value.name = 'El nombre debe tener al menos 3 caracteres';
      }
      break;
    case 'description':
      if (form.value.description.length < 10) {
        errors.value.description = 'La descripción debe tener al menos 10 caracteres';
      }
      break;
    case 'type':
      if (!form.value.type) {
        errors.value.type = 'Debes seleccionar un tipo de bot';
      }
      break;
  }
};

const selectType = (type) => {
  form.value.type = type;
  validateField('type');
};

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
  if (Object.values(errors.value).some(error => error !== '')) return;
  
  isSubmitting.value = true;
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
  } finally {
    isSubmitting.value = false;
  }
};

const goBack = () => {
  router.push('/dashboard');
};
</script>

<style scoped>
.edit-bot-container {
  min-height: 100vh;
  background: var(--color-background);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.edit-bot-card {
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

.edit-header {
  text-align: center;
  margin-bottom: 1.2rem;
}

.edit-header h2 {
  color: var(--color-primary);
  font-size: 1.3rem;
  margin-bottom: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.edit-header p {
  color: #666;
  font-size: 0.98rem;
}

.input-group {
  margin-bottom: 1.1rem;
}

.input-group label {
  display: block;
  margin-bottom: 0.3rem;
  font-weight: 500;
  color: var(--color-dark-secondary);
}

.input-wrapper {
  position: relative;
}

.input-wrapper input,
.input-wrapper textarea {
  width: 100%;
  padding: 0.7rem 0.7rem 0.7rem 2.2rem;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  font-size: 0.97rem;
  background: white;
  transition: border-color 0.3s;
  font-family: inherit;
  box-sizing: border-box;
}

.input-wrapper textarea {
  min-height: 60px;
  resize: vertical;
}

.input-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1rem;
  color: var(--color-primary);
}

.input-wrapper input:focus,
.input-wrapper textarea:focus {
  border-color: var(--color-primary);
  outline: none;
}

.type-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.6rem;
}

.type-option {
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  padding: 0.7rem 0.7rem 0.7rem 0.7rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.type-option:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.type-option.selected {
  border-color: var(--color-primary);
  background: rgba(var(--color-primary-rgb), 0.07);
}

.type-icon {
  font-size: 1.1rem;
  color: var(--color-primary);
}

.type-texts {
  display: flex;
  flex-direction: column;
}

.type-name {
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 0.1rem;
}

.type-description {
  font-size: 0.85rem;
  color: #6c757d;
}

.button-group {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1.2rem;
}

.save-btn, .cancel-btn {
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

.save-btn {
  background: var(--color-primary);
  color: white;
}

.save-btn:hover:not(:disabled) {
  background: var(--color-dark-secondary);
  transform: translateY(-2px);
}

.cancel-btn {
  background: #f8f9fa;
  color: var(--color-dark-secondary);
}

.cancel-btn:hover {
  background: #e9ecef;
}

.save-btn:disabled {
  background: #e9ecef;
  cursor: not-allowed;
}

.error-message {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.5rem;
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
  .edit-bot-card {
    padding: 1.5rem;
  }

  .type-options {
    grid-template-columns: 1fr;
  }

  .button-group {
    flex-direction: column;
  }

  .save-btn, .cancel-btn {
    width: 100%;
    justify-content: center;
  }
}
</style> 