/* eslint-disable class-methods-use-this */
import {
  AddMinerForm,
  Miner,
  MinerStateAction,
  SearchInterface,
} from '@/api/search/interface';
import axios, { AxiosResponse } from 'axios';

export default class SearchApi extends SearchInterface {
  #baseUrl = 'http://localhost:3000/api/search/';

  async getMiners(): Promise<Miner[]> {
    const { data } = await axios.get(this.#getLink('miners'));
    return data;
  }

  async getMiner(id: string): Promise<Miner> {
    const { data } = await axios.get(this.#getLink(`miner/${id}`));
    console.log('getMiner', data);
    return data;
  }

  async addMiner(miner: AddMinerForm) {
    console.log('addMiner, miner:', miner);
    const { data } = await axios.post(this.#getLink('add-miner'), miner);
    console.log('addMiner, data:', data);
    return data;
  }

  async changeMinerState(
    id: string,
    action: MinerStateAction,
  ): Promise<boolean | null> {
    try {
      const { data } = await axios.get(this.#getLink(`miner/${id}/${action}`));
      console.log('changeMinerState return data', data);
      return data.success ? data.success : data.message;
    } catch (e) {
      // If the case where the request returned properly but contains an error message, show that message
      if (axios.isAxiosError(e) && e.response) {
        const { data }: AxiosResponse = e.response;
        if (data.success === false) {
          throw new Error(data.message);
        }
      } else {
        throw e;
      }
    }
    return null;
  }

  // TODO: async getMetrics() {
  // TODO:   const { data } = await axios.get(this.#getLink('metrics'));
  // TODO:   // return parseMetrics(data);
  // TODO:   return [];
  // TODO: }

  #getLink(to: string) {
    return `${this.#baseUrl}${to}`;
  }
}
