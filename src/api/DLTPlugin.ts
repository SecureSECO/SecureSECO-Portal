import { App } from 'vue';
import { GlobalConfig } from 'vuestic-ui';

export interface Package {
  id: number,
  name: string,
  score: number,
}

export abstract class DLTPlugin {
  abstract retrievePackages(): Package[];

  abstract retrievePackage(id: number): Package;

  install(app: App, config: GlobalConfig) {
    // eslint-disable-next-line no-param-reassign
    app.config.globalProperties.$dltPlugin = this;
  }
}
