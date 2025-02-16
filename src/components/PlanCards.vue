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
                aria-label="Seleccionar plan {{ plan.name }}"
              >
                Seleccionar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        email: '',
        selectedPlan: '',
        message: '',
        plans: [
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
        ]
      };
    },
    methods: {
      selectPlan(plan) {
        this.selectedPlan = plan.name;
        this.message = `Hola, estoy interesado en el ${plan.name}. ¿Podrían enviarme más información?`;
        
        // Desplazamiento suave al formulario con un pequeño retraso para asegurar que el DOM esté actualizado
        this.$nextTick(() => {
          setTimeout(() => {
            const form = document.getElementById("quote-form");
            if (form) {
              form.scrollIntoView({ behavior: "smooth", block: "start" });
            }
  
            // Poner foco en el select del formulario para mejorar la experiencia del usuario
            if (this.$refs.planSelect) {
              this.$refs.planSelect.focus();
            }
          }, 300);
        });
      },
      submitForm() {
        alert(`Formulario enviado con éxito para el ${this.selectedPlan}`);
        this.resetForm();
      },
      resetForm() {
        this.name = "";
        this.email = "";
        this.selectedPlan = "";
        this.message = "";
      }
    }
  };
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
  background: #fffdf5; /* Color más claro para mejor visibilidad */
  min-height: 380px;
  border: 2px solid var(--color-primary);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}


  
  .plan-card:hover {
    transform: scale(1.05);
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  }
  
  .selected {
    border: 3px solid var(--color-secondary);
    background-color: rgba(206, 171, 147, 0.3);
  }
  
  .price {
    font-weight: bold;
    font-size: 1.8rem;
    color: var(--color-dark-secondary);
    margin-top: 10px;
  }
  
.select-btn {
  width: 100%; /* Ocupa todo el ancho */
  background-color: var(--color-secondary);
  color: white;
  font-weight: bold;
  padding: 8px 12px;
  text-transform: uppercase;
  font-size: 14px;
}
  
.form-card {
  background: white;
  padding: 20px;
  border: 2px solid var(--color-primary);
  width: 100%;
  max-width: 500px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.v-card-actions {
  display: flex;
  justify-content: center;
}
  
  .form-title {
    color: var(--color-primary);
    font-size: 1.8rem;
    margin-bottom: 20px;
  }
  </style>
  