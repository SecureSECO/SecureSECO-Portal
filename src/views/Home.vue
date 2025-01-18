<template>
  <va-card>
    <va-card-title>CoSy and Spider status</va-card-title>
    <va-card-content v-if="this.server_type===0">
      <div> In order to add packages or mine jobs for a token reward, download and run an instance locally:</div>
    </va-card-content>
    <va-card-content>
      <DownloadCosyButton/>
    </va-card-content>
    <va-card-content>
      <SpiderToggleButton/>
    </va-card-content>
  </va-card>
  <va-card>
    <va-card-title>Job list</va-card-title>
    <va-card-content>
      <JobsListComponent/>
    </va-card-content>
  </va-card>
</template>

<script>
import { ServerType } from '@/api';
import SpiderToggleButton from '../components/button/SpiderToggle.vue';
import DownloadCosyButton from '../components/button/DownloadCoSy.vue';
import JobsListComponent from '../components/tables/Jobs.vue';

export default {
  name: 'home-view',
  components: {
    DownloadCosyButton,
    SpiderToggleButton,
    JobsListComponent,
  },
  data() {
    return {
      server_type: ServerType.Public,
    };
  },
  async mounted() {
    this.server_type = await this.$api.getServerType();
  },
};
</script>

<style scoped>
</style>

<!-- This program has been developed by students from the bachelor Computer Science at Utrecht University within the Software Project course.
© Copyright Utrecht University (Department of Information and Computing Sciences) -->
