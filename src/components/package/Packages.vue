<template>
  <va-input v-model="query.filter" class="xs12 filter" placeholder="Filter Packages" />
  <div class="loading-container" v-if="isLoading">
    <VaIcon name="loop" size="4em" spin />
  </div>
  <PackageComponent v-for="pack in packages" :package="pack" :key="pack" v-if="!isLoading"></PackageComponent>
  <div class="center">
    <VaPagination v-model="query.page" :pages="pages" input />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Package } from '@/api';
import PackageComponent from './Package.vue';

export default defineComponent({
  name: 'packages-table',
  data() {
    return {
      packages: [] as Package[],
      query: {
        filter: '',
        count: 20,
        page: 1,
      },
      total: 0,
      isLoading: true,
      pages: 1,
    };
  },
  methods: {
    async fetchData() {
      this.isLoading = true;
      console.log(this.query)
      const { packages, total } = await this.$dltApi.getPackages((this.query.page - 1) * this.query.count, this.query.count, this.query.filter);
      this.packages = packages;
      this.total = total;
      this.pages = Math.ceil(this.total / this.query.count);
      this.isLoading = false;
    },
  },
  watch: {
    query: {
      handler() {
        this.fetchData();
      },
      immediate: true,
      deep: true
    }
  },
  components: {
    PackageComponent,
  },
});
</script>

<style scoped>
.loading-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
}

.center {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
