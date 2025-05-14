<template>
  <div class="create-bot-horizontal-container">
    <div class="horizontal-layout">
      <!-- Barra de pasos vertical -->
      <aside class="steps-sidebar">
        <h2><font-awesome-icon icon="robot" /> Crear Bot</h2>
        <ul class="steps-list">
          <li :class="{ active: currentStep === 1, completed: currentStep > 1 }">
            <span class="step-circle"><font-awesome-icon icon="plus" /></span>
            <span class="step-info">
              <span class="step-title">Básico</span>
              <span class="step-desc">Nombre y tipo</span>
            </span>
          </li>
          <li :class="{ active: currentStep === 2, completed: currentStep > 2 }">
            <span class="step-circle"><font-awesome-icon icon="cog" /></span>
            <span class="step-info">
              <span class="step-title">Personalización</span>
              <span class="step-desc">Idioma y estilo</span>
            </span>
          </li>
          <li :class="{ active: currentStep === 3 }">
            <span class="step-circle"><font-awesome-icon icon="clipboard-list" /></span>
            <span class="step-info">
              <span class="step-title">Revisión</span>
              <span class="step-desc">Resumen final</span>
            </span>
          </li>
        </ul>
      </aside>

      <!-- Contenido del paso -->
      <section class="step-content">
        <button class="btn-cancel-create" @click="goToDashboard">
          <font-awesome-icon icon="times" /> Cancelar
        </button>
        <form @submit.prevent="handleCreateBot" class="bot-form-horizontal">
          <!-- Paso 1: Información Básica -->
          <div v-show="currentStep === 1" class="form-step-horizontal">
            <h3>Información Básica</h3>
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
              <div class="type-options-horizontal">
                <div 
                  v-for="type in botTypes" 
                  :key="type.value"
                  class="type-option-horizontal"
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
          </div>

          <!-- Paso 2: Personalización -->
          <div v-show="currentStep === 2" class="form-step-horizontal">
            <h3>Personalización</h3>
            <div class="input-group">
              <label for="language">Idioma Principal</label>
              <div class="language-options-horizontal">
                <div 
                  v-for="lang in languages" 
                  :key="lang.value"
                  class="language-option-horizontal"
                  :class="{ selected: form.settings.language === lang.value }"
                  @click="selectLanguage(lang.value)"
                >
                  <span class="language-flag"><font-awesome-icon :icon="lang.icon" /></span>
                  <span class="language-name">{{ lang.label }}</span>
                </div>
              </div>
            </div>

            <div class="input-group">
              <label>Estilo de Respuesta</label>
              <div class="style-options-horizontal">
                <div 
                  v-for="style in responseStyles" 
                  :key="style.value"
                  class="style-option-horizontal"
                  :class="{ selected: form.settings.responseStyle === style.value }"
                  @click="selectResponseStyle(style.value)"
                >
                  <span class="style-icon"><font-awesome-icon :icon="style.icon" /></span>
                  <div class="style-content">
                    <span class="style-name">{{ style.label }}</span>
                    <span class="style-description">{{ style.description }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="input-group">
              <label class="toggle-label">
                <div class="toggle-switch">
                  <input 
                    type="checkbox" 
                    v-model="form.settings.enableHistory"
                    id="history"
                  >
                  <span class="toggle-slider"></span>
                </div>
                <div class="toggle-content">
                  <span class="toggle-title">Mantener historial de conversaciones</span>
                  <span class="toggle-description">Guarda el historial de interacciones para análisis y mejora continua</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Paso 3: Revisión -->
          <div v-show="currentStep === 3" class="review-ux-wrapper">
            <div class="review-ux-card">
              <div class="review-ux-header">
                <font-awesome-icon icon="check-circle" class="review-ux-check" />
                <div>
                  <h2>¡Revisa y confirma tu bot!</h2>
                  <p>Verifica los datos antes de crearlo. Puedes volver atrás si necesitas cambiar algo.</p>
                </div>
              </div>
              <ul class="review-ux-list">
                <li class="review-ux-item">
                  <font-awesome-icon icon="robot" class="ux-icon" />
                  <span class="ux-label">Nombre:</span>
                  <span class="ux-value">{{ form.name }}</span>
                </li>
                <li class="review-ux-item">
                  <font-awesome-icon :icon="getTypeIcon(form.type)" class="ux-icon" />
                  <span class="ux-label">Tipo:</span>
                  <span class="ux-value">{{ getBotTypeName(form.type) }}</span>
                </li>
                <li class="review-ux-item">
                  <font-awesome-icon icon="clipboard-list" class="ux-icon" />
                  <span class="ux-label">Descripción:</span>
                  <span class="ux-value ux-desc-value">
                    <span v-if="!showFullDesc">
                      <span class="desc-clamp">{{ form.description }}</span>
                      <span v-if="isDescLong"> <button class='see-more' @click="showFullDesc = true">ver más</button></span>
                    </span>
                    <span v-else>
                      {{ form.description }} <button class='see-more' @click="showFullDesc = false">ver menos</button>
                    </span>
                  </span>
                </li>
                <li class="review-ux-item">
                  <font-awesome-icon icon="language" class="ux-icon" />
                  <span class="ux-label">Idioma:</span>
                  <span class="ux-value">{{ form.settings.language === 'es' ? 'Español' : 'English' }}</span>
                </li>
                <li class="review-ux-item">
                  <font-awesome-icon :icon="getStyleIcon(form.settings.responseStyle)" class="ux-icon" />
                  <span class="ux-label">Estilo:</span>
                  <span class="ux-value">{{ getResponseStyleName(form.settings.responseStyle) }}</span>
                </li>
                <li class="review-ux-item">
                  <font-awesome-icon icon="comment" class="ux-icon" />
                  <span class="ux-label">Historial:</span>
                  <span class="ux-value">{{ form.settings.enableHistory ? 'Activado' : 'Desactivado' }}</span>
                </li>
              </ul>
              <button class="btn-create-ux" type="submit" @click="handleCreateBot" :disabled="isSubmitting">
                <font-awesome-icon icon="check-circle" /> {{ isSubmitting ? 'Creando...' : 'Crear Bot' }}
              </button>
            </div>
          </div>

          <div class="form-navigation-horizontal">
            <button 
              type="button" 
              class="nav-btn prev-btn" 
              v-if="currentStep > 1"
              @click="prevStep"
            >
              ← Anterior
            </button>
            <button 
              type="button" 
              class="nav-btn next-btn" 
              v-if="currentStep < 3"
              @click="nextStep"
              :disabled="!isStepValid"
            >
              Siguiente →
            </button>
          </div>
      </form>
      </section>
    </div>
    </div>
  </template>
  
  <script setup>
import { ref, computed } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import axios from '@/api/axios';
  import { useRouter } from 'vue-router';
  import { useUserStore } from '@/store/userStore';
  
  const router = useRouter();
  const userStore = useUserStore();
const isSubmitting = ref(false);
const currentStep = ref(1);

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

const languages = [
  {
    value: 'es',
    label: 'Español',
    icon: 'language'
  },
  {
    value: 'en',
    label: 'English',
    icon: 'language'
  }
];

const responseStyles = [
  {
    value: 'formal',
    label: 'Formal',
    icon: 'user-tie',
    description: 'Lenguaje profesional y estructurado'
  },
  {
    value: 'casual',
    label: 'Casual',
    icon: 'comments',
    description: 'Tono amigable y conversacional'
  },
  {
    value: 'professional',
    label: 'Profesional',
    icon: 'user',
    description: 'Balance entre formalidad y cercanía'
  }
];
  
  const form = ref({
    name: '',
    description: '',
  type: 'support',
  settings: {
    language: 'es',
    responseStyle: 'professional',
    enableHistory: true
  }
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

const isStepValid = computed(() => {
  switch (currentStep.value) {
    case 1:
      return form.value.name.length >= 3 &&
             form.value.description.length >= 10 &&
             form.value.type &&
             !Object.values(errors.value).some(error => error !== '');
    case 2:
      return true; // Todos los campos del paso 2 son opcionales
    default:
      return true;
  }
});

const isFormValid = computed(() => {
  return form.value.name.length >= 3 &&
         form.value.description.length >= 10 &&
         form.value.type &&
         !Object.values(errors.value).some(error => error !== '');
});

const getBotTypeName = (type) => {
  const found = botTypes.find(t => t.value === type);
  return found ? found.label : type;
};

const getResponseStyleName = (style) => {
  const found = responseStyles.find(s => s.value === style);
  return found ? found.label : style;
};

const selectType = (type) => {
  form.value.type = type;
  validateField('type');
};

const selectLanguage = (lang) => {
  form.value.settings.language = lang;
};

const selectResponseStyle = (style) => {
  form.value.settings.responseStyle = style;
};

const nextStep = () => {
  if (isStepValid.value) {
    currentStep.value++;
  }
};

const prevStep = () => {
  currentStep.value--;
};
  
  const handleCreateBot = async () => {
  if (!isFormValid.value) return;
  
  isSubmitting.value = true;
    try {
      await axios.post('/bots/create', form.value, {
        headers: { Authorization: `Bearer ${userStore.token}` },
      });
      alert('✅ Bot creado correctamente');
      router.push('/dashboard');
    } catch (err) {
      console.error('❌ Error al crear bot:', err);
    alert('Hubo un error al crear el bot. Por favor, intenta nuevamente.');
  } finally {
    isSubmitting.value = false;
    }
  };

  const getTypeIcon = (type) => {
    const found = botTypes.find(t => t.value === type);
    return found ? found.icon : 'robot';
  };

  const getStyleIcon = (style) => {
    const found = responseStyles.find(s => s.value === style);
    return found ? found.icon : 'user';
  };

  const goToDashboard = () => {
    router.push('/dashboard');
  };

  const goToStep = (step) => {
    currentStep.value = step;
  };

  const showFullDesc = ref(false);
  const isDescLong = computed(() => form.value.description.length > 80);
  const shortDesc = computed(() => form.value.description.slice(0, 80));
  </script>
  
  <style scoped>
.create-bot-horizontal-container {
  min-height: 100vh;
  max-height: 100vh;
  background: var(--color-background);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  overflow: auto;
}
.horizontal-layout {
  display: flex;
  background: var(--color-light-secondary);
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  width: 1100px;
  min-height: 0;
  max-height: 88vh;
  overflow-y: auto;
  padding: 1.2rem 0.7rem;
}
.steps-sidebar {
  width: 210px;
  background: white;
  padding: 1.2rem 0.7rem;
  border-right: 1px solid #f0ede5;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.steps-sidebar h2 {
  font-size: 1.15rem;
  color: var(--color-primary);
  margin-bottom: 1.2rem;
  font-weight: 700;
}
.steps-list {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
}
.steps-list li {
  display: flex;
  align-items: center;
  margin-bottom: 1.1rem;
  transition: color 0.2s;
}
.step-circle {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #e9ecef;
  color: var(--color-dark-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1rem;
  margin-right: 0.7rem;
  transition: background 0.3s, color 0.3s;
}
.steps-list li.active .step-circle {
  background: var(--color-primary);
  color: white;
}
.steps-list li.completed .step-circle {
  background: var(--color-accent);
  color: white;
}
.step-info {
  display: flex;
  flex-direction: column;
}
.step-title {
  font-weight: 600;
  color: var(--color-primary);
  font-size: 0.97rem;
}
.step-desc {
  color: #8b8b8b;
  font-size: 0.85rem;
}
.step-content {
  flex: 1;
  padding: 1.2rem 1.2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}
.bot-form-horizontal {
  width: 100%;
}
.form-step-horizontal {
  max-width: 520px;
  margin: 0 auto;
  animation: fadeIn 0.3s ease;
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
}
.input-wrapper input:focus,
.input-wrapper textarea:focus {
  border-color: var(--color-primary);
  outline: none;
}
.type-options-horizontal {
  display: flex;
  gap: 0.7rem;
}
.type-option-horizontal {
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  padding: 0.7rem 0.7rem;
  cursor: pointer;
  min-width: 150px;
  flex: 1;
  transition: border-color 0.3s, background 0.3s;
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}
.type-option-horizontal.selected {
  border-color: var(--color-primary);
  background: rgba(var(--color-primary-rgb), 0.07);
}
.type-icon {
  font-size: 1.1rem;
  margin-top: 0.1rem;
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
.language-options-horizontal,
.style-options-horizontal {
  display: flex;
  gap: 0.7rem;
}
.language-option-horizontal,
.style-option-horizontal {
  background: #f8f9fa;
  border: 2px solid #e9ecef;
    border-radius: 12px;
  padding: 0.7rem 0.7rem;
  cursor: pointer;
  min-width: 120px;
  flex: 1;
  transition: border-color 0.3s, background 0.3s;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.language-option-horizontal.selected,
.style-option-horizontal.selected {
  border-color: var(--color-primary);
  background: rgba(var(--color-primary-rgb), 0.07);
}
.language-flag,
.style-icon {
  font-size: 1rem;
}
.language-name,
.style-name {
  font-weight: 500;
  color: var(--color-dark-secondary);
}
.style-content {
    display: flex;
    flex-direction: column;
}
.style-description {
  font-size: 0.85rem;
  color: #6c757d;
}
.toggle-label {
  display: flex;
  align-items: center;
    gap: 0.5rem;
  cursor: pointer;
}
.toggle-switch {
  position: relative;
  width: 38px;
  height: 22px;
}
.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #e9ecef;
  transition: .4s;
  border-radius: 34px;
}
.toggle-slider:before {
  position: absolute;
  content: "";
  height: 14px;
  width: 14px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}
input:checked + .toggle-slider {
  background-color: var(--color-primary);
}
input:checked + .toggle-slider:before {
  transform: translateX(16px);
}
.toggle-content {
  flex: 1;
}
.toggle-title {
  display: block;
  font-weight: 500;
  color: var(--color-dark-secondary);
  margin-bottom: 0.1rem;
}
.toggle-description {
  font-size: 0.8rem;
  color: #6c757d;
}
.review-ux-wrapper {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 1rem;
  animation: fadeInUp 0.5s;
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
.review-ux-card {
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  padding: 1rem 0.7rem 0.7rem 0.7rem;
  min-width: 220px;
  max-width: 340px;
  width: 100%;
}
.review-ux-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.7rem;
}
.review-ux-check {
  color: var(--color-accent);
  font-size: 1.2rem;
}
.review-ux-header h2 {
  margin: 0;
  font-size: 1rem;
  color: var(--color-primary);
  font-weight: 700;
}
.review-ux-header p {
  margin: 0;
  color: #888;
  font-size: 0.9rem;
}
.review-ux-list {
  list-style: none;
  padding: 0;
  margin: 0 0 0.7rem 0;
}
.review-ux-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
    font-size: 1rem;
  margin-bottom: 0.2rem;
  color: #333;
  border-radius: 7px;
  padding: 0.4rem 0.3rem;
  transition: background 0.18s;
}
.review-ux-item:hover {
  background: var(--color-light-secondary);
}
.ux-icon {
  font-size: 0.95rem;
  color: var(--color-primary);
  min-width: 1.2rem;
  margin-top: 0.1rem;
}
.ux-label {
  font-weight: 600;
  color: var(--color-dark-secondary);
  min-width: 70px;
}
.ux-value {
  color: #444;
  word-break: break-word;
  flex: 1;
}
.ux-desc-value {
  max-width: 150px;
  display: inline-block;
  vertical-align: middle;
  line-height: 1.4;
}
.see-more {
  background: none;
  border: none;
  color: var(--color-primary);
  font-size: 0.85rem;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
  margin-left: 0.2rem;
}
.see-more:hover {
  color: var(--color-accent);
}
.btn-create-ux {
  margin: 1.2rem auto 0 auto;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.1rem;
    background: var(--color-primary);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 0.97rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  transition: background 0.2s, transform 0.2s;
}
.btn-create-ux:hover {
  background: var(--color-dark-secondary);
  transform: translateY(-2px) scale(1.03);
}
.form-navigation-horizontal {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.1rem;
}
.nav-btn {
  padding: 0.7rem 1.2rem;
  border: none;
  border-radius: 8px;
  font-size: 0.97rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}
.prev-btn {
  background: #f8f9fa;
  color: var(--color-dark-secondary);
}
.next-btn {
  background: var(--color-primary);
  color: white;
}
.next-btn:disabled {
  background: #e9ecef;
  cursor: not-allowed;
}
.prev-btn:hover {
  background: #e9ecef;
}
.next-btn:hover:not(:disabled) {
  background: var(--color-dark-secondary);
  transform: translateY(-2px);
}
.error-message {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}
.btn-cancel-create {
  position: absolute;
  top: 2.2rem;
  right: 2.5rem;
  background: #fff;
  color: var(--color-primary);
  border: 1.5px solid var(--color-primary);
  border-radius: 8px;
  padding: 0.4rem 0.8rem;
  font-size: 0.97rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
    cursor: pointer;
  transition: background 0.2s, color 0.2s, border 0.2s;
  z-index: 10;
}
.btn-cancel-create:hover {
  background: var(--color-primary);
  color: #fff;
  border-color: var(--color-primary);
}
@media (max-width: 1000px) {
  .horizontal-layout {
    flex-direction: column;
    width: 100%;
    min-width: unset;
  }
  .steps-sidebar {
    flex-direction: row;
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #f0ede5;
    padding: 1.5rem 1rem;
    align-items: center;
    justify-content: center;
  }
  .steps-list {
    display: flex;
    flex-direction: row;
    width: auto;
    gap: 2rem;
  }
  .step-content {
    padding: 2rem 1rem;
  }
  }
.compact-desc-box {
  display: inline-block;
  max-width: 220px;
  max-height: 60px;
  overflow-y: auto;
  background: var(--color-light-secondary);
  border-radius: 6px;
  padding: 0.4rem 0.7rem;
  font-size: 0.97rem;
  color: #444;
  vertical-align: middle;
  margin-left: 0.3rem;
  line-height: 1.4;
  box-sizing: border-box;
  }
.desc-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  max-width: 210px;
  line-height: 1.4;
}
  </style>
  