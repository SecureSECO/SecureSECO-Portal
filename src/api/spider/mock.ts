/* eslint-disable class-methods-use-this */
import { SpiderInterface } from '@/api/spider/interface';

export default class SpiderMock extends SpiderInterface {
  async getSpiderStatus() {
    return this.isActive;
  }

  async toggleSpider(targetState = !this.isActive) {
    console.log(this.isActive, targetState);
    this.isActive = targetState;
    return this.isActive;
  }
}
