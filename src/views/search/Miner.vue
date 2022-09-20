<template>
  <va-card>
    <va-card-title>View SearchSECO Miner</va-card-title>
    <va-card-content>
      <miner-details-component ref="minerDetails" :id="id" />
    </va-card-content>
  </va-card>
  <va-card>
    <va-card-title>SearchSECO Miner Logs</va-card-title>
    <va-card-content>
      <miner-log-component :id="id" />
    </va-card-content>
  </va-card>
</template>

<script>
import MinerDetailsComponent from '@/components/search/MinerDetails.vue';
import MinerLogComponent from '@/components/search/MinerLog.vue';

export default {
  components: {
    MinerDetailsComponent,
    MinerLogComponent,
  },
  name: 'search-miner-view',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped></style>
