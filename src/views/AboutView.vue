<template>
    <div class="about-container">
      <HeaderNav />
      
      <!-- Hero / Encabezado Mejorado -->
      <section class="hero">
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <h1>Transformamos la atención al cliente <br><span class="highlight">con inteligencia artificial</span></h1>
          <p>Chatbots inteligentes que entienden y responden como expertos humanos, sin necesidad de programar.</p>
          <div class="hero-buttons">
            <router-link to="/contact" class="cta-button primary">Solicitar Demo</router-link>
            <router-link to="/register" class="cta-button secondary">Comenzar Gratis</router-link>
          </div>
        </div>
      </section>

      <!-- Estadísticas Impactantes -->
      <div class="stats-container">
        <div class="stat-item">
          <h3>95%</h3>
          <p>Reducción en tiempos de respuesta</p>
        </div>
        <div class="stat-item">
          <h3>24/7</h3>
          <p>Disponibilidad garantizada</p>
        </div>
        <div class="stat-item">
          <h3>+40%</h3>
          <p>Aumento en satisfacción del cliente</p>
        </div>
        <div class="stat-item">
          <h3>-60%</h3>
          <p>Reducción en costos operativos</p>
        </div>
      </div>
  
      <!-- Sección: Quiénes Somos -->
      <section class="section">
        <div class="content">
          <div class="text fade-in">
            <h2><span class="highlight-text">Revolucionamos</span> la forma en que las empresas se comunican</h2>
            <p>
                En <strong>AsesorIA</strong>, ayudamos a las empresas a 
                <strong>automatizar procesos</strong> y <strong>optimizar la comunicación</strong> 
                con inteligencia artificial personalizada a tu negocio.
            </p>
            <div class="key-points">
              <div class="key-point">
                <span class="check-icon"><font-awesome-icon icon="check-circle" /></span>
                <span>Chatbots entrenados con tu documentación específica</span>
              </div>
              <div class="key-point">
                <span class="check-icon"><font-awesome-icon icon="check-circle" /></span>
                <span>Implementación en minutos, no en semanas</span>
              </div>
              <div class="key-point">
                <span class="check-icon"><font-awesome-icon icon="check-circle" /></span>
                <span>Respuestas precisas sin necesidad de programar</span>
              </div>
              <div class="key-point">
                <span class="check-icon"><font-awesome-icon icon="check-circle" /></span>
                <span>Soporte técnico local y personalizado</span>
              </div>
            </div>
          </div>
          <div class="image-container fade-in-right">
            <div class="image-frame">
              <img src="@/assets/LogoAsesoriaBot.png" alt="AsesorIA en acción" class="main-image">
            </div>
          </div>
        </div>
      </section>
  
      <!-- Sección: Propuesta de Valor (mejorada) -->
      <section class="section light-bg">
        <div class="section-header">
          <h2>¿Cómo <span class="highlight-text">transformamos</span> tu negocio?</h2>
          <p class="section-subtitle">Nuestra plataforma integra la IA más avanzada con la simplicidad que tu negocio necesita</p>
        </div>
        <div class="value-grid">
          <div class="value-card">
            <div class="icon-container">
              <div class="icon"><font-awesome-icon icon="robot" /></div>
            </div>
            <h3>Automatización Inteligente</h3>
            <p>Chatbots que responden con precisión utilizando tu base de conocimiento específica, sin programación complicada.</p>
          </div>
          <div class="value-card">
            <div class="icon-container">
              <div class="icon"><font-awesome-icon icon="paperclip" /></div>
            </div>
            <h3>Integración Empresarial</h3>
            <p>Compatible con WhatsApp, tu sitio web, Slack, HubSpot, Salesforce y cualquier servicio en la nube que necesites.</p>
          </div>
          <div class="value-card">
            <div class="icon-container">
              <div class="icon"><font-awesome-icon icon="chart-bar" /></div>
            </div>
            <h3>Optimización de Procesos</h3>
            <p>Reduce tiempos de respuesta de horas a segundos. Tu equipo podrá enfocarse en tareas de mayor valor agregado.</p>
          </div>
        </div>
      </section>

      <!-- Casos de Éxito (Nueva sección) -->
      <section class="section success-cases">
        <div class="section-header">
          <h2>Casos de <span class="highlight-text">Éxito</span></h2>
          <p class="section-subtitle">Empresas que ya transformaron su atención al cliente con AsesorIA</p>
        </div>
        
        <div class="case-studies">
          <div class="case-card">
            <div class="case-content">
              <h3>Inmobiliaria Norte</h3>
              <p class="case-highlight">83% menos consultas repetitivas</p>
              <p>"AsesorIA nos permitió responder preguntas sobre propiedades las 24 horas, aumentando un 27% las citas concretadas."</p>
              <p class="case-author">— María Sánchez, Dir. Marketing</p>
            </div>
          </div>
          
          <div class="case-card">
            <div class="case-content">
              <h3>Seguros Protección</h3>
              <p class="case-highlight">65% reducción en costos de call center</p>
              <p>"Nuestros clientes obtienen información sobre pólizas al instante, sin esperas. La satisfacción aumentó un 42%."</p>
              <p class="case-author">— Roberto Díaz, CEO</p>
            </div>
          </div>
          
          <div class="case-card">
            <div class="case-content">
              <h3>Tech Solutions</h3>
              <p class="case-highlight">90% de consultas resueltas sin intervención humana</p>
              <p>"Implementamos el chatbot en 3 días. Ahora nuestro equipo técnico solo gestiona casos realmente complejos."</p>
              <p class="case-author">— Ana López, CTO</p>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Sección: Beneficios (mejorada) -->
      <section class="section dark-bg">
        <div class="section-header light">
          <h2>¿Por qué elegir <span class="highlight-text-light">AsesorIA</span>?</h2>
          <p class="section-subtitle">Tecnología avanzada con enfoque humano</p>
        </div>
        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon"><font-awesome-icon icon="plus" /></div>
            <h3>Implementación en Días, No Meses</h3>
            <p>Configuración simple en la nube. Sube tus documentos y estarás listo para comenzar.</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon"><font-awesome-icon icon="cog" /></div>
            <h3>Personalización Total</h3>
            <p>Tu bot habla con la voz y estilo de tu marca, utilizando tus documentos como base de conocimiento.</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon"><font-awesome-icon icon="chart-bar" /></div>
            <h3>Análisis Detallado</h3>
            <p>Reportes sobre qué preguntan tus clientes, qué necesitan y cómo mejorar tu servicio.</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon"><font-awesome-icon icon="lock" /></div>
            <h3>Seguridad Avanzada</h3>
            <p>Tus datos están protegidos con cifrado de nivel bancario y controles de acceso rigurosos.</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon"><font-awesome-icon icon="comment" /></div>
            <h3>Multicanal</h3>
            <p>Integración con WhatsApp, web, aplicaciones móviles y cualquier canal que uses con tus clientes.</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon"><font-awesome-icon icon="user" /></div>
            <h3>Soporte Local</h3>
            <p>Equipo de soporte y configuración en español, siempre disponible para ayudarte.</p>
          </div>
        </div>
      </section>

      <!-- Preguntas Frecuentes (Nueva sección) -->
      <section class="section faq-section">
        <div class="section-header">
          <h2>Preguntas <span class="highlight-text">Frecuentes</span></h2>
        </div>
        <div class="faq-container">
          <div class="faq-item">
            <h3>¿Qué tipo de documentos puedo usar para entrenar mi bot?</h3>
            <p>Puedes usar PDFs, Word, Excel, presentaciones y prácticamente cualquier documento de texto. Nuestro sistema extraerá la información relevante automáticamente.</p>
          </div>
          <div class="faq-item">
            <h3>¿Necesito conocimientos técnicos para implementarlo?</h3>
            <p>No. Nuestra plataforma está diseñada para ser totalmente amigable. Si puedes subir un archivo a Drive, puedes configurar tu bot en AsesorIA.</p>
          </div>
          <div class="faq-item">
            <h3>¿Cuánto tiempo toma implementar un chatbot?</h3>
            <p>La mayoría de nuestros clientes tienen su bot funcionando en menos de 48 horas. El proceso de subir documentos y configuración básica toma minutos.</p>
          </div>
          <div class="faq-item">
            <h3>¿Cómo se integra con mi sitio web o WhatsApp?</h3>
            <p>Te proporcionamos un código simple para insertar en tu sitio. Para WhatsApp, configuramos todo por ti a través de nuestra integración oficial.</p>
          </div>
        </div>
      </section>
  
      <!-- CTA Contacto (mejorado) -->
      <section class="cta">
        <div class="cta-content">
          <h2>Transforma tu atención al cliente hoy mismo</h2>
          <p>Únete a cientos de empresas que ya están ahorrando tiempo y recursos mientras mejoran su servicio al cliente.</p>
          <div class="cta-buttons">
            <router-link to="/contact" class="cta-button">Solicitar Demo Personalizada</router-link>
            <router-link to="/register" class="cta-button outline">Comenzar Gratis</router-link>
          </div>
          <p class="guarantee">30 días de garantía de satisfacción. Sin compromisos.</p>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  import HeaderNav from '@/components/HeaderNav.vue';
  
  export default {
    name: 'AboutUs',
    components: {
      HeaderNav
    }
  }
  </script>
  
  <style scoped>
  /* Variables de colores */
  :root {
    --color-primary: #AD8B73;
    --color-secondary: #CEAB93;
    --color-background: #E3CAA5;
    --color-light-secondary: #FFFBE9;
    --color-dark-secondary: #889E73;
  }
  
  /* Estilos generales */
  .about-container {
    font-family: 'Open Sans', sans-serif;
    background-color: var(--color-background);
    color: #333;
    overflow-x: hidden;
  }
  
  /* Hero Mejorado */
  .hero {
    position: relative;
    background-color: var(--color-primary);
    background-image: url('https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80');
    background-size: cover;
    background-position: center;
    color: white;
    text-align: left;
    padding: 120px 5% 100px;
    margin-top: 0;
  }

  .hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(73, 59, 49, 0.8);
    z-index: 1;
  }

  .hero-content {
    position: relative;
    z-index: 2;
    max-width: 800px;
  }
  
  .hero h1 {
    font-size: 3.5rem;
    font-weight: 800;
    line-height: 1.2;
    margin-bottom: 1.5rem;
  }
  
  .hero p {
    font-size: 1.5rem;
    max-width: 700px;
    margin-bottom: 2rem;
    opacity: 0.9;
  }

  .highlight {
    color: var(--color-light-secondary);
  }

  .hero-buttons {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }

  /* Estadísticas */
  .stats-container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    background: var(--color-dark-secondary);
    padding: 30px 5%;
    color: white;
    text-align: center;
  }

  .stat-item {
    flex: 1;
    min-width: 180px;
    padding: 20px 10px;
  }

  .stat-item h3 {
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0;
    color: var(--color-light-secondary);
  }

  .stat-item p {
    font-size: 1rem;
    margin: 5px 0 0;
    opacity: 0.9;
  }
  
  /* Secciones Generales */
  .section {
    padding: 80px 5%;
    text-align: center;
  }

  .section-header {
    margin-bottom: 60px;
  }
  
  .section h2 {
    font-size: 2.8rem;
    font-weight: 700;
    color: var(--color-dark-secondary);
    margin-bottom: 20px;
    line-height: 1.2;
  }

  .light h2 {
    color: white;
  }

  .section-subtitle {
    font-size: 1.2rem;
    max-width: 700px;
    margin: 0 auto;
    color: #555;
  }

  .light .section-subtitle {
    color: rgba(255,255,255,0.9);
  }

  .highlight-text {
    color: var(--color-primary);
  }

  .highlight-text-light {
    color: var(--color-light-secondary);
  }
  
  /* Sección: Quiénes Somos */
  .content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: auto;
    gap: 40px;
  }

  .text {
    flex: 1;
    min-width: 300px;
    text-align: left;
    font-size: 1.1rem;
  }
  
  .key-points {
    margin-top: 30px;
  }

  .key-point {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }

  .check-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    color: var(--color-primary);
    margin-right: 15px;
    font-size: 1.2rem;
  }

  .image-container {
    flex: 1;
    min-width: 300px;
    display: flex;
    justify-content: center;
  }

  .image-frame {
    position: relative;
    padding: 15px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    transform: rotate(2deg);
  }

  .main-image {
    max-width: 100%;
    border-radius: 5px;
    transform: rotate(-2deg);
    transition: transform 0.3s ease;
  }

  .image-frame:hover .main-image {
    transform: rotate(0);
  }
  
  /* Propuesta de Valor Mejorada */
  .value-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .value-card {
    background: white;
    padding: 40px 30px;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    flex: 1;
    min-width: 300px;
    max-width: 380px;
    text-align: center;
  }
  
  .value-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }

  .icon-container {
    margin-bottom: 20px;
  }

  .icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 70px;
    height: 70px;
    background: var(--color-light-secondary);
    border-radius: 50%;
    font-size: 2rem;
    color: var(--color-primary);
  }
  
  .value-card h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-primary);
    margin-bottom: 15px;
  }
  
  .value-card p {
    font-size: 1rem;
    color: #555;
    line-height: 1.6;
  }

  /* Casos de Éxito */
  .success-cases {
    background-color: #f9f9f9;
  }

  .case-studies {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    justify-content: center;
  }

  .case-card {
    flex: 1;
    min-width: 300px;
    max-width: 380px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.05);
    overflow: hidden;
    transition: all 0.3s ease;
  }

  .case-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0,0,0,0.1);
  }

  .case-content {
    padding: 30px;
    text-align: left;
  }

  .case-content h3 {
    color: var(--color-dark-secondary);
    margin-bottom: 10px;
    font-size: 1.4rem;
  }

  .case-highlight {
    color: var(--color-primary);
    font-weight: 700;
    font-size: 1.1rem;
    margin-bottom: 15px;
  }

  .case-author {
    color: #666;
    font-style: italic;
    margin-top: 15px;
  }
  
  /* Beneficios Mejorados */
  .benefits-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 25px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .benefit-card {
    background: rgba(255, 255, 255, 0.9);
    padding: 30px;
    border-radius: 10px;
    text-align: left;
    transition: transform 0.3s;
  }
  
  .benefit-card:hover {
    transform: translateY(-5px);
  }

  .benefit-icon {
    font-size: 2rem;
    margin-bottom: 15px;
    color: var(--color-light-secondary);
  }
  
  .benefit-card h3 {
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--color-dark-secondary);
    margin-bottom: 10px;
  }
  
  .benefit-card p {
    font-size: 0.95rem;
    color: #333;
    line-height: 1.6;
  }

  /* FAQ Section */
  .faq-section {
    background-color: var(--color-light-secondary);
  }

  .faq-container {
    max-width: 800px;
    margin: 0 auto;
  }

  .faq-item {
    background: white;
    border-radius: 10px;
    padding: 25px;
    margin-bottom: 20px;
    text-align: left;
    box-shadow: 0 5px 15px rgba(0,0,0,0.05);
    transition: all 0.3s ease;
  }

  .faq-item:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  }

  .faq-item h3 {
    font-size: 1.2rem;
    color: var(--color-primary);
    margin-bottom: 10px;
    font-weight: 700;
  }

  .faq-item p {
    color: #555;
    font-size: 1rem;
    line-height: 1.6;
  }
  
  /* CTA Mejorado */
  .cta {
    background-color: var(--color-primary);
    background-image: linear-gradient(to bottom, var(--color-primary), #8a6d5a);
    color: white;
    text-align: center;
    padding: 80px 20px;
  }

  .cta-content {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .cta h2 {
    font-size: 2.8rem;
    font-weight: 700;
    margin-bottom: 20px;
  }
  
  .cta p {
    font-size: 1.2rem;
    max-width: 600px;
    margin: 0 auto 30px;
    opacity: 0.9;
  }

  .cta-buttons {
    display: flex;
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 20px;
  }
  
  .cta-button {
    display: inline-block;
    background-color: white;
    color: var(--color-primary);
    padding: 15px 30px;
    font-size: 1.1rem;
    font-weight: bold;
    border-radius: 30px;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.3s ease;
    min-width: 200px;
  }

  .cta-button.outline {
    background: transparent;
    border: 2px solid white;
    color: white;
  }

  .cta-button.primary {
    background-color: var(--color-dark-secondary);
    color: white;
  }

  .cta-button.secondary {
    background-color: transparent;
    border: 2px solid white;
    color: white;
  }

  .cta-button:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  .guarantee {
    font-size: 0.9rem;
    opacity: 0.8;
    margin-top: 20px;
  }
  
  /* Animaciones */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .fade-in {
    opacity: 0;
    animation: fadeInUp 0.8s ease-in-out forwards;
  }
  
  @keyframes fadeInRight {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  .fade-in-right {
    opacity: 0;
    animation: fadeInRight 0.8s ease-in-out forwards;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .hero {
      padding: 100px 5% 80px;
      text-align: center;
    }

    .hero h1 {
      font-size: 2.5rem;
    }

    .hero p {
      font-size: 1.2rem;
    }

    .hero-buttons {
      justify-content: center;
    }

    .content {
      flex-direction: column;
    }

    .text, .image-container {
      width: 100%;
    }

    .stats-container {
      flex-direction: column;
    }

    .stat-item {
      margin-bottom: 20px;
    }

    .cta h2 {
      font-size: 2.2rem;
    }
  }
  </style>
  