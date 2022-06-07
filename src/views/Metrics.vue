<template>
  <va-card>
    <va-card-title>Metrics</va-card-title>
    <va-card-content>
      <spider-log-component/>
      <br />
      <DLTMetricsComponent/>
    </va-card-content>
  </va-card>
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
