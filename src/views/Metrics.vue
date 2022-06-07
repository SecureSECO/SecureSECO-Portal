<template>
  <h1>Metrics</h1><br />
      <va-card>
          <va-card-title>Spider log</va-card-title>
          <va-card-content>
            <spider-log-component/>
          </va-card-content>
      </va-card>
      <br />
      <va-card>
          <va-card-title>DLT Metrics</va-card-title>
          <va-card-content>
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
