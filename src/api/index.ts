import DltMock from './dlt/mock';
// import SpiderMock from './spider/mock';
import DltApi from './dlt/api';
// import SpiderApi from './spider/api';

export { DltInterface } from './dlt/interface';
// export { SpiderInterface } from './spider/interface';

// Instantiate Api or Mock based on .env
let DltClass;
// let spiderClass;
if (process.env.NODE_ENV === 'development') {
  DltClass = DltMock;
  // SpiderClass = SpiderMock;
} else {
  DltClass = DltApi;
  // SpiderClass = SpiderApi;
}

export const dltApi = new DltClass();
// export const spiderApi = new SpiderClass();
