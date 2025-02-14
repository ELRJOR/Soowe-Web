import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router'; // Importa Vue Router

const app = createApp(App);
app.use(router); // Usa Vue Router en la app
app.mount('#app');
