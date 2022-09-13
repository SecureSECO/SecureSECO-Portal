<template>
  <va-card>
    <va-card-title>View SearchSECO Miner</va-card-title>
    <va-card-content>
      <miner-details-component ref="minerDetails" :id="id" />
    </va-card-content>
  </va-card>
  <va-card>
    <va-card-title>TODO: SearchSECO Miner Logs</va-card-title>
    <va-card-content>
      <!--
      <trust-facts-table-component
        ref="trustFactsTable"
        :name="name"
        :version="version"
      />
      -->
    </va-card-content>
  </va-card>
</template>

<script>
import MinerDetailsComponent from '@/components/search/MinerDetails.vue';

export default {
  components: {
    MinerDetailsComponent,
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
