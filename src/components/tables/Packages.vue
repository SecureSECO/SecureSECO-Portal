<template>
  <div class="row">
    <div class="flex xs12">
      <va-card>
        <va-card-title>View Packages</va-card-title>
        <va-card-content>
          <va-input v-model="filter" class="xs12" placeholder="Filter Packages"/>
          <va-data-table :columns="columns" :filter="filter" :height="height" :items="items" :loading="isLoading"
                         allow-footer-sorting clickable hoverable sticky-header striped @row:click="loadPackage">
            <template #cell(updatedAt)="{ rowData }">
              <DisplayDateComponent :date="rowData.updatedAt" isTimeAgo/>
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
import { Package } from '@/api';
import DisplayDateComponent from '@/components/DisplayDate.vue';

interface RowClickEmit {
  event: Event,
  item: Package,
  itemIndex: number,
}

export default defineComponent({
  name: 'packages-table',
  components: {
    DisplayDateComponent,
  },
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

    // The full viewport, minus the navbar and page body margin/padding and card title and card body margin/padding and filter input height/margin
    const height = 'calc(100vh - 65px - 3rem - 52px - 20px - 56px)';

    return {
      columns,
      height,
      items: packages,
      filter: '',
      isLoading: true,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.items = await this.$dltApi.getPackages();
      this.isLoading = false;
    },
    // TODO: How to type this parameter?
    // Vuestic docs say `RowClickEmit` but it doesn't exist, so it's manually defined up above
    loadPackage(e: RowClickEmit) {
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
.va-input {
  margin-bottom: 20px;
}
</style>
