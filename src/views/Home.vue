<template>
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
  <add-job-component/>
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
  <div class="row">
    <div class="flex xs12">
      <va-card>
        <va-card-title>Spider toggle button</va-card-title>
        <va-card-content>
          <SpiderToggleButton/>
        </va-card-content>
      </va-card>
    </div>
  </div>
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
        <va-card-title>Trust Facts</va-card-title>
        <va-card-content>
          <TrustFactsTableComponent/>
        </va-card-content>
      </va-card>
    </div>
  </div>
</template>

<script>
import JobsListComponent from '../components/tables/JobsTable.vue';
import AddJobComponent from '../components/AddJob.vue';
import SpiderToggleButton from '../components/button/SpiderToggle.vue';
import DownloadCosyButton from '../components/button/DownloadCoSy.vue';
import TrustFactsTableComponent from '../components/tables/TrustFactsTable.vue';
import SpiderLogComponent from '../components/SpiderLog.vue';

export default {
  name: 'home-view',
  components: {
    TrustFactsTableComponent,
    DownloadCosyButton,
    SpiderLogComponent,
    SpiderToggleButton,
    AddJobComponent,
    JobsListComponent,
  },
};
</script>

<style scoped>
</style>
