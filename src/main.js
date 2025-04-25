import { createApp } from 'vue';
import { createPinia } from 'pinia'; // 📌 Importar Pinia
import App from './App.vue';
import router from './router';

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { 
  faChartBar, faCog, faRobot, faComment, 
  faUser, faExclamationTriangle, faPlus, 
  faPaperclip, faEdit, faEye, faChevronLeft, 
  faChevronRight, faUserPlus, faEnvelope, 
  faLock, faSignInAlt, faKey, faCircleNotch,
  faCheckCircle, faPaperPlane, faBars, faTimes
} from '@fortawesome/free-solid-svg-icons';

// Añadir iconos a la biblioteca de Font Awesome
library.add(
  faChartBar, faCog, faRobot, faComment,
  faUser, faExclamationTriangle, faPlus,
  faPaperclip, faEdit, faEye, faChevronLeft,
  faChevronRight, faUserPlus, faEnvelope,
  faLock, faSignInAlt, faKey, faCircleNotch,
  faCheckCircle, faPaperPlane, faBars, faTimes
);

const pinia = createPinia(); // 📌 Inicializar Pinia
const app = createApp(App);

app.use(pinia); // 📌 Habilitar Pinia ANTES de usar las stores
app.use(router); // 📌 Habilitar Vue Router
app.component('font-awesome-icon', FontAwesomeIcon); // Registrar componente Font Awesome
app.mount('#app'); // 📌 Montar la aplicación
