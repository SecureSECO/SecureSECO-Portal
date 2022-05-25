<template>
  <h1>Package: {{ id }}</h1>
  <package-component :id="id"></package-component>
</template>

<script>
import PackageComponent from '@/components/Package.vue';

export default {
  name: 'package-view',
  props: {
    id: String,
  },
  components: {
    PackageComponent,
  },
};
</script>

<style scoped>
</style>
