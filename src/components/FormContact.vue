<template>
  <div class="container-form">
    <form @submit.prevent="submitForm" class="glassmorphism p-8 rounded-2xl shadow-lg w-full max-w-sm text-center">
      <h2 class="text-2xl font-bold text-light-secondary mb-5">Cotiza tu Plan</h2>

      <!-- Nombre -->
      <div class="text-left">
        <label class="block text-light-secondary font-semibold">Nombre</label>
        <input 
          v-model="formData.name"
          type="text"
          placeholder="Ingresa tu nombre"
          required
          class="input-field"
        />
      </div>

      <!-- Correo -->
      <div class="text-left mt-4">
        <label class="block text-light-secondary font-semibold">Correo Electrónico</label>
        <input 
          v-model="formData.email"
          type="email"
          placeholder="Ingresa tu correo"
          required
          class="input-field"
        />
      </div>

      <!-- Teléfono -->
      <div class="text-left mt-4">
        <label class="block text-light-secondary font-semibold">Teléfono</label>
        <input 
          v-model="formData.phone"
          type="tel"
          placeholder="Ingresa tu teléfono"
          required
          class="input-field"
        />
      </div>

      <!-- Selector de Planes -->
      <div class="text-left mt-4">
        <label class="block text-light-secondary font-semibold">Selecciona un Plan</label>
        <select v-model="formData.plan" required class="input-field-select">
          <option disabled value="">Elige un plan</option>
          <option v-for="plan in plans" :key="plan" :value="plan">{{ plan }}</option>
        </select>
      </div>

      <!-- Mensaje -->
      <div class="text-left mt-4">
        <label class="block text-light-secondary font-semibold">Mensaje</label>
        <textarea 
          v-model="formData.message"
          rows="3"
          class="input-field resize-none"
        ></textarea>
      </div>

      <!-- Botón de Envío -->
      <button type="submit" class="submit-btn mt-6">
        Enviar Cotización
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: "",
        email: "",
        phone: "",
        plan: "",
        message: "Estoy interesado en recibir una cotización para este plan.",
      },
      plans: ["Básico", "Estándar", "Premium", "Personalizado"],
    };
  },
  methods: {
    submitForm() {
      console.log("Formulario enviado:", this.formData);
      alert("Cotización enviada correctamente.");
    },
  },
};
</script>

<style scoped>

.container-form {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

/* Estilo Glassmorphism */
.glassmorphism {
  background: var(--color-primary);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 350px;
  justify-content: center;

}

/* Inputs y Select */
.input-field {
  width: 95%;
  padding: 12px;
  margin-top: 5px;
  margin-bottom: 15px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  outline: none;
  transition: 0.3s;
}

.input-field-select {
  width: 102%;
  padding: 12px;
  margin-top: 5px;
  margin-bottom: 15px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  outline: none;
  transition: 0.3s;
}

/* Efecto al enfocar */
.input-field::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.input-field:focus {
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.4);
}

/* Botón */
.submit-btn {
  width: 100%;
  background-color: var(--color-primary);
  color: white;
  font-weight: bold;
  padding: 12px;
  border-radius: 12px;
  transition: background 0.3s, transform 0.2s;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

/* Efecto hover */
.submit-btn:hover {
  background-color: var(--color-dark-secondary);
  transform: scale(1.05);
}

/* Texto */
.text-light-secondary {
  color: white;
}
</style>
