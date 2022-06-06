<template>
  <va-data-table :columns="columns" :items="items">
    <template #cell(id)="{ source: id }">
      <va-chip @click="packageClick(id)">{{ id }}</va-chip>
    </template>
  </va-data-table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import router from '@/router';
import { Package } from '@/api/DLTPlugin';

export default defineComponent({
  name: 'package-table-component',
  data() {
    const packages: Package[] = [];

    const columns = [
      { key: 'id' },
      // { key: 'platform' },
      // { key: 'owner' },
      { key: 'name' },
      // { key: 'release' },
      { key: 'score' },
      { key: 'updatedAt' },
    ];

    return {
      items: packages,
      columns,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.items = this.$dltPlugin.getPackages();
    },
    packageClick(id: string) {
      router.push({
        name: 'Package',
        params: { id },
      });
    },
  },
});
</script>
<style scoped>
</style>
