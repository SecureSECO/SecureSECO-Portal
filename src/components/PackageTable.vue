<template>
  <va-data-table :items="items">
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
    const packages : Package[] = [];

    const columns = [
      { key: 'name' },
      { key: 'id' },
      { key: 'score' },
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
      this.items = this.$dltPlugin.retrievePackages();
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
