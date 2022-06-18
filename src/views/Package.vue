<template>
  <div class="row">
    <div class="flex xs12">
      <va-card>
        <va-card-title>View Package</va-card-title>
        <va-card-content>
          <package-details-component ref="packageDetails" :name="name" :trustFactCount="0"/>
        </va-card-content>
      </va-card>
    </div>
  </div>
  <div class="row">
    <div class="flex xs12">
      <va-card>
        <va-card-title>Trust facts</va-card-title>
        <va-card-content>
          <trust-facts-table-component :name="name" :selectedRelease="selectedRelease"/>
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
  },
  data() {
    return {
      selectedRelease: '',
    };
  },
  async mounted() {
    this.$watch('$refs.packageDetails.selectedRelease', (newValue) => {
      this.selectedRelease = newValue;
    }, { immediate: true });
  },
};
</script>

<style scoped>
</style>
