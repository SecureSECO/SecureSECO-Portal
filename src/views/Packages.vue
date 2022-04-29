<template>
  <h1 class="display-5">Package Table</h1>
  <package-table-component></package-table-component>
</template>

<script>
import PackageTableComponent from '@/components/PackageTableComponent.vue';

export default {
  name: 'packages-view',
  components: {
    PackageTableComponent,
  },
};
</script>

<style scoped>
</style>
