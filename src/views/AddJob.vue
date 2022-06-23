<template>
  <va-card>
    <va-card-title>Add new package</va-card-title>
    <va-card-content>
      <add-job-component/>
    </va-card-content>
  </va-card>
</template>

<script>
import AddJobComponent from '../components/AddJobComponent.vue';

export default {
  name: 'addjob-view',
  components: {
    AddJobComponent,
  },
};
</script>

<style scoped>
</style>
