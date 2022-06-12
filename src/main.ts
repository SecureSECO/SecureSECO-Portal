import { createApp } from 'vue';
import { VuesticPlugin } from 'vuestic-ui';
import {
  DltInterface, SpiderInterface, dltApi, spiderApi,
} from './api';
import App from './App.vue';

import router from './router';

createApp(App)
  .use(VuesticPlugin)
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
