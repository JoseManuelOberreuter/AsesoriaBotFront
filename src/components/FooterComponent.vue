<template>
    <footer class="footer">
        <div class="footer-content">
            <div class="footer-logo">
                <h3>AsesorIA</h3>
                <p>Chatbots inteligentes sin código</p>
            </div>
            
            <div class="footer-links">
                <div class="link-group">
                    <h4>Producto</h4>
                    <ul>
                        <li><router-link to="/features">Características</router-link></li>
                        <li><router-link to="/pricing">Precios</router-link></li>
                        <li><router-link to="/integrations">Integraciones</router-link></li>
                    </ul>
                </div>
                
                <div class="link-group">
                    <h4>Empresa</h4>
                    <ul>
                        <li><router-link to="/about">Sobre nosotros</router-link></li>
                        <li><router-link to="/contact">Contacto</router-link></li>
                        <li><router-link to="/blog">Blog</router-link></li>
                    </ul>
                </div>
                
                <div class="link-group">
                    <h4>Legal</h4>
                    <ul>
                        <li><router-link to="/privacy">Privacidad</router-link></li>
                        <li><router-link to="/terms">Términos</router-link></li>
                        <li><router-link to="/cookies">Cookies</router-link></li>
                    </ul>
                </div>
            </div>
            
            <div class="footer-social">
                <h4>Síguenos</h4>
                <div class="social-icons">
                    <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                    <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
                    <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                </div>
            </div>
        </div>
        
        <div class="footer-bottom">
            <p>&copy; 2023 AsesorIA. Todos los derechos reservados.</p>
        </div>
    </footer>
</template>

<script setup>
// No se requiere lógica adicional para este componente
</script>

<style scoped>
.footer {
    background-color: var(--color-secondary);
    color: var(--color-light-secondary);
    padding: 4rem 5% 2rem;
    margin-top: auto;
}

.footer-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.footer-logo {
    flex: 1;
    min-width: 200px;
}

.footer-logo h3 {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
    color: var(--color-light-secondary);
}

.footer-links {
    flex: 2;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 2rem;
}

.link-group h4 {
    font-size: 1.2rem;
    margin-bottom: 1.2rem;
    color: var(--color-light-secondary);
}

.link-group ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.link-group li {
    margin-bottom: 0.8rem;
}

.link-group a {
    color: var(--color-neutral);
    text-decoration: none;
    transition: color 0.3s ease;
}

.link-group a:hover {
    color: var(--color-light-secondary);
}

.footer-social {
    flex: 1;
    min-width: 200px;
}

.footer-social h4 {
    font-size: 1.2rem;
    margin-bottom: 1.2rem;
    color: var(--color-light-secondary);
}

.social-icons {
    display: flex;
    gap: 1rem;
}

.social-icons a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.1);
    color: var(--color-light-secondary);
    transition: all 0.3s ease;
    text-decoration: none;
}

.social-icons a:hover {
    background-color: var(--color-accent);
    transform: translateY(-5px);
}

.footer-bottom {
    text-align: center;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    margin-top: 3rem;
    padding-top: 2rem;
    font-size: 0.9rem;
}

@media (max-width: 768px) {
    .footer-content {
        flex-direction: column;
        text-align: center;
    }
    
    .footer-links {
        flex-direction: column;
        gap: 2rem;
    }
    
    .social-icons {
        justify-content: center;
    }
}
</style> 