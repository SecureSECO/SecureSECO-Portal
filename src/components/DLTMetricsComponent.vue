<template>
  <div>
    <va-form tag="form" @submit.prevent="handleSubmit">
      <!-- <va-input v-model="trustfacts"  class="mb4" label="Total trust facts spidered" readonly/> -->
      <va-input v-model="packages" class="mb-4" label="Total number of packages in system" readonly/>
      <va-input v-model="blockheight" class="mb-4" label="Blockheight" readonly/>
      <va-input v-model="nodes" class="mb-4" label="Number of peers connected" readonly/>
      <va-button type="submit" class="mt-2">Refresh</va-button>
    </va-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'DLTMetricsComponent',
  data() {
    return {
      // trustfacts: "",
      packages: '',
      blockheight: '',
      nodes: '',
    };
  },
  methods: {
    async handleSubmit() {
      const { data } = await axios.get('http://localhost:3000/api/dlt/metrics');
      this.packages = data.package_count;
      this.blockheight = data.block_height;
      this.nodes = data.peer_info.connected;
    },
  },
  async mounted() {
    const { data } = await axios.get('http://localhost:3000/api/dlt/metrics');
    this.packages = data.package_count;
    this.blockheight = data.block_height;
    this.nodes = data.peer_info.connected;
  },
});
</script>

<style scoped>
</style>
