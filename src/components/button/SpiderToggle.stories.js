import SpiderToggle from './SpiderToggle.vue';

export default {
  title: 'SpiderToggle',
  component: SpiderToggle, spiderApi
};


export const Primary = () => ({
  components: { SpiderToggle, spiderApi },
  template: '<SpiderToggle />',
});

