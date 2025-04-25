<template>
  <div class="contact-page">
    <HeaderNav />

    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1>¿Listo para transformar tu atención al cliente?</h1>
        <p>Elige el plan que mejor se adapte a tu negocio y comienza a automatizar hoy mismo</p>
      </div>
    </section>

    <!-- Planes -->
    <section class="plans-section">
      <div class="section-title">
        <h2>Elige el Plan Ideal para tu Negocio</h2>
        <p>Todas las suscripciones incluyen acceso a nuestras funciones principales</p>
      </div>
      <PlanCards 
        :plans="plans" 
        :selectedPlan="selectedPlan" 
        @plan-selected="handlePlanSelected" 
      />
    </section>

    <!-- Formulario y Contacto -->
    <section class="contact-section" id="contact-form-section">
      <div class="contact-container">
        <div class="contact-info">
          <h2>Contáctanos</h2>
          <p>Completa el formulario y un especialista se pondrá en contacto contigo para brindarte la mejor solución para tu negocio.</p>
          
          <div class="contact-methods">
            <div class="contact-method">
              <font-awesome-icon icon="envelope" class="contact-icon" />
              <div>
                <h3>Email</h3>
                <p>info@asesoria.com</p>
              </div>
            </div>
            
            <div class="contact-method">
              <font-awesome-icon icon="phone" class="contact-icon" />
              <div>
                <h3>Teléfono</h3>
                <p>+52 (55) 1234 5678</p>
              </div>
            </div>
            
            <div class="contact-method">
              <font-awesome-icon icon="map-marker-alt" class="contact-icon" />
              <div>
                <h3>Ubicación</h3>
                <p>Ciudad de México, México</p>
              </div>
            </div>
          </div>
          
          <div class="service-hours">
            <h3>Horario de Atención</h3>
            <p>Lunes a Viernes: 9:00 - 18:00</p>
          </div>
        </div>
        
        <div class="form-container">
          <FormContact :plans="plans" :selectedPlan="selectedPlan" />
        </div>
      </div>
    </section>

    <!-- FAQs Sección -->
    <section class="faq-section">
      <div class="section-title">
        <h2>Preguntas Frecuentes</h2>
        <p>Respuestas a las dudas más comunes</p>
      </div>
      
      <div class="faq-container">
        <div class="faq-item">
          <h3>¿Cuánto tiempo toma implementar un chatbot?</h3>
          <p>La mayoría de nuestros clientes tienen su bot funcionando en menos de 48 horas. El proceso de subir documentos y configuración básica toma minutos.</p>
        </div>
        
        <div class="faq-item">
          <h3>¿Puedo cambiar de plan más adelante?</h3>
          <p>Sí, puedes actualizar o cambiar tu plan en cualquier momento. Nos adaptamos a las necesidades de tu negocio a medida que crecen.</p>
        </div>
        
        <div class="faq-item">
          <h3>¿Necesito conocimientos técnicos para implementarlo?</h3>
          <p>No. Nuestra plataforma está diseñada para ser totalmente amigable. Si puedes subir un archivo a Drive, puedes configurar tu bot en AsesorIA.</p>
        </div>
        
        <div class="faq-item">
          <h3>¿Ofrecen soporte técnico?</h3>
          <p>Sí, todos nuestros planes incluyen soporte técnico personalizado para ayudarte en todo momento con tu implementación.</p>
        </div>
      </div>
    </section>
  </div>
</template>
  
<script setup>
import { ref, nextTick } from 'vue'
import PlanCards from '@/components/PlanCards.vue'
import FormContact from '@/components/FormContact.vue'
import HeaderNav from '@/components/HeaderNav.vue'
  
