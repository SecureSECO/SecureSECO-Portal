/* eslint-disable class-methods-use-this */
import {
  defaultPackage, defaultJob, DltInterface, Package, TrustFact, Job,
} from '@/api/dlt/interface';
import axios from 'axios';

interface ApiPackage {
  packagePlatform: string,
  packageOwner: string,
  packageName: string,
  packageReleases: string[],
  // TODO: this should get `score` and `updatedAt` fields
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

// Convert package data as received from the Dlt Api into the local Package interface
const parsePackage = (data: ApiPackage): Package => ({
  ...defaultPackage,
  platform: data.packagePlatform,
  owner: data.packageOwner,
  name: data.packageName,
  releases: data.packageReleases,
  score: Math.floor(100 * Math.random()), // TODO: Why is this not already in the request?
  updatedAt: new Date(Date.now() - data.packageName.length * 24 * 60 * 60 * 1000), // TODO: nice to have for UE
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

export default class DltApi extends DltInterface {
  async getPackages() {
    const { data } = await axios.get('http://localhost:3000/api/dlt/packages');
    return data.packages.map((item: ApiPackage) => parsePackage(item));
  }

  async getPackage(name: string) {
    const { data } = await axios.get(`http://localhost:3000/api/dlt/package/${name}`);
    return parsePackage(data);
  }

  // TODO: Remove the mock data once this AP endpoint returns correct data
  async getTrustFacts(name: string) {
    const { data } = await axios.get(`http://localhost:3000/api/dlt/trust-facts/${name}`);
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

  async getDownloadLink() {
    const { data } = await axios.get('http://localhost:3000/api/download');
    return data;
  }

  async getJobs() {
    const { data } = await axios.get('http://localhost:3000/api/dlt/jobs');
    return data.map((item: ApiJob) => parseJob(item));
  }
}
