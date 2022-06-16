<template>
  <div class="row">
    <div class="flex xs12">
      <va-card>
        <va-card-title>View Packages</va-card-title>
        <va-card-content>
          <va-data-table :columns="columns" :height="height" :items="items" allow-footer-sorting clickable hoverable
                         sticky-header striped @row:click="loadPackage">
            <template #cell(releases)="{ rowData }">
              <div v-if="rowData.releases.length >= 3" class="range">
                <va-badge :text="rowData.releases[rowData.releases.length - 1]" color="secondary"/>
                -
                <va-badge :text="rowData.releases[0]" color="secondary"/>
              </div>
              <div class="list">
                <span v-for="release in rowData.releases" :key="rowData.name + release">
                  <va-badge :text="release" color="secondary"/>
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
import semver from 'semver';

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
        key: 'releases',
        classes: ['cellReleases'],
        width: '25%',
      },
    ];

    // The full viewport, minus the navbar and page body margin/padding and card title and card body margin/padding
    const height = 'calc(100vh - 65px - 3rem - 52px - 20px)';

    return {
      items: packages,
      columns,
      height,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const packages = await this.$dltApi.getPackages();
      packages.forEach((pack) => {
        pack.releases.sort((a, b) => {
          const a2 = semver.coerce(a) ?? a;
          const b2 = semver.coerce(b) ?? b;
          return -semver.compareLoose(a2, b2);
        });
      });
      this.items = packages;
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
<style lang="scss" scoped>
.va-badge {
  margin: 0 2px;
}

/* For multiple releases, on row hover switch between range and list views */
.va-data-table__table-tr {
  .cellReleases {
    .range {
      display: block;
    }

    .range + .list {
      display: none;
    }
  }

  &:hover .cellReleases {
    .range {
      display: none;
    }

    .list {
      display: block;
    }
  }
}
</style>