const plans = [
  {
    name: "Plan Básico",
    subtitle: "Para emprendedores",
    description: "Accede a herramientas esenciales para iniciar.",
    price: "$19/mes",
    btnColor: "var(--color-primary)",
    features: ["1 chatbot", "500 consultas/mes", "Soporte por email"]
  },
  {
    name: "Plan Avanzado",
    subtitle: "Para negocios en crecimiento",
    description: "Optimiza y expande tu negocio con más funcionalidades.",
    price: "$49/mes",
    btnColor: "var(--color-secondary)",
    features: ["3 chatbots", "5,000 consultas/mes", "Soporte prioritario", "Integración WhatsApp"]
  },
  {
    name: "Plan Premium",
    subtitle: "Para empresas consolidadas",
    description: "Todas las herramientas premium para un negocio exitoso.",
    price: "$99/mes",
    btnColor: "var(--color-dark-secondary)",
    features: ["Chatbots ilimitados", "Consultas ilimitadas", "Soporte 24/7", "Integraciones personalizadas", "API acceso"]
  }
];
  
const selectedPlan = ref("");
  
function handlePlanSelected(plan) {
  selectedPlan.value = plan.name;
  // Desplazar suavemente hacia el formulario después de actualizar el DOM
  nextTick(() => {
    setTimeout(() => {
      const form = document.getElementById("contact-form-section");
      if (form) {
        form.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 300);
  });
}
</script>
  
<style scoped>
/* Variables de colores ya existen en la aplicación */
:root {
  --color-primary-rgb: 173, 139, 115; /* RGB de #AD8B73 */
}

/* Estilos generales */
.contact-page {
  font-family: 'Open Sans', sans-serif;
  color: #333;
  background-color: var(--color-background);
}

/* Hero Section */
.hero-section {
  position: relative;
  height: 50vh;
  min-height: 400px;
  background-image: url('https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(73, 59, 49, 0.75);
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  padding: 0 20px;
}

.hero-content h1 {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
}

.hero-content p {
  font-size: 1.2rem;
  opacity: 0.9;
}

/* Section Titles */
.section-title {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title h2 {
  font-size: 2.5rem;
  color: var(--color-primary);
  margin-bottom: 0.5rem;
}

.section-title p {
  font-size: 1.2rem;
  color: #555;
}

/* Planes Section */
.plans-section {
  padding: 5rem 2rem;
}

/* Contact Section */
.contact-section {
  padding: 5rem 2rem;
  background-color: var(--color-light-secondary);
}

.contact-container {
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
}

.contact-info {
  flex: 1;
  min-width: 300px;
}

.contact-info h2 {
  font-size: 2rem;
  color: var(--color-primary);
  margin-bottom: 1rem;
}

.contact-info > p {
  margin-bottom: 2rem;
  font-size: 1.1rem;
  color: #555;
}

.contact-methods {
  margin-bottom: 2rem;
}

.contact-method {
  display: flex;
  margin-bottom: 1.5rem;
  align-items: flex-start;
}

.contact-icon {
  font-size: 1.5rem;
  color: var(--color-primary);
  margin-right: 1rem;
  width: 24px;
}

.contact-method h3 {
  font-size: 1.2rem;
  color: var(--color-dark-secondary);
  margin-bottom: 0.3rem;
}

.service-hours {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #ddd;
}

.service-hours h3 {
  font-size: 1.2rem;
  color: var(--color-dark-secondary);
  margin-bottom: 0.5rem;
}

.form-container {
  flex: 1;
  min-width: 300px;
}

/* FAQ Section */
.faq-section {
  padding: 5rem 2rem;
  background-color: #f9f9f9;
}

.faq-container {
  max-width: 900px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 2rem;
}

.faq-item {
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  transition: transform 0.3s ease;
}

.faq-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

.faq-item h3 {
  font-size: 1.2rem;
  color: var(--color-primary);
  margin-bottom: 0.8rem;
}

.faq-item p {
  color: #555;
  line-height: 1.6;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2.2rem;
  }
  
  .contact-container {
    flex-direction: column;
  }
  
  .faq-container {
    grid-template-columns: 1fr;
  }
}
</style>
  