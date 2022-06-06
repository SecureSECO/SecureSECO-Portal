<template>
  <div class="row">
    <div class="flex xs12">
      <va-card>
        <va-card-title>Search Package</va-card-title>
        <va-card-content>
          <va-select
            v-model="selectedPackage"
            :options="packages"
            class="mb-4"
            label="Search package name"
            searchable
            text-by="name"
            track-by="id"
            value-by="id"
          />
        </va-card-content>
      </va-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Package } from '@/api/DLTPlugin';

export default defineComponent({
  name: 'search-package-component',
  data() {
    const selectedPackage = '';
    const packages: Package[] = [];

    return {
      selectedPackage,
      packages,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.packages = this.$dltPlugin.retrievePackages();
    },
  },
  watch: {
    selectedPackage() {
      console.log(1);
    },
  },
});
</script>
<style scoped>
</style>
