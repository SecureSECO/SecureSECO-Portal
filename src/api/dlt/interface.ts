import { App } from 'vue';
import { GlobalConfig } from 'vuestic-ui';

export interface Package {
  platform: string,
  owner: string,
  name: string,
  releases: string[],
}

export interface TrustFact {
  type: string,
  value: number,
}

export interface Job {
  id: number,
  package: string,
  version: string,
  fact: string,
  bounty: number,
}

export interface JobForm {
  platform: string,
  owner: string,
  name: string,
  release: string,
}

export interface Metrics {
  packages: number,
  blockheight: number,
  nodes: number,
}

export abstract class DltInterface {
  abstract getPackages(): Promise<Package[]>;

  abstract getPackage(name: string): Promise<Package>;

  abstract getTrustFacts(name: string): Promise<TrustFact[]>;

  abstract getDownloadLink(): Promise<string>;

  abstract getJobs(): Promise<Job[]>;

  abstract addJob(job: JobForm): Promise<string | void>;

  abstract getMetrics(): Promise<Metrics>;

  install(app: App, config: GlobalConfig) {
    // eslint-disable-next-line no-param-reassign
    app.config.globalProperties.$dltApi = this;
  }
}

export const defaultPackage: Package = {
  platform: 'Github',
  owner: 'Fides',
  name: 'Portal',
  releases: ['v7.8.9', 'v4.5.6', 'v1.2.3'],
};

export const defaultJob: Job = {
  id: 0,
  package: 'Portal',
  version: 'v1.2.3',
  fact: 'stars',
  bounty: 1000,
};

export const defaultMetrics: Metrics = {
  packages: 0,
  blockheight: 0,
  nodes: 0,
};
