<template>
  <va-card>
    <va-card-title>Job list</va-card-title>
    <va-card-content>
      <JobsListComponent/>
    </va-card-content>
  </va-card>
</template>

<script>
import JobsListComponent from '../components/tables/Jobs.vue';

export default {
  name: 'jobs-view',
  components: {
    JobsListComponent,
  },
};
</script>

<style scoped>
</style>
