/* eslint-disable class-methods-use-this */
import {
  defaultJob, defaultMetrics, defaultPackage,
  DltInterface, Job, JobForm, Metrics, Package,
} from '@/api/dlt/interface';
import axios from 'axios';
import semver from 'semver';

interface ApiPackage {
  packagePlatform: string,
  packageOwner: string,
  packageName: string,
  packageReleases: string[],
}

interface ApiJob {
  jobID: number,
  package: string,
  version: string,
  fact: string,
  bounty: number,
  date: Date,
  account: { uid: string },
}

interface ApiMetrics {
  block_height: number,
  package_count: number,
  peer_info: {
    banned: number,
    connected: number,
    disconnected: number,
  },
}

// Perform a best-effort sort on the given list of releases by attempting to treat them as SemVers
const sortReleases = (releases: string[]): string[] => {
  const copy = Array.from(releases);
  copy.sort((a, b) => {
    const a2 = semver.coerce(a) ?? a;
    const b2 = semver.coerce(b) ?? b;
    return -semver.compareLoose(a2, b2);
  });
  return copy;
};

// Convert package data as received from the Dlt Api into the local Package interface
const parsePackage = (data: ApiPackage): Package => ({
  ...defaultPackage,
  platform: data.packagePlatform,
  owner: data.packageOwner,
  name: data.packageName,
  releases: sortReleases(data.packageReleases),
});

// Convert job data as received from the Dlt Api into the local Job interface
const parseJob = (data: ApiJob): Job => ({
  ...defaultJob,
  id: data.jobID,
  package: data.package,
  version: data.version,
  fact: data.fact,
  bounty: data.bounty,
});

// Convert metrics data as received from the Dlt Api into the local Metrics interface
const parseMetrics = (data: ApiMetrics): Metrics => ({
  ...defaultMetrics,
  packages: data.package_count,
  blockheight: data.block_height,
  nodes: data.peer_info.connected,
});

export default class DltApi extends DltInterface {
  #baseUrl = 'http://localhost:3000/api/dlt/';

  async getPackages() {
    const { data } = await axios.get(this.#getLink('packages'));
    return data.packages.map((item: ApiPackage) => parsePackage(item));
  }

  async getPackage(name: string) {
    const { data } = await axios.get(this.#getLink(`package/${name}`));
    return parsePackage(data);
  }

  // TODO: Remove the mock data once this AP endpoint returns correct data
  async getTrustFacts(name: string) {
    const { data } = await axios.get(this.#getLink(`trust-facts/${name}`));
    console.log(data);
    const trustFacts = [];
    for (let i = 0; i < (name.length + 5) % 10; i += 1) {
      trustFacts[i] = {
        type: 'github stars',
        value: i + 1,
      };
    }
    return trustFacts;
  }

  // TODO: This doesn't really belong to the DLT Api, but...
  async getDownloadLink() {
    const { data } = await axios.get('http://localhost:3000/api/download');
    return data;
  }

  async getJobs() {
    const { data } = await axios.get(this.#getLink('jobs'));
    return data.map((item: ApiJob) => parseJob(item));
  }

  async addJob(job: JobForm) {
    const { data } = await axios.post(this.#getLink('add-job'), job);
    console.log(data);
    return data;
  }

  async getMetrics() {
    const { data } = await axios.get(this.#getLink('metrics'));
    return parseMetrics(data);
  }

  async getTrustScore(name: string, release: string) {
    const { data } = await axios.get(this.#getLink(`package/${name}/trustscore/${release}`));
    return data;
  }

  #getLink(to: string) {
    return `${this.#baseUrl}${to}`;
  }
}
