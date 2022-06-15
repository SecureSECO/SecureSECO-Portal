import { createApp } from 'vue';
import { createVuestic } from 'vuestic-ui';
import copyText from "@meforma/vue-copy-to-clipboard";
import {
  DltInterface, SpiderInterface, dltApi, spiderApi,
} from './api';
import App from './App.vue';

import router from './router';

createApp(App)
  .use(createVuestic())
  .use(copyText)
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
