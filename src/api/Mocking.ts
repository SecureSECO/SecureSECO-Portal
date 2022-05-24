/* eslint-disable class-methods-use-this */
import { DLTPlugin, Package } from '@/api/DLTPlugin';

export default class Mocking extends DLTPlugin {
  retrievePackage(id: string): Package {
    const score: number = parseInt(id.split('-')[1], 10);
    const name = `Package ${score}`;

    return {
      id,
      name,
      score,
    };
  }

  retrievePackages(): Package[] {
    const packages: Package[] = [];
    for (let id = 0; id < 50; id += 1) {
      packages[id] = {
        id: `package-${id}`,
        name: `Package ${id}`,
        score: id,
      };
    }
    return packages;
  }
}
