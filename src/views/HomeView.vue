<template>
    <div class="home-container">
        <HeaderNav />
        
        <main class="main-content">
            <section class="hero-section">
                <div class="hero-content">
                    <h1>AsesorIA</h1>
                    <h2>Chatbots inteligentes sin código</h2>
                    <p class="hero-description">
                        Automatiza la atención al cliente de tu empresa con un chatbot inteligente, sin necesidad de programar.
                    </p>
                    <div class="cta-buttons">
                        <router-link to="/register" class="btn btn-primary">Comienza Gratis</router-link>
                        <router-link to="/contact" class="btn btn-secondary">Solicitar Demo</router-link>
                    </div>
                </div>
                <div class="hero-image">
                    <img src="@/assets/AsesoriaBot.png" alt="Chatbot Illustration">
                </div>
                <div class="scroll-indicator">
                    <span>Descubre más</span>
                    <div class="scroll-arrow"></div>
                </div>
            </section>

            <section class="features-section">
                <h2>¿Por qué elegir AsesorIA?</h2>
                <div class="features-grid">
                    <div class="feature-card">
                        <h3>Integración rápida</h3>
                        <p>Crea y despliega tu chatbot en minutos, no en semanas.</p>
                    </div>
                    <div class="feature-card">
                        <h3>Alimentado por tus documentos</h3>
                        <p>Sube tus manuales, FAQs o cualquier documento y el bot aprenderá de ellos.</p>
                    </div>
                    <div class="feature-card">
                        <h3>Personalización total</h3>
                        <p>Define el estilo y personalidad que mejor represente a tu marca.</p>
                    </div>
                    <div class="feature-card">
                        <h3>Soporte técnico local</h3>
                        <p>Asistencia en español y adaptada a las necesidades de tu negocio.</p>
                    </div>
                </div>
            </section>

            <section class="how-it-works">
                <h2>¿Cómo funciona?</h2>
                <div class="steps-container">
                    <div class="step">
                        <div class="step-number">1</div>
                        <h3>Registra tu cuenta</h3>
                        <p>Crea tu cuenta gratuita en minutos y accede a tu panel de control.</p>
                    </div>
                    <div class="step">
                        <div class="step-number">2</div>
                        <h3>Sube tus documentos</h3>
                        <p>Alimenta a tu chatbot con tus documentos de empresa o base de conocimiento.</p>
                    </div>
                    <div class="step">
                        <div class="step-number">3</div>
                        <h3>Personaliza tu bot</h3>
                        <p>Define el estilo y tono de respuesta que mejor se adapte a tu marca.</p>
                    </div>
                    <div class="step">
                        <div class="step-number">4</div>
                        <h3>¡Listo para usar!</h3>
                        <p>Integra tu bot en tu sitio web, WhatsApp o donde necesites.</p>
                    </div>
                </div>
            </section>

            <section class="cta-section">
                <div class="cta-content">
                    <h2>Comienza a automatizar tu atención al cliente hoy</h2>
                    <p>Ideal para PYMEs y empresas que quieren ahorrar tiempo y mejorar la experiencia del cliente.</p>
                    <router-link to="/register" class="btn btn-cta">Comenzar Ahora</router-link>
                </div>
            </section>
        </main>
    </div>
</template>

<script setup>
import HeaderNav from '@/components/HeaderNav.vue';
</script>

<style scoped>
/* Reset explícito para eliminar márgenes no deseados */
* {
    box-sizing: border-box;
}

/* No podemos usar selectores que no estén en este componente con scoped */
/* Eliminamos estos selectores que podrían causar problemas */
/* html, body, #app {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    width: 100%;
} */

.home-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: var(--color-background);
    color: var(--color-dark-secondary);
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    width: 100%;
    position: relative;
}

.main-content {
    flex: 1;
    max-width: 100%;
    margin: 0;
    padding: 0;
}

