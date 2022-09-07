/* eslint-disable class-methods-use-this */
import {
  // defaultJob,
  // defaultSearchMetrics,
  defaultMiner,
  SearchInterface,
  Miner,
  AddMinerForm,
  // SearchMetrics,
} from '@/api/search/interface';
import axios, { AxiosResponse } from 'axios';

interface ApiMiner {
  minerGithubToken: string;
  minerWorkerName: string;
}

// Convert miner data as received from the Dlt Api into the local Package interface
const parseMiner = (data: ApiMiner): Miner => ({
  ...defaultMiner,
  github_token: data.minerGithubToken,
  worker_name: data.minerWorkerName,
});

export default class SearchApi extends SearchInterface {
  #baseUrl = 'http://localhost:3000/api/search/';

  async getMiners() {
    const { data } = await axios.get(this.#getLink('miners'));
    console.log('/search | getMiners | data', data);
    // return data.miners.map((item: ApiMiner) => parseMiner(item));
    return [];
  }

  async getMiner(name: string) {
    const { data } = await axios.get(this.#getLink(`miner/${name}`));
    return parseMiner(data);
  }

  async addMiner(miner: AddMinerForm) {
    console.log('addMiner, miner:', miner);
    const { data } = await axios.post(this.#getLink('add-miner'), miner);
    console.log('addMiner, data:', data);
    return data;
  }

  async getMetrics() {
    const { data } = await axios.get(this.#getLink('metrics'));
    // return parseMetrics(data);
    return [];
  }

  #getLink(to: string) {
    return `${this.#baseUrl}${to}`;
  }
}
