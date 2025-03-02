<template>
    <SideBarMenu />
    <PlanCards :plans="plans" :selectedPlan="selectedPlan" @plan-selected="handlePlanSelected" />
    <FormContact :plans="plans" :selectedPlan="selectedPlan" />
</template>
  
  <script setup>
  import { ref, nextTick } from 'vue'
  import PlanCards from '@/components/PlanCards.vue'
  import FormContact from '@/components/FormContact.vue'
  import SideBarMenu from '@/components/SideBarMenu.vue'
  
  const plans = [
    {
      name: "Plan Básico",
      subtitle: "Para emprendedores",
      description: "Accede a herramientas esenciales para iniciar.",
      price: "$19/mes",
      btnColor: "var(--color-primary)"
    },
    {
      name: "Plan Avanzado",
      subtitle: "Para negocios en crecimiento",
      description: "Optimiza y expande tu negocio con más funcionalidades.",
      price: "$49/mes",
      btnColor: "var(--color-secondary)"
    },
    {
      name: "Plan Premium",
      subtitle: "Para empresas consolidadas",
      description: "Todas las herramientas premium para un negocio exitoso.",
      price: "$99/mes",
      btnColor: "var(--color-dark-secondary)"
    }
  ];
  
  const selectedPlan = ref("");
  
  function handlePlanSelected(plan) {
    selectedPlan.value = plan.name;
    // Desplazar suavemente hacia el formulario después de actualizar el DOM
    nextTick(() => {
      setTimeout(() => {
        const form = document.getElementById("quote-form");
        if (form) {
          form.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
    });
  }
  </script>
  