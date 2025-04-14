<template>
  <va-card>
    <va-card-title>About TrustSECO</va-card-title>
    <va-card-content>
      <p> TrustSECO is a community-managed infrastructure that underpins the Software Ecosystem (SECO) with a trust
        layer.
        The infrastructure gathers data on trust in particular software packages and projects. With this data software
        end-users can determine whether packages (versions) are reliable, contain vulnerabilities, and are trusted by
        other users.
      </p>
      <br />
      <p> In TrustSECO you can: </p>
      <ul class="va-unordered">
        <li> View trustfacts for software packages. </li>
        <li> Evaluate software packages based on an aggregated trust score. </li>
        <li> Request for data to be gathered of a package. </li>
        <li> Earn tokens by running the spider locally. </li>
      </ul>
      <p> For more information visit the <a href="https://github.com/SecureSECO/SecureSECO">GitHub page.</a> </p>
    </va-card-content>
  </va-card>
  <va-card>
    <va-card-title>CoSy and Spider status</va-card-title>
    <va-card-content v-if="this.server_type === 0">
      <div> In order to add packages or mine jobs for a token reward, download and run an instance locally:</div>
    </va-card-content>
    <va-card-content>
      <DownloadCosyButton />
    </va-card-content>
    <va-card-content>
      <SpiderToggleButton />
    </va-card-content>
  </va-card>
  <va-card>
    <va-card-title>Packages with the highest trust score</va-card-title>
    <va-card-content>

      <TopPackages :packages="this.top_packages"></TopPackages>
    </va-card-content>
  </va-card>
  <va-card>
    <va-card-title> Packages with the lowest trust score </va-card-title>
    <va-card-content>
      <TopPackages :packages="this.worst_packages"></TopPackages>
    </va-card-content>
  </va-card>
</template>

<script>
import { ServerType } from '@/api';
import SpiderToggleButton from '../components/button/SpiderToggle.vue';
import DownloadCosyButton from '../components/button/DownloadCoSy.vue';
import TopPackages from '../components/TopPackages.vue';

export default {
  name: 'home-view',
  components: {
    DownloadCosyButton,
    SpiderToggleButton,
    TopPackages,
  },
  data() {
    return {
      server_type: ServerType.Public,
      top_packages: [],
      worst_packages: [],
    };
  },
  async mounted() {
    this.server_type = await this.$api.getServerType();
    this.top_packages = await this.$dltApi.getTopPackages("descending", 10);
    this.worst_packages = await this.$dltApi.getTopPackages("ascending", 10);
  },
};
</script>

<!-- This program has been developed by students from the bachelor Computer Science at Utrecht University within the Software Project course.
© Copyright Utrecht University (Department of Information and Computing Sciences) -->
