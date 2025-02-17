import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../pages/Dashboard.vue'
import Login from '../pages/login.vue'
import LandingPage from '../pages/LandingPage.vue' // Agregamos la landing

const routes = [
  { path: '/', component: LandingPage }, // Landing page como ruta raíz
  { path: '/login', component: Login },
  { 
    path: '/dashboard', 
    component: Dashboard,
    meta: { requiresAuth: true } // Meta para indicar que necesita autenticación
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 🔒 **Protección de rutas**
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token') // Simulación de autenticación

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login') // Si no está autenticado, lo envía al login
  } else {
    next() // Si está autenticado, lo deja pasar
  }
})

export default router
