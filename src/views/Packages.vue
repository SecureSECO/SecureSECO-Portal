<template>
  <div>
    <!--    <search-package-component></search-package-component>-->
    <packages-table-component></packages-table-component>
  </div>
</template>

<script>
import PackagesTableComponent from '@/components/tables/Packages.vue';
// import SearchPackageComponent from '@/components/SearchPackage.vue';

export default {
  name: 'packages-view',
  components: {
    PackagesTableComponent,
    // SearchPackageComponent,
  },
};
</script>

<style scoped>
</style>
