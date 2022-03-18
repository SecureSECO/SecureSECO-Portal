<template>
  <h1>Package: {{ id }}</h1>
  <package-component :id="id"></package-component>
</template>

<script>
import PackageComponent from '@/components/PackageComponent.vue';

export default {
  name: 'package-component',
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
