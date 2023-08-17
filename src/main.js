// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import the router configuration
import 'bootstrap/dist/css/bootstrap.css';


const app = createApp(App);
app.use(router); // Use the router configuration
app.mount('#app');
