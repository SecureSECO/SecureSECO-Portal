import { createApp } from 'vue';
import { VuesticPlugin } from 'vuestic-ui';
import Mocking from '@/api/Mocking';
import { DltApi } from '@/api/DltApi';
import App from './App.vue';

import router from './router';

const dltApi = new Mocking();

createApp(App)
  .use(VuesticPlugin)
  .use(router)
  .use(dltApi)
  .mount('#app');

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $dltApi: DltApi;
  }
}
