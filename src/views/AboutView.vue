<template>
    <div class="about-container">
      <!-- Hero / Encabezado -->
      <section class="hero">
        <h1>Sobre Nosotros</h1>
        <p>Transformamos la eficiencia empresarial con inteligencia artificial.</p>
      </section>
  
      <!-- Sección: Quiénes Somos -->
      <section class="section">
        <SideBarMenu />
        <div class="content">
          <div class="text fade-in">
            <h2>¿Quiénes somos?</h2>
            <p>
                En <strong>AsesoriaBot</strong>, ayudamos a las empresas a 
                <strong>automatizar procesos</strong> y <strong>optimizar la comunicación</strong> 
                con inteligencia artificial. Nuestra plataforma facilita información en tiempo real, 
                mejorando la atención al cliente y la eficiencia interna.
                <br><br>
                Entendemos que en un mundo cada vez más digital, la rapidez y precisión en la gestión de información 
                son claves para el éxito. Por eso, AsesoriaBot está diseñado para ofrecer respuestas instantáneas, 
                reduciendo tiempos de espera y permitiendo que tu equipo se enfoque en tareas estratégicas.
            </p>
          </div>
          <div class="image fade-in-right">
            <img src="@/assets/LogoAsesoriaBot.png" alt="AsesoriaBot en acción">
          </div>
        </div>
      </section>
  
      <!-- Sección: Propuesta de Valor -->
      <section class="section light-bg">
        <h2>Nuestra Propuesta de Valor</h2>
        <div class="grid">
          <div class="card">
            <h3>💡 Automatización Inteligente</h3>
            <p>Chatbots que responden con precisión utilizando IA y documentos internos.</p>
          </div>
          <div class="card">
            <h3>🔗 Integración Empresarial</h3>
            <p>Compatible con Slack, CRMs como HubSpot, Salesforce y servicios en la nube.</p>
          </div>
          <div class="card">
            <h3>📈 Optimización de Procesos</h3>
            <p>Facilitamos documentos, gestionamos consultas y reducimos tiempos de respuesta.</p>
          </div>
        </div>
      </section>
  
      <!-- Sección: Nuestra Misión -->
      <section class="section">
        <h2>Nuestra Misión</h2>
        <p class="mission-text">
          <strong>Mejoramos la rapidez de los procesos empresariales</strong>, optimizando la gestión 
          del conocimiento y proporcionando respuestas automatizadas con inteligencia artificial. 
          En AsesoriaBot, <strong>cada conversación se convierte en una oportunidad de crecimiento.</strong>
        </p>
      </section>
  
      <!-- Sección: Beneficios -->
      <section class="section dark-bg">
        <h2>¿Por qué elegirnos?</h2>
        <div class="grid">
          <div class="card">
            <h3>⚡ Implementación Rápida</h3>
            <p>Configuración en la nube con integración sencilla.</p>
          </div>
          <div class="card">
            <h3>📊 Análisis de Datos</h3>
            <p>Reportes detallados sobre interacciones y rendimiento del bot.</p>
          </div>
          <div class="card">
            <h3>🔒 Seguridad y Privacidad</h3>
            <p>Protección avanzada de datos con cifrado y autenticación.</p>
          </div>
        </div>
      </section>
  
      <!-- CTA Contacto -->
      <section class="cta">
        <h2>¿Listo para transformar tu empresa?</h2>
        <p>Automatiza tu atención al cliente y optimiza tus procesos internos con AsesoriaBot.</p>
        <router-link to="/contact" class="cta-button">Contáctanos</router-link>
       </section>
    </div>
  </template>
  
  <script>
  import SideBarMenu from '@/components/SideBarMenu.vue';
  export default {
    name: 'AboutUs',
    components: {
      SideBarMenu
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
  }
  
  /* Hero */
  .hero {
    background-color: var(--color-primary);
    color: white;
    text-align: center;
    padding: 60px 20px;
  }
  
  .hero h1 {
    font-size: 3rem;
    font-weight: bold;
  }
  
  .hero p {
    font-size: 1.8rem;
    max-width: 1000px;
    margin: 10px auto;
    opacity: 0.9;
  }
  
  /* Secciones */
  .section {
    padding: 60px 20px;
    text-align: center;
  }
  
  .section h2 {
    font-size: 2.5rem;
    color: var(--color-dark-secondary);
    margin-bottom: 20px;
  }
  
  /* Sección: Quiénes Somos */
  .content {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    max-width: 1000px;
    margin: auto;
    gap: 40px;
  }

  .content h2 {
    text-align: center;
  }
  
  .text {
    flex: 1;
    text-align: justify;
    font-size: 1.3rem;
  }
  
  .image img {
    max-width: 100%;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  /* Sección: Propuesta de Valor y Beneficios */
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    max-width: 1000px;
    margin: auto;
  }
  
  .card {
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s;
  }
  
  .card:hover {
    transform: translateY(-5px);
  }
  
  .card h3 {
    font-size: 1.5rem;
    color: var(--color-primary);
  }
  
  .card p {
    font-size: 1rem;
    color: #555;
  }
  
  /* Fondo claro y oscuro */
  .light-bg {
    background-color: var(--color-light-secondary);
  }
  
  .dark-bg {
    background-color: var(--color-secondary);
    color: white;
  }
  
  /* Sección: Misión */
  .mission-text {
    max-width: 800px;
    margin: auto;
    font-size: 1.2rem;
    color: #555;
  }
  
  /* CTA */
  .cta {
    background-color: var(--color-primary);
    color: white;
    text-align: center;
    padding: 60px 20px;
  }
  
  .cta h2 {
    font-size: 2.5rem;
  }
  
  .cta p {
    font-size: 1.2rem;
    max-width: 1000px;
    margin: 10px auto;
  }
  
  .cta-button {
    display: inline-block; /* Para que se comporte como botón */
    background-color: white;
    color: var(--color-primary);
    padding: 15px 30px;
    margin-top: 20px;
    font-size: 1.2rem;
    font-weight: bold;
    border-radius: 30px;
    cursor: pointer;
    text-decoration: none; /* Elimina el subrayado */
    transition: background 0.3s, transform 0.2s;
  }

  .cta-button:hover {
    background-color: var(--color-light-secondary);
    transform: scale(1.05); /* Efecto de agrandamiento al pasar el mouse */
  }
  
  /* Animaciones */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
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
      transform: translateX(20px);
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
  </style>
  