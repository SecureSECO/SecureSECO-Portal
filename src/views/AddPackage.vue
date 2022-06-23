<template>
  <va-card>
    <va-card-title>Add new package</va-card-title>
    <va-card-content>
      <add-package-component/>
    </va-card-content>
  </va-card>
</template>

<script>
import AddPackageComponent from '../components/AddPackageComponent.vue';

export default {
  name: 'add-package-view',
  components: {
    AddPackageComponent,
  },
};
</script>

<style scoped>
</style>
