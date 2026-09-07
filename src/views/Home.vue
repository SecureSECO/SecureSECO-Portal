<template>
  <va-card>
    <va-card-title style="text-transform: none; font-size: 1em;">About TrustSECO</va-card-title>
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
  <va-card v-if="server_type === 1">
    <va-card-title>Data collection</va-card-title>
    <va-card-content>
      <SpiderToggleButton />
      <p style="margin-top: 16px">Collects measurements for outstanding package jobs and submits signed results.</p>
      <p style="margin-top: 8px">Add a package to request measurements. Collection starts automatically when this local instance starts.</p>
    </va-card-content>
  </va-card>
  <va-card>
    <va-card-title>Run your own node</va-card-title>
    <va-card-content><DownloadCosyButton /></va-card-content>
  </va-card>
  <va-card v-for="list in packagelists">
    <va-card-title> {{list.title}} </va-card-title>
    <va-card-content>
      <div class="loading-container" v-if="list.loading">
        <VaIcon name="loop" size="4em" spin />
      </div>
      <TopPackages :packages="list.packages"></TopPackages>
    </va-card-content>
  </va-card>
</template>

<script lang="ts">
import { ServerType } from '@/api';
import SpiderToggleButton from '../components/button/SpiderToggle.vue';
import DownloadCosyButton from '../components/button/DownloadCoSy.vue';
import TopPackages from '../components/TopPackages.vue';
import { TopPackageResult } from '@/api';

interface package_list{
  count: number,
  order: "ascending" | "descending",
  packages: TopPackageResult[],
  title: string,
  loading: boolean
}

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
      packagelists: [
        {packages: [], count: 10, order: "descending", title:"Packages with the highest trust score", loading: true },
        {packages: [], count: 10, order: "ascending", title:"Packages with the lowest trust score", loading: true }
      ] as package_list[],
      top_packages: [],
      worst_packages: [],
    };
  },
  async mounted() {
    this.server_type = await this.$api.getServerType();
    for (let list of this.packagelists){
      list.loading = true;
      list.packages = await this.$dltApi.getTopPackages(list.order, list.count);
      list.loading = false;
    }
  },
};
</script>

<!-- This program has been developed by students from the bachelor Computer Science at Utrecht University within the Software Project course.
© Copyright Utrecht University (Department of Information and Computing Sciences) -->
