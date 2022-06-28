<template>
  <va-card>
    <va-card-title>View Package</va-card-title>
    <va-card-content>
      <package-details-component ref="packageDetails" :name="name" :version="version"/>
    </va-card-content>
  </va-card>
  <va-card>
    <va-card-title>Trust facts</va-card-title>
    <va-card-content>
      <trust-facts-table-component ref="trustFactsTable" :name="name" :version="version"/>
    </va-card-content>
  </va-card>
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
};
</script>

<style scoped>
</style>

<!-- This program has been developed by students from the bachelor Computer Science at Utrecht University within the Software Project course.
© Copyright Utrecht University (Department of Information and Computing Sciences) -->