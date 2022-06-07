<template>
  <div class="row">
    <div class="flex xs12">
      <va-card>
        <va-card-title>View Package</va-card-title>
        <va-card-content>
          <package-component :package="package"></package-component>
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
import PackageComponent from '@/components/Package.vue';
import TrustFactsTableComponent from '@/components/tables/TrustFacts.vue';

export default {
  components: {
    PackageComponent,
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
      package: null,
      trustFacts: [],
    };
  },
  async created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      if (this.id) {
        this.package = this.$dltPlugin.getPackage(this.id);
        this.trustFacts = this.$dltPlugin.getTrustFacts(this.id);
        // const { data } = await axios.get(`http://localhost:3000/api/dlt/trust-facts/${this.packageId}`);
      }
    },
  },
};
</script>

<style scoped>
</style>
