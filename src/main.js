import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Importa a configuração do Vue Router
import './styles.css';

// Cria a instância do Vue e monta a aplicação
createApp(App)
  .use(router) // Usa o Vue Router
  .mount('#app');
