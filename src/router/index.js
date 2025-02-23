import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import ContactForm from '../views/ContactView.vue';
import RegisterForm from '../views/RegisterView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/contact',
    name: 'ContactForm',
    component: ContactForm
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterForm
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
