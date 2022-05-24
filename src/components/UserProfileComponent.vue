<template>
  <div>
    <va-form
      style="width: 300px;"
      tag="form"
      @submit.prevent="handleSubmit"
    >
      <va-input
        v-model="request_data.user.name"
        class="mb-4"
        label="Name"
      />

      <va-input
        v-model="request_data.user.github_token"
        class="mb-4"
        label="GitHub personal token"
      />

      <va-input
        v-model="request_data.user.librariesio_token"
        class="mb-4"
        label="Libraries.IO personal token"
      />

      <va-input
        v-model="request_data.user.dlt_gpg"
        class="mb-4"
        label="DLT GPG key"
      />

    </va-form>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'user-profile-component',
  props: {
    id: String,
  },
  data() {
    return {
      request_data: {
        user: {
          name: '',
          github_token: '',
          librariesio_token: '',
          dlt_gpg: '',
        },
      },
      package_data: {},
      loading: false,
    };
  },
  methods: {
    async handleSubmit() {
      /*this.loading = true;
      this.request_data.cve_data_points = Object.values(this.request_data.cve_data_points);
      await axios.post('http://localhost:3000/api/spider/set_tokens');
      const { data } = await axios.post('http://localhost:3000/api/spider/get_data', this.request_data);
      this.package_data = data;
      this.loading = false;*/
      console.log("User data updated");
    },
  },
});
</script>

<style scoped>
</style>
