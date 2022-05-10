<template>
  <div>
    <va-form
      style="width: 300px;"
      tag="form"
      @submit.prevent="handleSubmit"
    >
      <va-input
        v-model="request_data.project_info.project_platform"
        class="mb-4"
        label="Project Platform"
      />

      <va-input
        v-model="request_data.project_info.project_owner"
        class="mb-4"
        label="Project Owner"
      />

      <va-input
        v-model="request_data.project_info.project_name"
        class="mb-4"
        label="Project Name"
      />

      <va-input
        v-model="request_data.project_info.project_release"
        class="mb-4"
        label="Project Release"
      />

      <va-input
        v-model="request_data.project_info.project_year"
        class="mb-4"
        label="Project Year"
      />

      <va-select
        v-model="request_data.cve_data_points"
        :options="cve_data_points_options"
        class="mt-2"
        clearable
        label="Role"
        multiple
      />

      <va-button class="mt-2" type="submit">
        Spider!
      </va-button>
    </va-form>

    <div class="row">
      <div class="flex md6 lg12">
        <va-inner-loading :loading="loading">
          <va-card v-if="package_data.cve_data_points">
            <va-card-title>{{ request_data.project_info.project_name }}</va-card-title>

            <va-card-content>
              <div v-if="package_data.cve_data_points.cve_count">
                <h3>CVE Count {{ package_data.cve_data_points.cve_count }}</h3>
              </div>

              <hr>

              <div v-if="package_data.cve_data_points.cve_codes">
                <h3>CVE Codes</h3>
                <ul>
                  <li v-for="code in package_data.cve_data_points.cve_codes" :key="code">
                    {{ code }}
                  </li>
                </ul>
              </div>

              <hr>

              <div v-if="package_data.cve_data_points.cve_vulnerabilities">
                <va-data-table
                  :items="package_data.cve_data_points.cve_vulnerabilities"
                />
              </div>
            </va-card-content>
          </va-card>
        </va-inner-loading>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'spider-package-component',
  props: {
    id: String,
  },
  data() {
    return {
      request_data: {
        project_info: {
          project_platform: '',
          project_owner: '',
          project_name: '',
          project_release: '',
          project_year: '',
        },
        cve_data_points: [],
      },
      cve_data_points_options: [
        'cve_count',
        'cve_vulnerabilities',
        'cve_codes',
      ],
      package_data: {},
      loading: false,
    };
  },
  methods: {
    async handleSubmit() {
      this.loading = true;
      this.request_data.cve_data_points = Object.values(this.request_data.cve_data_points);
      await axios.post('http://localhost:3000/api/spider/set_tokens');
      const { data } = await axios.post('http://localhost:3000/api/spider/get_data', this.request_data);
      this.package_data = data;
      this.loading = false;
    },
  },
});
</script>

<style scoped>
</style>
