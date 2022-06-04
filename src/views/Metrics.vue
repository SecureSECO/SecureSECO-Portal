<template>
  <h4>Metrics</h4>
  <spider-log-component/>
  <br>
  <DLTMetricsComponent/>
</template>

<script>
import SpiderLogComponent from '../components/SpiderLog.vue';
import DLTMetricsComponent from '../components/DLTMetricsComponent.vue';

export default {
  name: 'metrics-view',
  components: {
    SpiderLogComponent,
    DLTMetricsComponent,
  },
};
</script>

<style scoped>
</style>
