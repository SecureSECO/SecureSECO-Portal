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

export abstract class DltApi {
  // abstract getPackageNames(): Promise<string[]>;

  abstract getPackages(): Promise<Package[]>;

  abstract getPackage(id: number): Promise<Package>;

  abstract getTrustFacts(id: number): Promise<TrustFact[]>;

  install(app: App, config: GlobalConfig) {
    // eslint-disable-next-line no-param-reassign
    app.config.globalProperties.$dltApi = this;
  }
}
