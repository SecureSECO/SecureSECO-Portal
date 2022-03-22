import { App } from 'vue';
import { GlobalConfig } from 'vuestic-ui';

export interface Package {
  id: string,
  name: string,
  score: number,
}

export abstract class DLTPlugin {
  abstract retrievePackages(): Package[];

  abstract retrievePackage(id: string): Package;

  install(app: App, config: GlobalConfig) {
    // eslint-disable-next-line no-param-reassign
    app.config.globalProperties.$dltPlugin = this;
  }
}
