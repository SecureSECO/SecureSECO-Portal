/* eslint-disable class-methods-use-this */
import { defaultPackage, DLTPlugin, Package, TrustFact } from '@/api/DLTPlugin';

export default class Mocking extends DLTPlugin {
  async getPackageNames(): Promise<string[]> {
    const packageNames = [];
    for (let id = 0; id < 100; id += 1) {
      packageNames[id] = `Package ${id}`;
    }
    return packageNames;
  }

  async getPackages(): Promise<Package[]> {
    const packages: Package[] = [];
    for (let id = 0; id < 100; id += 1) {
      packages[id] = {
        ...defaultPackage,
        id,
        name: `Package ${id}`,
        score: id,
        updatedAt: new Date(Date.now() - id * 24 * 60 * 60 * 1000),
      };
    }
    return packages;
  }

  async getPackage(id: number): Promise<Package> {
    return {
      ...defaultPackage,
      id,
      name: `Package ${id}`,
      score: id,
    };
  }

  async getTrustFacts(id: number): Promise<TrustFact[]> {
    const trustFacts = [];
    for (let i = 0; i < (id + 5) % 10; i += 1) {
      trustFacts[i] = {
        type: 'github stars',
        value: i + 1,
      };
    }
    return trustFacts;
  }
}
