<template>
  <va-data-table :items="jobs"></va-data-table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Job } from '@/api';

export default defineComponent({
  name: 'jobs-table',
  data() {
    return {
      jobs: [] as Job[],
    };
  },
  async mounted() {
    this.jobs = await this.$dltApi.getJobs();
  },
});
</script>

<style scoped>
</style>
