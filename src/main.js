import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

createApp(App).use(router).use(VueToast, {
    position: 'bottom-right',
  }).mount('#app')