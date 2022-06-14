/* eslint-disable class-methods-use-this */
import { SpiderInterface } from '@/api/spider/interface';
import axios, { AxiosResponse } from 'axios';

export default class SpiderApi extends SpiderInterface {
  #baseUrl = 'http://localhost:3000/api/spider/';

  async getSpiderStatus() {
    const { data } = await axios.get(this.#getLink('status'));
    this.isActive = data;
    return this.isActive;
  }

  async toggleSpider(targetState = !this.isActive) {
    const action = targetState ? 'start' : 'stop';
    try {
      const { data } = await axios.get(this.#getLink(action));
      if (data.success) {
        this.isActive = !this.isActive;
      }
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
    return this.isActive;
  }

  #getLink(to: string) {
    return `${this.#baseUrl}${to}`;
  }
}
