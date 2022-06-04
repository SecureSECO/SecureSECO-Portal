<template>
  <div>
    <va-form
      style="width: 300px;"
      tag="form"
      @submit.prevent="handleSubmit"
    >
	
	  <va-input
        v-model="request_data.user.gh_profile_link"
        class="mb-4"
        label="GitHub Profile Link"
        value="data.gh-profile-link"
      />
	
      <va-input
        v-model="request_data.user.gh_token"
        class="mb-4"
        label="GitHub personal token"
		value="data.gh_token"
      />

      <va-input
        v-model="request_data.user.librariesio_token"
        class="mb-4"
        label="Libraries.IO personal token"
		value="data.librariesio_token"
      />

      <va-input
        v-model="request_data.user.dlt_gpg"
        class="mb-4"
        label="DLT GPG key"
        value="data.dlt_gpg"
      />
      <va-button type="submit" class="mt-2">Save</va-button>
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
          gh_profile_link: '',
          gh_token: '',
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
      axios.post('/api/dlt/store-github-link', {
        data: this.request_data.user.gh_profile_link
      })
      .then(function (response) {
      })
      .catch(function (error) {
      });

      axios.post('/api/dlt/store-github-token', {
        data: this.request_data.user.gh_token
      }).then(function (response) {     })
        .catch(function (error) {      });
      
      
      axios.post('/spider/store-librariesio-token', {
      data: this.request_data.user.librariesio_token
      })
      .then(function (response) {
      })
      .catch(function (error) {
      });
      console.log("User data updated");
    },
  },
  async created() {
    const { data: { gh_profile_link } } = await axios.get('http://localhost:3000/api/dlt/get-github-link');
	  const { data: { gh_token } } = await axios.get('http://localhost:3000/api/dlt/get-github-token');
	  const { data: { librariesio_token } } = await axios.get('http://localhost:3000/api/dlt/get-librariesio-token');
	  const { data: { dlt_gpg } } = await axios.get('http://localhost:3000/api/dlt/get-gpg-key');
    this.data.gh_profile_link=data.gh_profile_link;
    this.data.gh_token=data.gh_token;
    this.data.librariesio_token=data.librariesio_token;
    this.data.dlt_gpg=data.dlt_gpg;
  },
});
</script>

<style scoped>
</style>
