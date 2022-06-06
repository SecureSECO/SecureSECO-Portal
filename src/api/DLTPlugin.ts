import { App } from 'vue';
import { GlobalConfig } from 'vuestic-ui';

export const defaultPackage = {
  id: 0,
  platform: 'Github',
  owner: 'Fides',
  name: 'Portal',
  release: 'v1.2.3',
  score: 0,
  updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
};

export interface Package {
  id: number,
  platform: string,
  owner: string,
  name: string,
  release: string,
  score: number,
  updatedAt: Date,
}

export interface TrustFact {
  type: string,
  value: number,
}

export abstract class DLTPlugin {
  abstract getPackageNames(): string[];

  abstract getPackages(): Package[];

  abstract getPackage(id: number): Package;

  abstract getTrustFacts(id: number): TrustFact[];

  install(app: App, config: GlobalConfig) {
    // eslint-disable-next-line no-param-reassign
    app.config.globalProperties.$dltPlugin = this;
  }
}
