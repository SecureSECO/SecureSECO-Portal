<template>
  <search-package-component/>
  <add-job-component/>
  <div class="row">
    <div class="flex xs12">
      <va-card>
        <va-card-title>Download</va-card-title>
        <va-card-content>
          <DownloadCosyButton/>
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
import JobsListComponent from '../components/tables/Jobs.vue';
import AddJobComponent from '../components/AddJob.vue';
import DownloadCosyButton from '../components/button/DownloadCoSy.vue';
// import TrustFactsTableComponent from '../components/tables/TrustFacts.vue';
import SpiderLogComponent from '../components/SpiderLog.vue';
import SearchPackageComponent from '../components/SearchPackage.vue';

export default {
  name: 'home-view',
  components: {
    // TrustFactsTableComponent,
    DownloadCosyButton,
    SpiderLogComponent,
    AddJobComponent,
    JobsListComponent,
    SearchPackageComponent,
  },
};
</script>

<style scoped>
</style>
