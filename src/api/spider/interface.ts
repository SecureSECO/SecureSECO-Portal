import { App } from 'vue';
import { GlobalConfig } from 'vuestic-ui';

export abstract class SpiderInterface {
  isActive: boolean = false;

  abstract getSpiderStatus(): Promise<boolean>;

  abstract toggleSpider(targetState?: boolean): Promise<boolean>;

  install(app: App, config: GlobalConfig) {
    // eslint-disable-next-line no-param-reassign
    app.config.globalProperties.$spiderApi = this;
  }
}
