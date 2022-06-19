import { createApp } from 'vue';
import { createVuestic } from 'vuestic-ui';
import copyText from '@meforma/vue-copy-to-clipboard';
import { dltApi, spiderApi, DltInterface, SpiderInterface } from './api';
import App from './App.vue';

import router from './router';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $dltApi: DltInterface;
    $spiderApi: SpiderInterface;
  }
}

const app = createApp(App)
  .use(createVuestic())
  .use(router)
  .use(dltApi)
  .use(spiderApi)
  .use(copyText);

app.mount('#app');
