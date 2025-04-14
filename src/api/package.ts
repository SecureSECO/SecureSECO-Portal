import router from '@/router';

/** Returns an image url, based on a giving package platform */
export function platformImage(platform: string): string {
  switch (platform.toLowerCase()) {
    case 'cran':
    case 'go':
    case 'maven':
    case 'npm':
    case 'nuget':
    case 'pypi':
    case 'cargo':
      return `/${platform.toLowerCase()}.png`;
    default:
      return '/package.svg';
  }
}

/** Go to the package details page for a specific package */
export function loadPackage(name: string) {
  router.push({
    name: 'Package',
    params: {
      name,
    },
  });
}

/** Go to the package details page for a specific package and version */
export function loadPackageVersion(name: string, version: string) {
  router.push({
    name: 'Package with Version',
    params: {
      name,
      version,
    },
  });
}
