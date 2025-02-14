import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/LandingPage.vue';
import Login from '../pages/Login.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