.hero-section {
    position: relative;
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 5%;
    padding-top: 70px; /* Espacio para el header */
    background: linear-gradient(135deg, var(--color-background) 0%, #f8f9fa 100%);
    overflow: hidden;
}

.hero-content {
    flex: 1;
    max-width: 600px;
    z-index: 2;
    padding-right: 2rem;
}

.hero-content h1 {
    font-size: 4.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: var(--color-primary);
    animation: fadeInUp 0.8s ease;
}

.hero-content h2 {
    font-size: 2.5rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    animation: fadeInUp 0.8s ease 0.2s backwards;
}

.hero-description {
    font-size: 1.3rem;
    line-height: 1.6;
    margin-bottom: 2rem;
    animation: fadeInUp 0.8s ease 0.4s backwards;
}

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

.hero-image {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    animation: float 6s ease-in-out infinite;
}

@keyframes float {
    0% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-20px);
    }
    100% {
        transform: translateY(0px);
    }
}

.hero-image img {
    max-width: 90%;
    height: auto;
    border-radius: 15px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
}

.cta-buttons {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
    animation: fadeInUp 0.8s ease 0.6s backwards;
}

.btn {
    padding: 1rem 2rem;
    border-radius: 8px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
    cursor: pointer;
    display: inline-block;
    text-align: center;
}

.btn-primary {
    background-color: var(--color-primary);
    color: white;
}

.btn-primary:hover {
    background-color: var(--color-dark-secondary);
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.btn-secondary {
    background-color: transparent;
    color: var(--color-primary);
    border: 2px solid var(--color-primary);
}

.btn-secondary:hover {
    background-color: var(--color-background);
    color: var(--color-dark-secondary);
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.scroll-indicator {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: fadeIn 2s ease 1s backwards;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.scroll-indicator span {
    margin-bottom: 10px;
    font-size: 0.9rem;
    color: var(--color-dark-secondary);
}

.scroll-arrow {
    width: 30px;
    height: 30px;
    border-left: 2px solid var(--color-primary);
    border-bottom: 2px solid var(--color-primary);
    transform: rotate(-45deg);
    animation: scrollBounce 2s infinite;
}

@keyframes scrollBounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0) rotate(-45deg);
    }
    40% {
        transform: translateY(-10px) rotate(-45deg);
    }
    60% {
        transform: translateY(-5px) rotate(-45deg);
    }
}

.features-section {
    padding: 5rem 5%;
    margin-bottom: 0;
    background-color: white;
}

.features-section h2 {
    text-align: center;
    margin-bottom: 3rem;
    font-size: 2.5rem;
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.feature-card {
    background-color: #f8f9fa;
    padding: 2.5rem;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
    transform: translateY(-15px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.feature-card h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: var(--color-primary);
}

.how-it-works {
    padding: 5rem 5%;
    margin-bottom: 0;
    background-color: var(--color-background);
}

.how-it-works h2 {
    text-align: center;
    margin-bottom: 3rem;
    font-size: 2.5rem;
}

.steps-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.step {
    text-align: center;
    padding: 2rem;
    position: relative;
    background-color: white;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease;
}

.step:hover {
    transform: translateY(-10px);
}

.step-number {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: var(--color-primary);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    font-weight: bold;
    margin: 0 auto 1.5rem;
}

.cta-section {
    background-color: var(--color-secondary);
    padding: 5rem 5%;
    margin-bottom: 0;
    text-align: center;
}

.cta-content {
    color: white;
    max-width: 900px;
    margin: 0 auto;
}

.cta-content h2 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
}

.cta-content p {
    font-size: 1.2rem;
    margin-bottom: 2.5rem;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
}

.btn-cta {
    background-color: white;
    color: var(--color-primary);
    font-size: 1.2rem;
    padding: 1.2rem 2.5rem;
    border-radius: 50px;
}

.btn-cta:hover {
    background-color: var(--color-primary);
    color: white;
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
    .hero-section {
        flex-direction: column;
        padding-top: 100px;
        justify-content: center;
        text-align: center;
    }
    
    .hero-content {
        padding-right: 0;
        margin-bottom: 3rem;
    }
    
    .hero-content h1 {
        font-size: 3rem;
    }
    
    .hero-content h2 {
        font-size: 1.8rem;
    }
    
    .cta-buttons {
        justify-content: center;
    }
    
    .features-grid {
        grid-template-columns: 1fr;
    }
    
    .steps-container {
        grid-template-columns: 1fr;
    }
}
</style>