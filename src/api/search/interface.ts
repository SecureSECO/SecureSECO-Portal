import { App } from 'vue';
import { GlobalConfig } from 'vuestic-ui';

// export interface Miner {
//   github_token: string;
//   worker_name: string;
//   name: string;
//   id: string; // docker container id
//   state: number; // docker container running or stopped
// }

export interface Miner {
  id: string; // docker container id
  name: string; // docker container name
  config: {
    github_token?: string;
    worker_name?: string;
    cpus?: number;
  };
  // State from docker inspect container
  state: {
    Status: string;
    Running: boolean;
    Paused: boolean;
    Restarting: boolean;
    OOMKilled: boolean;
    Dead: boolean;
    Pid: number;
    ExitCode: number;
    Error: string;
    StartedAt: string;
    FinishedAt: string;
  };
}

export type MinerStateAction = 'remove' | 'restart' | 'start' | 'stop';

// MinerMetrics
// ? methods_added_4hrs: string[],
// ? methods_added_lifetime: string[],
// ? last_activity: string[],

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

  abstract getMiner(id: string): Promise<Miner>;

  abstract addMiner(miner: AddMinerForm): Promise<string | void>;

  abstract changeMinerState(
    id: string,
    action: MinerStateAction,
  ): Promise<boolean | null>;

  // TODO: abstract getMetrics(): Promise<SearchMetrics>;

  install(app: App, config: GlobalConfig) {
    // eslint-disable-next-line no-param-reassign
    app.config.globalProperties.$searchApi = this;
  }
}

export const defaultMiner: Miner = {
  id: 'XXXXXXXXXXX',
  name: 'xxxxx_xxxxx',
  config: {
    github_token: 'ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    worker_name: 'xxxx',
    cpus: 2,
  },
  state: {
    Status: 'paused',
    Running: true,
    Paused: true,
    Restarting: false,
    OOMKilled: false,
    Dead: false,
    Pid: 1111111,
    ExitCode: 0,
    Error: '',
    StartedAt: '2022-09-08T05:35:46.286358724Z',
    FinishedAt: '0001-01-01T00:00:00Z',
  },
};

export const defaultSearchMetrics: SearchMetrics = {
  miners: 0,
  example: 0,
};
