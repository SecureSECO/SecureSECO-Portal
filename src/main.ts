import { createApp } from 'vue';
import { VuesticPlugin } from 'vuestic-ui';
import App from './App.vue';
import 'vuestic-ui/dist/vuestic-ui.css';

createApp(App).use(VuesticPlugin).mount('#app');
