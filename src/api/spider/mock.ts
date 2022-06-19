/* eslint-disable class-methods-use-this */
import { fakeDelay } from '@/lib.js';
import { SpiderInterface } from '@/api/spider/interface';

export default class SpiderMock extends SpiderInterface {
  async getSpiderStatus() {
    await fakeDelay();
    return this.isActive;
  }

  async toggleSpider(targetState = !this.isActive) {
    await fakeDelay();
    this.isActive = targetState;
    return this.isActive;
  }
}
