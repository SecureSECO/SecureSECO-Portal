<template>
  <div>
    <va-form
      
      tag="form"
      @submit.prevent="handleSubmit"
    >

    <va-input
        v-model="request_data.user.gh_profile_link"
        class="mb-4"
        label="GitHub Profile Link"
        value="data.gh-profile-link"
        placeholder="http://github.com/user"
      />

      <va-input
        v-model="request_data.user.gh_token"
        class="mb-4"
        label="GitHub personal token"
		value="data.gh_token"
      />

      <va-input
        v-model="request_data.user.libraries_token"
        class="mb-4"
        label="Libraries.IO personal token"
		    value="data.libraries_token"
      />

      <va-input
        v-model="request_data.user.dlt_gpg"
        class="mb-4"
        label="DLT GPG key"
        value="data.dlt_gpg"
        type="textarea"
        autosize
        readonly
      />
      <va-button type="submit" class="mt-2">Save</va-button>
    </va-form>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'user-settings-component',
  props: {
    id: String,
  },
  data() {
    return {
      request_data: {
        user: {
          gh_profile_link: '',
          gh_token: '',
          libraries_token: '',
          dlt_gpg: '',
        },
      },
      package_data: {},
      loading: false,
    };
  },
  methods: {
    async handleSubmit() {
      axios.post('http://localhost:3000/api/dlt/store-github-link', {
        data: this.request_data.user.gh_profile_link,
      });

      axios.post('http://localhost:3000/api/spider/set-tokens', {
        "github_token": this.request_data.user.gh_token,
        "libraries_token": this.request_data.user.libraries_token,
      });

    },
  },
  async mounted() {
    this.request_data.user.gh_profile_link = (await axios.get('http://localhost:3000/api/dlt/get-github-link')).data;
    const { data } = await axios.get('http://localhost:3000/api/spider/get-tokens');
    this.request_data.user.gh_token = data.github_token;
    this.request_data.user.libraries_token = data.libraries_token;
    this.request_data.user.dlt_gpg = (await axios.get('http://localhost:3000/api/dlt/get-gpg-key')).data;
  },
});
</script>

<style scoped>
</style>
