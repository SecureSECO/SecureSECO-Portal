/* eslint-disable class-methods-use-this */
import { fakeDelay } from '@/lib.js';
import {
  defaultSearchMetrics,
  defaultMiner,
  SearchInterface,
  AddMinerForm,
  Miner,
} from '@/api/search/interface';

export default class SearchMock extends SearchInterface {
  async getMiners() {
    await fakeDelay();
    const miners: Miner[] = [];
    for (let i = 0; i < 10; i += 1) {
      miners[i] = {
        ...defaultMiner,
        name: `Miner ${i}`,
      };
    }
    return miners;
  }

  async getMiner(name: string) {
    await fakeDelay();
    return {
      ...defaultMiner,
      name,
    };
  }

  async addMiner(miner: AddMinerForm) {
    await fakeDelay();
    return 'Success';
  }

  async getMetrics() {
    await fakeDelay();
    return {
      ...defaultSearchMetrics,
    };
  }
}
