<template>
  <div class="row">
    <div class="flex xs12">
      <va-card>
        <va-card-title>View Packages</va-card-title>
        <va-card-content>
          <va-data-table :columns="columns" :height="height" :items="items" :loading="isLoading" allow-footer-sorting
                         clickable hoverable sticky-header striped @row:click="loadPackage($event)">
            <!--            <template #cell(id)="{ source: id }">-->
            <!--              <va-chip @click="loadPackage(id)">{{ id }}</va-chip>-->
            <!--            </template>-->
          </va-data-table>
        </va-card-content>
      </va-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import router from '@/router';
import { Package } from '@/api';

export default defineComponent({
  name: 'packages-table',
  data() {
    const packages: Package[] = [];

    const columns = [
      {
        key: 'platform',
        sortable: true,
      },
      {
        key: 'owner',
        sortable: true,
      },
      {
        key: 'name',
        sortable: true,
      },
      { key: 'releases' },
      {
        key: 'score',
        alignHead: 'right',
        align: 'right',
        sortable: true,
      },
      {
        key: 'updatedAt',
        sortable: true,
      },
    ];

    // The full viewport, minus the navbar and page body margin/padding and card title and card body margin/padding
    const height = 'calc(100vh - 65px - 3rem - 52px - 20px)';

    return {
      items: packages,
      columns,
      height,
      isLoading: true,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      await this.$fakeDelay();
      this.items = await this.$dltApi.getPackages();
      this.isLoading = false;
    },
    loadPackage(e) { // TODO: How to type this parameter? Vuestic docs say `RowClickEmit` but it doesn't exist
      const { name } = e.item;
      router.push({
        name: 'Package',
        params: { name },
      });
    },
  },
});
</script>
<style scoped>
</style>
