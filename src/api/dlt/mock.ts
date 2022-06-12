/* eslint-disable class-methods-use-this */
import {
  defaultPackage, DltInterface, Package, TrustFact,
} from '@/api/dlt/interface';

export default class DltMock extends DltInterface {
  async getPackages() {
    const packages: Package[] = [];
    for (let i = 0; i < 100; i += 1) {
      packages[i] = {
        ...defaultPackage,
        name: `Package ${i}`,
        score: i,
        updatedAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      };
    }
    packages[49] = {
      ...packages[49],
      name: 'Search me #49',
    };
    return packages;
  }

  async getPackage(name: string) {
    return {
      ...defaultPackage,
      name,
      score: Math.floor(100 * Math.random()),
    };
  }

  async getTrustFacts(name: string) {
    const trustFacts = [];
    for (let i = 0; i < (name.length + 5) % 10; i += 1) {
      trustFacts[i] = {
        type: 'github stars',
        value: i + 1,
      };
    }
    return trustFacts;
  }

  async getDownloadLink() {
    return window.location.origin;
  }
}
