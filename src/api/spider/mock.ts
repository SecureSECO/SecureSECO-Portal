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

/* This program has been developed by students from the bachelor Computer Science at Utrecht University within the Software Project course.
© Copyright Utrecht University (Department of Information and Computing Sciences) */