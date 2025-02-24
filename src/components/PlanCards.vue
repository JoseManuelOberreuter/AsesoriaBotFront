<template>
  <v-container class="full-height d-flex flex-column align-center justify-center">
    <h1 class="mb-5 text-center font-weight-bold title">Elige tu Plan</h1>
    <v-row class="plan-container" justify="center" align="center">
      <v-col
        v-for="(plan, index) in plans"
        :key="index"
        cols="12" sm="6" md="4"
        class="d-flex justify-center"
      >
        <v-card
          class="plan-card"
          :class="{ selected: selectedPlan === plan.name }"
          outlined
          @click="selectPlan(plan)"
        >
          <v-card-title class="text-h5 font-weight-bold text-center plan-title">
            {{ plan.name }}
          </v-card-title>
          <v-card-subtitle class="text-center subtitle">
            {{ plan.subtitle }}
          </v-card-subtitle>
          <v-card-text class="text-center">
            <p>{{ plan.description }}</p>
            <h2 class="price">{{ plan.price }}</h2>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn 
              :color="plan.btnColor" 
              dark 
              @click.stop="selectPlan(plan)" 
              elevation="2" 
              class="select-btn"
              :aria-label="`Seleccionar plan ${plan.name}`"
            >
              Seleccionar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  plans: {
    type: Array,
    required: true
  },
  selectedPlan: {
    type: String,
    default: ''
  }
});
const emit = defineEmits(['plan-selected']);

function selectPlan(plan) {
  emit('plan-selected', plan);
}
</script>

<style scoped>
.full-height {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--color-background);
}

.title {
  font-size: 2.5rem;
  color: var(--color-primary);
  margin-bottom: 20px;
}

.plan-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 40px;
  width: 100%;
}

.plan-card {
  width: 100%;
  max-width: 320px;
  padding: 20px;
  text-align: center;
  border-radius: 15px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background: var(--color-light-secondary);
  min-height: 380px;
  border: 2px solid var(--color-primary);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.plan-card:hover {
  transform: scale(1.05);
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  border: 3px solid var(--color-dark-secondary);
}

.selected {
  border: 3px solid var(--color-dark-secondary);
  background-color: var(--color-light-secondary);
}

.price {
  font-weight: bold;
  font-size: 1.8rem;
  color: var(--color-dark-secondary);
  margin-top: 10px;
}

.select-btn {
  border-radius: 5px;
  width: 100%;
  background-color: var(--color-secondary);
  color: white;
  font-weight: bold;
  padding: 8px 12px;
  text-transform: uppercase;
  font-size: 14px;
  transition: 0.5s;
}
.select-btn:hover {
  background-color: var(--color-dark-secondary);
}
</style>
