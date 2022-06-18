<template>
  <div class="row">
    <div class="flex xs12">
      <va-card>
        <va-card-title>View Package</va-card-title>
        <va-card-content>
          <package-details-component ref="packageDetails" :name="name" :trustFactCount="trustFacts.length"/>
        </va-card-content>
      </va-card>
    </div>
  </div>
  <div class="row">
    <div class="flex xs12">
      <va-card>
        <va-card-title>Trust facts</va-card-title>
        <va-card-content>
          <trust-facts-table-component :selectedRelease="selectedRelease" :trustFacts="trustFacts"/>
        </va-card-content>
      </va-card>
    </div>
  </div>
</template>

<script>
import PackageDetailsComponent from '@/components/PackageDetails.vue';
import TrustFactsTableComponent from '@/components/tables/TrustFacts.vue';
import { defaultPackage } from '@/api';

export default {
  components: {
    PackageDetailsComponent,
    TrustFactsTableComponent,
  },
  name: 'package-view',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      package: defaultPackage,
      trustFacts: [],
      selectedRelease: '',
    };
  },
  async created() {
    await this.fetchData();
    this.$watch('$refs.packageDetails.selectedRelease', (newValue) => {
      this.selectedRelease = newValue;
    }, { immediate: true });
  },
  methods: {
    async fetchData() {
      this.trustFacts = await this.$dltApi.getTrustFacts(this.name);
    },
  },
};
</script>

<style scoped>
</style>
