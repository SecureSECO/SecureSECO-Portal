<template>
  <div class="row">
    <div class="flex xs12">
      <va-card>
        <va-card-title>Search Package</va-card-title>
        <va-card-content>
          <va-select
            v-model="selected"
            :loading="isLoading"
            :options="packages"
            class="mb-4"
            label="Search package name"
            searchable
            text-by="name"
            track-by="name"
            value-by="name"
          />
        </va-card-content>
      </va-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Package } from '@/api';
import router from '@/router';

export default defineComponent({
  name: 'search-package-component',
  data() {
    return {
      packages: [] as Package[],
      selected: 0,
      isLoading: false,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.packages = await this.$dltApi.getPackages();
    },
  },
  watch: {
    selected() {
      this.isLoading = true;
      router.push({
        name: 'Package',
        params: { name: this.selected },
      });
    },
  },
});
</script>
<style scoped>
</style>
