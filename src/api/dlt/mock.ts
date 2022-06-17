/* eslint-disable class-methods-use-this */
import {
  defaultMetrics, defaultPackage,
  DltInterface, JobForm, Package,
} from '@/api/dlt/interface';

export default class DltMock extends DltInterface {
  async getPackages() {
    const packages: Package[] = [];
    for (let i = 0; i < 100; i += 1) {
      packages[i] = {
        ...defaultPackage,
        name: `Package ${i}`,
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

  // TODO: Add mock data
  async getJobs() {
    return [];
  }

  async addJob(job: JobForm) {
    console.log('Added Job', job);
    return 'Success';
  }

  async getMetrics() {
    return {
      ...defaultMetrics,
    };
  }

  async getTrustScore(name: string, release: string) {
    const maxScore = 100 * (name.length + release.length);
    return Math.floor(maxScore * Math.random());
  }
}
