import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'

// Configuración global para los tests
export function setupTest() {
  const router = createRouter({
    history: createWebHistory(),
    routes: []
  })

  const pinia = createPinia()

  return {
    router,
    pinia,
    global: {
      plugins: [router, pinia],
      stubs: {
        'router-view': true
      }
    }
  }
} 