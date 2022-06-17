import { createApp } from 'vue';
import { createVuestic } from 'vuestic-ui';
import copyText from "@meforma/vue-copy-to-clipboard";
import {
  DltInterface, SpiderInterface, dltApi, spiderApi,
} from './api';
import App from './App.vue';

import router from './router';

// Create a fake asynchronous delay
// Useful for testing loading states and such
const fakeDelay = async (delay = 2000) => {
  if (import.meta.env.MODE === 'development') {
    await new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }
};

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $dltApi: DltInterface;
    $spiderApi: SpiderInterface;
    $fakeDelay: typeof fakeDelay,
  }
}

const app = createApp(App)
  .use(createVuestic())
  .use(router)
  .use(dltApi)
  .use(spiderApi)
  .use(copyText);

app.config.globalProperties.$fakeDelay = fakeDelay;

app.mount('#app');
