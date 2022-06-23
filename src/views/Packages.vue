<template>
  <va-card>
    <va-card-title>View Packages</va-card-title>
    <va-card-content>
      <packages-table-component></packages-table-component>
    </va-card-content>
  </va-card>
</template>

<script>
import PackagesTableComponent from '@/components/tables/Packages.vue';

export default {
  name: 'packages-view',
  components: {
    PackagesTableComponent,
  },
};
</script>

<style scoped>
</style>
