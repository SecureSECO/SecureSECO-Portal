<template>
  <search-package-component/>
  <div class="row">
    <div class="flex xs12">
      <va-card>
        <va-card-title>CoSy and Spider status</va-card-title>
        <va-card-content>
          <DownloadCosyButton/>
        </va-card-content>
        <va-card-content>
          <spider-toggle-button />
        </va-card-content>
      </va-card>
    </div>
  </div>
  <div class="row">
    <div class="flex xs12">
      <va-card>
        <va-card-title>Job list</va-card-title>
        <va-card-content>
          <jobs-list-component/>
        </va-card-content>
      </va-card>
    </div>
  </div>
  <div class="row">
    <div class="flex xs12">
      <va-card>
        <va-card-title>Spider logs</va-card-title>
        <va-card-content>
          <spider-log-component/>
        </va-card-content>
      </va-card>
    </div>
  </div>
  <!--  <div class="row">-->
  <!--    <div class="flex xs12">-->
  <!--      <va-card>-->
  <!--        <va-card-title>Trust Facts</va-card-title>-->
  <!--        <va-card-content>-->
  <!--          <TrustFactsTableComponent/>-->
  <!--        </va-card-content>-->
  <!--      </va-card>-->
  <!--    </div>-->
  <!--  </div>-->
</template>

<script>
import SpiderToggleButton from '../components/button/SpiderToggle.vue';
import DownloadCosyButton from '../components/button/DownloadCoSy.vue';
import JobsListComponent from '../components/tables/Jobs.vue';

import SearchPackageComponent from '../components/SearchPackage.vue';

export default {
  name: 'home-view',
  components: {
    DownloadCosyButton,
    SpiderToggleButton,
    JobsListComponent,
    SearchPackageComponent,
  },
};
</script>

<style scoped>
</style>
