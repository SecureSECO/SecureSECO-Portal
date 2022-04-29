import { createApp } from 'vue';
import { VuesticPlugin } from 'vuestic-ui';
import Mocking from '@/api/Mocking';
import { DLTPlugin } from '@/api/DLTPlugin';
import App from './App.vue';

import router from './router';

const dltPlugin = new Mocking();

createApp(App)
  .use(VuesticPlugin)
  .use(router)
  .use(dltPlugin)
  .mount('#app');

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $dltPlugin: DLTPlugin
  }
}
