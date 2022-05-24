import { createApp } from 'vue';
import { VuesticPlugin } from 'vuestic-ui';
import Mocking from '@/api/Mocking';
import { DLTPlugin } from '@/api/DLTPlugin';
import App from './App.vue';

import router from './router';
import store from './store';
import axios from 'axios';

const dltPlugin = new Mocking();

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:4173/';

createApp(App)
  .use(VuesticPlugin)
  .use(router)
  .use(store)
  .use(dltPlugin)
  .mount('#app');

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $dltPlugin: DLTPlugin
  }
}
