<template>
  <div class="row">
    <div class="flex xs12">
      <va-card>
        <va-card-title>Search Package</va-card-title>
        <va-card-content>
          <va-select
            v-model="selectedId"
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
import router from '@/router';

export default defineComponent({
  name: 'search-package-component',
  data() {
    const selectedId = 0;
    const packages: Package[] = [];

    return {
      selectedId,
      packages,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.packages = await this.$dltPlugin.getPackages();
    },
  },
  watch: {
    selectedId() {
      router.push({
        name: 'Package',
        params: { id: this.selectedId },
      });
    },
  },
});
</script>
<style scoped>
</style>
