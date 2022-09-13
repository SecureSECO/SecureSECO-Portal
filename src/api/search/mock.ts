/* eslint-disable class-methods-use-this */
import { fakeDelay } from '@/lib.js';
import {
  defaultSearchMetrics,
  defaultMiner,
  SearchInterface,
  AddMinerForm,
  Miner,
  MinerStateAction,
} from '@/api/search/interface';

export default class SearchMock extends SearchInterface {
  async getMiners(): Promise<Miner[]> {
    await fakeDelay();
    const miners: Miner[] = [];
    const names = [
      'sweet_lalande',
      'inspiring_wales',
      'hungry_pascal',
      'kind_archimedes',
      'keen_hopper',
    ];
    for (let i = 0; i < 5; i += 1) {
      miners[i] = {
        ...defaultMiner,
        name: names[i],
        id: `${i + 1}${defaultMiner.id}`,
        config: {
          ...defaultMiner.config,
          worker_name: `Miner ${i + 1}`,
        },
        state: {
          ...defaultMiner.state,
          Running: Math.random() > 0.5,
        },
      };
    }
    return miners;
  }

  async getMiner(id: string): Promise<Miner> {
    await fakeDelay();
    const miners = await this.getMiners();
    const miner = miners.find((x) => x.id === id);
    return miner || defaultMiner;
  }

  async getMinerStatus() {
    await fakeDelay();
    // return this.isActive;
    return Math.random() > 0.5;
  }

  async changeMinerState(
    id: string,
    action: MinerStateAction,
  ): Promise<boolean | null> {
    await fakeDelay();
    return null;
  }

  async addMiner(miner: AddMinerForm) {
    await fakeDelay();
    return 'Success';
  }

  // TODO: async getMetrics() {
  // TODO:   await fakeDelay();
  // TODO:   return {
  // TODO:     ...defaultSearchMetrics,
  // TODO:   };
  // TODO: }
}
