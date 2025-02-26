import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router';
import store from './store/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@/assets/global.css'; // Import the global.css file


createApp(App)
  .use(store)
  .use(router)
  .mount('#app');