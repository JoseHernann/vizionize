import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import 'devextreme/dist/css/dx.material.blue.light.css';

const app = createApp(App);

app.use(router);
app.mount('#app');
