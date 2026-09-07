import { App } from 'vue';
import { GlobalConfig } from 'vuestic-ui';

export interface Package {
  platform: string,
  owner: string,
  name: string,
  versions: string[],
}

export interface TrustFact {
  status?: string,
  source?: string,
  collectedAt?: string,
  transactionID?: string,
  observedHeight?: number,
  observedBlockID?: string,
  uid?: string,
  error?: string,
  jobID?: number,
  type: string,
  value: string,
}

export interface Job {
  id: number,
  package: string,
  version: string,
  fact: string,
  bounty: number,
}

export interface AddPackageForm {
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

export interface TopPackageResult {
    packageName: string,
    packagePlatform: string,
    packageOwner: string,
    packageRelease: string,
    score: number,
}

export abstract class DltInterface {
  abstract getPackages(from?: number, count?: number, query?: string): Promise<{ packages: Package[], total: number } >;

  abstract getPackage(name: string): Promise<Package | null>;

  abstract getTrustFacts(name: string, version: string): Promise<TrustFact[]>;

  abstract getDownloadLink(): Promise<string>;

  abstract getJobs(): Promise<Job[]>;

  abstract addPackage(pack: AddPackageForm): Promise<string | void>;

  abstract getMostRecentVersion(pack: Package): Promise<string>;

  abstract getMetrics(): Promise<Metrics>;

  abstract getTrustScore(name: string, version?: string): Promise<number | undefined>;

  abstract getTrustScoreCategories(name: string, version: string): Promise<Record<string, number>>;

  abstract getTopPackages(order: "ascending" | "descending", count: Number): Promise<TopPackageResult[]>;

  install(app: App, config: GlobalConfig) {
    // eslint-disable-next-line no-param-reassign
    app.config.globalProperties.$dltApi = this;
  }
}

export const defaultPackage: Package = {
  platform: 'Github',
  owner: 'Fides',
  name: 'Portal',
  versions: ['v7.8.9', 'v4.5.6', 'v1.2.3'],
};

export const defaultJob: Job = {
  id: 0,
  package: '',
  version: '',
  fact: '',
  bounty: 1000,
};

export const defaultMetrics: Metrics = {
  packages: 0,
  blockheight: 0,
  nodes: 0,
};

/* This program has been developed by students from the bachelor Computer Science at Utrecht University within the Software Project course.
© Copyright Utrecht University (Department of Information and Computing Sciences) */
