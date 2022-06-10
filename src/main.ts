import { createApp } from 'vue';
import { createVuestic } from 'vuestic-ui';
import { DltInterface, dltApi } from './api';
import App from './App.vue';

import router from './router';

createApp(App)
  .use(createVuestic())
  .use(router)
  .use(dltApi)
  .mount('#app');

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $dltApi: DltInterface;
  }
}
