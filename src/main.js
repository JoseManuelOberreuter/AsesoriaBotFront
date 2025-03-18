import { createApp } from 'vue';
import { createPinia } from 'pinia'; // 📌 Importar Pinia
import App from './App.vue';
import router from './router';

const pinia = createPinia(); // 📌 Inicializar Pinia
const app = createApp(App);

app.use(pinia); // 📌 Habilitar Pinia ANTES de usar las stores
app.use(router); // 📌 Habilitar Vue Router
app.mount('#app'); // 📌 Montar la aplicación
