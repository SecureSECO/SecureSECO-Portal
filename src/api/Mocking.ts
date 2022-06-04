/* eslint-disable class-methods-use-this */
import { DLTPlugin, Package } from '@/api/DLTPlugin';

export default class Mocking extends DLTPlugin {
  retrievePackage(id: number): Package {
    const score = id;
    const name = `Package ${score}`;

    return {
      id,
      name,
      score,
    };
  }

  retrievePackages(): Package[] {
    const packages: Package[] = [];
    for (let id = 0; id < 100; id += 1) {
      packages[id] = {
        id,
        name: `Package ${id}`,
        score: id,
      };
    }
    return packages;
  }
}
