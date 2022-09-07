import { App } from 'vue';
import { GlobalConfig } from 'vuestic-ui';

export interface Miner {
  github_token: string;
  worker_name: string;
  name: string;
}

export interface AddMinerForm {
  github_token: string;
  worker_name: string;
  // TODO: verbosity
  // TODO: num cpus
}

export interface SearchMetrics {
  miners: number;
  example: number;
}

export abstract class SearchInterface {
  abstract getMiners(): Promise<Miner[]>;

  abstract addMiner(miner: AddMinerForm): Promise<string | void>;

  abstract getMetrics(): Promise<SearchMetrics>;

  install(app: App, config: GlobalConfig) {
    // eslint-disable-next-line no-param-reassign
    app.config.globalProperties.$searchApi = this;
  }
}

export const defaultMiner: Miner = {
  github_token: 'Github',
  worker_name: 'TODO',
  name: '',
};

export const defaultSearchMetrics: SearchMetrics = {
  miners: 0,
  example: 0,
};
