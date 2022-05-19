<template>
  <h5>Job list</h5>
  <jobs-list-component/>
  <hr/>
  <h5>Add job</h5>
  <add-job-component/>
  <hr/>
  <h5>Spider logs</h5>
  <spider-log-component/>
  <hr/>
  <h5>Spider toggle button</h5>
  <SpiderToggleButton/>
  <hr/>
  <h5>Download</h5>
  <DownloadCosyButton/>
  <hr/>
  <h5>Trust Facts</h5>
  <TrustFactsTableComponent/>
</template>

<script>
import JobsListComponent from '../components/tables/JobsTableComponent.vue';
import AddJobComponent from '../components/AddJobComponent.vue';
import SpiderToggleButton from '../components/button/SpiderToggleButton.vue';
import DownloadCosyButton from '../components/button/DownloadCoSyButton.vue';
import TrustFactsTableComponent from '../components/tables/TrustFactsTableComponent.vue';
import SpiderLogComponent from '../components/SpiderLogComponent.vue';

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
