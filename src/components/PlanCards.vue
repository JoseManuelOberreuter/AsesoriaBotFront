<template>
  <div class="pricing-section">
    <div class="plan-container">
      <div 
        v-for="(plan, index) in plans" 
        :key="index" 
        class="pricing-card"
        :class="{ 
          'popular': index === 1,
          'selected': selectedPlan === plan.name 
        }"
      >
        <div class="card-header">
          <span v-if="index === 1" class="popular-badge">Más Popular</span>
          <h3 class="plan-name">{{ plan.name }}</h3>
          <p class="plan-subtitle">{{ plan.subtitle }}</p>
        </div>
        
        <div class="price-block">
          <h2 class="price">{{ plan.price }}</h2>
          <p class="price-period">por mes</p>
        </div>
        
        <div class="plan-description">
          <p>{{ plan.description }}</p>
        </div>
        
        <div class="features-list">
          <div v-for="(feature, i) in plan.features" :key="i" class="feature-item">
            <font-awesome-icon icon="check-circle" class="feature-icon" />
            <span>{{ feature }}</span>
          </div>
        </div>
        
        <button 
          @click="selectPlan(plan)" 
          class="select-plan-btn"
          :style="{ backgroundColor: index === 1 ? 'var(--color-dark-secondary)' : plan.btnColor }"
        >
          Seleccionar Plan
        </button>
      </div>
    </div>
  </div>
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
.pricing-section {
  padding: 20px 0;
  width: 100%;
}

.plan-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  max-width: 1100px;
  margin: 0 auto;
  padding: 10px;
}

.pricing-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
  width: 280px;
  padding: 25px 20px;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.pricing-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
}

.pricing-card.popular {
  transform: scale(1.03);
  z-index: 2;
  border: 2px solid var(--color-dark-secondary);
}

.pricing-card.popular:hover {
  transform: scale(1.03) translateY(-7px);
}

.pricing-card.selected {
  border: 3px solid var(--color-primary);
  background-color: rgba(var(--color-primary-rgb), 0.03);
}

.popular-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-dark-secondary);
  color: white;
  padding: 4px 12px;
  border-radius: 30px;
  font-size: 0.7rem;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card-header {
  text-align: center;
  padding-bottom: 12px;
  margin-bottom: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.07);
}

.plan-name {
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--color-primary);
  margin-bottom: 3px;
}

.plan-subtitle {
  font-size: 0.8rem;
  color: #666;
}

.price-block {
  text-align: center;
  margin-bottom: 20px;
}

.price {
  font-size: 2.1rem;
  font-weight: bold;
  color: var(--color-dark-secondary);
  margin-bottom: 0;
}

.price-period {
  font-size: 0.8rem;
  color: #666;
  margin-top: 3px;
}

.plan-description {
  text-align: center;
  margin-bottom: 20px;
  font-size: 0.85rem;
  color: #555;
  line-height: 1.4;
}

.features-list {
  margin-bottom: 20px;
  flex-grow: 1;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 8px;
  font-size: 0.85rem;
}

.feature-icon {
  color: var(--color-primary);
  margin-right: 8px;
  font-size: 0.9rem;
  margin-top: 2px;
}

.select-plan-btn {
  width: 100%;
  padding: 10px 0;
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 25px;
  font-weight: bold;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.select-plan-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

@media (max-width: 992px) {
  .plan-container {
    max-width: 900px;
  }
  
  .pricing-card {
    width: 250px;
    padding: 20px 15px;
  }
}

@media (max-width: 768px) {
  .plan-container {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  
  .pricing-card {
    width: 100%;
    max-width: 300px;
    margin-bottom: 30px;
  }
  
  .pricing-card.popular {
    transform: none;
    order: -1;
  }
  
  .pricing-card.popular:hover {
    transform: translateY(-10px);
  }
}

@media (max-width: 480px) {
  .pricing-card {
    max-width: 280px;
    padding: 20px 15px;
  }
  
  .price {
    font-size: 1.8rem;
  }
  
  .feature-item {
    font-size: 0.8rem;
  }
}
</style>
