<template>
  <va-data-table :items="jobs"></va-data-table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'jobs-table-component',
  data() {
    return {
      jobs: [],
    };
  },
  async created() {
    const { data: { jobs } } = await axios.get('http://localhost:3000/api/dlt/jobs');
    this.jobs = jobs;
  },
});
</script>

<style scoped>
</style>
