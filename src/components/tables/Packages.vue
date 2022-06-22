<template>
  <div class="row">
    <div class="flex xs12">
      <va-card>
        <va-card-title>View Packages</va-card-title>
        <va-card-content>
          <va-input v-model="filter" class="xs12" placeholder="Filter Packages"/>
          <va-data-table :columns="columns" :filter="filter" :height="height" :items="items" :loading="isLoading"
                         allow-footer-sorting clickable hoverable sticky-header striped @row:click="loadPackage">
            <template #cell(versions)="{ rowData }">
              <div v-if="rowData.versions.length >= 3" class="range">
                <va-badge :text="rowData.versions[rowData.versions.length - 1]" color="secondary"/>
                -
                <va-badge :text="rowData.versions[0]" color="secondary"/>
              </div>
              <div class="list">
                <span v-for="version in rowData.versions" :key="version">
                  <va-badge :text="version" color="secondary" @click.stop="loadPackageVersion(rowData.name, version)"/>
                </span>
              </div>
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

interface RowClickEmit {
  event: Event,
  item: Package,
  itemIndex: number,
}

export default defineComponent({
  name: 'packages-table',
  data() {
    const packages: Package[] = [];

    const columns = [
      {
        key: 'platform',
        verticalAlign: 'top',
        width: '25%',
        sortable: true,
      },
      {
        key: 'owner',
        verticalAlign: 'top',
        width: '25%',
        sortable: true,
      },
      {
        key: 'name',
        verticalAlign: 'top',
        width: '25%',
        sortable: true,
      },
      {
        key: 'versions',
        classes: ['cellVersions'],
        width: '25%',
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
    loadPackage(event: RowClickEmit) {
      const { name } = event.item;
      router.push({
        name: 'Package',
        params: {
          name,
        },
      });
    },
    // Sadly cannot easily merge the two `loadPackage` variants, due to VuesticUI limitations
    loadPackageVersion(name: string, version: string) {
      router.push({
        name: 'Package with Version',
        params: {
          name,
          version,
        },
      });
    },
  },
});
</script>
<style lang="scss" scoped>
.va-input {
  margin-bottom: 20px;
}

.va-badge {
  margin: 0 2px;
}

/* For multiple versions, on row hover switch between range and list views */
.va-data-table__table-tr {
  .cellVersions {
    .range {
      display: block;
    }

    .range + .list {
      display: none;
    }
  }

  &:hover .cellVersions {
    .range {
      display: none;
    }

    .list {
      display: block;
    }
  }
}
</style>
