<template>
  <div class="row">
    <div class="flex xs12">
      <va-card>
        <va-card-title>Add job</va-card-title>
        <va-card-content>
          <va-data-table :columns="columns" :items="items">
            <template #cell(id)="{ source: id }">
              <va-chip @click="loadPackage(id)">{{ id }}</va-chip>
            </template>
          </va-data-table>
        </va-card-content>
      </va-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import router from '@/router';
import { Package } from '@/api/DLTPlugin';

export default defineComponent({
  name: 'package-table',
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
    async fetchData() {
      this.items = await this.$dltPlugin.getPackages();
    },
    loadPackage(id: string) {
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
