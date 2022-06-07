<template>
  <va-card>
    <va-card-title>DLT Metrics</va-card-title>
	<va-card-content>
      <va-form tag="form" @submit.prevent="handleSubmit">
  		<!-- <va-input v-model="trustfacts"  class="flex xs6" label="Total trust facts spidered" readonly/> -->
    	<va-input v-model="packages" class="flex xs6" label="Total number of packages in system" readonly/>
    	<va-input v-model="blockheight" class="flex xs6" label="Blockheight" readonly/>
    	<va-input v-model="nodes" class="flex xs6" label="Number of peers connected" readonly/>
    	<va-button type="submit" class="mt-2">Refresh</va-button>
      </va-form>
    </va-card-content>
  </va-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'DLTMetricsComponent',
  data() {
    return {
      // trustfacts: "",
      packages: "",
      blockheight: "",
      nodes: "",
    };
  },
  methods: {
    async handleSubmit() {
    	const { data } = await axios.get('http://localhost:3000/api/dlt/metrics');
    	// this.trustfacts = data.trustfacts;
      
    	this.packages = data.package_count;
    	this.blockheight = data.block_height;
    	this.nodes = data.peer_info.connected;
    },
  },
  async mounted() {
    const { data } = await axios.get('http://localhost:3000/api/dlt/metrics');
    // this.trustfacts = data.trustfacts;
    this.packages = data.package_count;
    this.blockheight = data.block_height;
    this.nodes = data.peer_info.connected;
  },
});
</script>

<style scoped>
</style>
