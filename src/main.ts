import { createApp } from 'vue';
import { createVuestic } from 'vuestic-ui';
import {
  DltInterface, SpiderInterface, dltApi, spiderApi,
} from './api';
import App from './App.vue';

import router from './router';

createApp(App)
  .use(createVuestic())
  .use(router)
  .use(dltApi)
  .use(spiderApi)
  .mount('#app');

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $dltApi: DltInterface;
    $spiderApi: SpiderInterface;
  }
}
