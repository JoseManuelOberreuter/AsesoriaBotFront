import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import ContactForm from '../views/ContactView.vue';
import RegisterForm from '../views/RegisterView.vue';
import LoginView from '../views/LoginView.vue';
import VerifyView from '@/views/VerifyView.vue';
import DashboardView from '@/views/DashboardView.vue'

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
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/verify',
    name: 'Verify',
    component: VerifyView
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
