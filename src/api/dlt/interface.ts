import { App } from 'vue';
import { GlobalConfig } from 'vuestic-ui';

export interface Package {
  platform: string,
  owner: string,
  name: string,
  releases: string[],
  score: number,
  updatedAt: Date,
}

export interface TrustFact {
  type: string,
  value: number,
}

export abstract class DltInterface {
  abstract getPackages(): Promise<Package[]>;

  abstract getPackage(name: string): Promise<Package>;

  abstract getTrustFacts(name: string): Promise<TrustFact[]>;

  abstract getDownloadLink(): Promise<string>;

  install(app: App, config: GlobalConfig) {
    // eslint-disable-next-line no-param-reassign
    app.config.globalProperties.$dltApi = this;
  }
}

export const defaultPackage: Package = {
  platform: 'Github',
  owner: 'Fides',
  name: 'Portal',
  releases: ['v1.2.3'],
  score: 0,
  updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
};
