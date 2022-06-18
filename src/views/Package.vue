<template>
  <div class="row">
    <div class="flex xs12">
      <va-card>
        <va-card-title>View Package</va-card-title>
        <va-card-content>
          <package-details-component ref="packageDetails" :name="name"/>
        </va-card-content>
      </va-card>
    </div>
  </div>
  <div class="row">
    <div class="flex xs12">
      <va-card>
        <va-card-title>Trust facts</va-card-title>
        <va-card-content>
          <trust-facts-table-component ref="trustFactsTable" :name="name" :selectedVersion="selectedVersion"/>
        </va-card-content>
      </va-card>
    </div>
  </div>
</template>

<script>
import PackageDetailsComponent from '@/components/PackageDetails.vue';
import TrustFactsTableComponent from '@/components/tables/TrustFacts.vue';

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
    version: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      selectedVersion: '',
    };
  },
  async mounted() {
    this.$watch('$refs.packageDetails.selectedVersion', (newValue) => {
      this.selectedVersion = newValue;
    });
  },
};
</script>

<style scoped>
</style>
