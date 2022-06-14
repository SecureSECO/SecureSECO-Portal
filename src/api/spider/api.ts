/* eslint-disable class-methods-use-this */
import { SpiderInterface } from '@/api/spider/interface';
import axios, { AxiosResponse } from 'axios';

export default class SpiderApi extends SpiderInterface {
  async getSpiderStatus() {
    const { data } = await axios.get('http://localhost:3000/api/spider/status');
    this.isActive = data;
    return this.isActive;
  }

  async toggleSpider(targetState = !this.isActive) {
    const action = targetState ? 'start' : 'stop';
    try {
      const { data } = await axios.get(`http://localhost:3000/api/spider/${action}`);
      
      if (data.success) {
        this.isActive = !this.isActive;
        return this.isActive;
      } else {
        return data.message;
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
  }
}
