<template>
  <div class="row">
    <div class="flex xs12">
      <va-card>
        <va-card-title>View Package</va-card-title>
        <va-card-content>
          <package-details-component :package="package" :trustFactCount="trustFactCount"></package-details-component>
        </va-card-content>
      </va-card>
    </div>
  </div>
  <div class="row">
    <div class="flex xs12">
      <va-card>
        <va-card-title>Trust facts</va-card-title>
        <va-card-content>
          <trust-facts-table-component :trustFacts="trustFacts"></trust-facts-table-component>
        </va-card-content>
      </va-card>
    </div>
  </div>
</template>

<script>
import PackageDetailsComponent from '@/components/PackageDetails.vue';
import TrustFactsTableComponent from '@/components/tables/TrustFacts.vue';
import { defaultPackage } from '@/api/DLTPlugin';

export default {
  components: {
    PackageDetailsComponent,
    TrustFactsTableComponent,
  },
  name: 'package-view',
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      package: defaultPackage,
      trustFacts: [],
      trustFactCount: 0,
    };
  },
  async created() {
    await this.fetchData();
  },
  methods: {
    async fetchData() {
      if (this.id) {
        this.package = await this.$dltPlugin.getPackage(this.id);
        this.trustFacts = await this.$dltPlugin.getTrustFacts(this.id);
        this.trustFactCount = this.trustFacts.length;
        // const { data } = await axios.get(`http://localhost:3000/api/dlt/trust-facts/${this.packageId}`);
      }
    },
  },
};
</script>

<style scoped>
</style>
