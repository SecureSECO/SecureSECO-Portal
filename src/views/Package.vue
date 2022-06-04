<template>
  <div class="row">
    <div class="flex xs12">
      <va-card>
        <va-card-title>View Package</va-card-title>
        <va-card-content>
          <package-component :id="id"></package-component>
        </va-card-content>
      </va-card>
    </div>
  </div>
</template>

<script>
import PackageComponent from '@/components/Package.vue';

export default {
  name: 'package-view',
  props: {
    id: Number,
  },
  components: {
    PackageComponent,
  },
};
</script>

<style scoped>
</style>
