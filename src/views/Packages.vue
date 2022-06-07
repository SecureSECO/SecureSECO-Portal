<template>
  <div>
    <search-package-component></search-package-component>
    <package-table-component></package-table-component>
  </div>
</template>

<script>
import PackageTableComponent from '@/components/tables/Package.vue';
import SearchPackageComponent from '@/components/SearchPackage.vue';

export default {
  name: 'packages-view',
  components: {
    PackageTableComponent,
    SearchPackageComponent,
  },
};
</script>

<style scoped>
</style>
