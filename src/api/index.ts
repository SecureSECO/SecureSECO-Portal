import DltMock from './dlt/mock';
import SpiderMock from './spider/mock';
import DltApi from './dlt/api';
import SpiderApi from './spider/api';

export * from './dlt/interface';
export * from './spider/interface';

// Instantiate Api or Mock based on .env
let DltClass;
let SpiderClass;
if (import.meta.env.MODE === 'test' || import.meta.env.MODE === 'no-api') {
  DltClass = DltMock;
  SpiderClass = SpiderMock;
} else {
  DltClass = DltApi;
  SpiderClass = SpiderApi;
}

export const dltApi = new DltClass();
export const spiderApi = new SpiderClass();

/* This program has been developed by students from the bachelor Computer Science at Utrecht University within the Software Project course.
© Copyright Utrecht University (Department of Information and Computing Sciences) */