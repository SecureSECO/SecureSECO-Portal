<template>
  <va-modal
    v-model="modal.showGitHubProfileLinkModal"
    hide-default-actions
    overlay-opacity="0.2"
  >
    <template #header>
      <h2>GitHub Profile Link</h2>
    </template>
    <div>Blabla</div>
    <template #footer>
      <va-button @click="modal.showGitHubProfileLinkModal = false">
        Close
      </va-button>
    </template>
  </va-modal>
  
  <va-modal
    v-model="modal.showGitHubTokenModal"
    hide-default-actions
    overlay-opacity="0.2"
  >
    <template #header>
      <h2>GitHub Token</h2>
    </template>
    <div>Blabla</div>
    <template #footer>
      <va-button @click="modal.showGitHubTokenModal = false">
        Close
      </va-button>
    </template>
  </va-modal>

  <va-modal
    v-model="modal.showLibrariesIOTokenModal"
    hide-default-actions
    overlay-opacity="0.2"
  >
    <template #header>
      <h2>Libraries.IO Token</h2>
    </template>
    <div>Blabla</div>
    <template #footer>
      <va-button @click="modal.showLibrariesIOTokenModal = false">
        Close
      </va-button>
    </template>
  </va-modal>

  <va-modal
    v-model="modal.showDLTGPGModal"
    hide-default-actions
    overlay-opacity="0.2"
  >
    <template #header>
      <h2>DLT GPG Key</h2>
    </template>
    <div>Blabla</div>
    <template #footer>
      <va-button @click="modal.showDLTGPGModal = false">
        Close
      </va-button>
    </template>
  </va-modal>


  <div class="flex xs12">
    <va-form
      tag="form"
      @submit.prevent="handleSubmit"
    >
      <div class="row">
        <va-input
            v-model="request_data.user.gh_profile_link"
            class="flex xs11"
            label="GitHub Profile Link"
            placeholder="https://github.com/user"
            :rules="[validateGitHub]"
          />

        <va-icon class="flex xs1 material-icons" @click="modal.showGitHubProfileLinkModal = true">info</va-icon>
      </div>

      <div class="row">
        <va-input
          v-model="request_data.user.gh_token"
          class="flex xs11"
          label="GitHub personal token"
          :rules="[validateRequired]"
        />

        <va-icon class="flex xs1 material-icons" @click="modal.showGitHubTokenModal = true">info</va-icon>
      </div>

      <div class="row">
        <va-input
          v-model="request_data.user.libraries_token"
          class="flex xs11"
          label="Libraries.IO personal token"
          :rules="[validateRequired]"
        />

        <va-icon class="flex xs1 material-icons" @click="modal.showLibrariesIOTokenModal = true">info</va-icon>
      </div>

      <div class="row">
        <va-input
          v-model="request_data.user.dlt_gpg"
          class="flex xs11"
          label="DLT GPG key"
          type="textarea"
          autosize
          readonly
        />
      
        <va-icon class="flex xs1 material-icons" @click="modal.showDLTGPGModal = true">info</va-icon>
      </div>

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
      modal: {
        showGitHubProfileLinkModal: false,
        showGitHubTokenModal: false,
        showLibrariesIOTokenModal: false,
        showDLTGPGModal: false,
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
        github_token: this.request_data.user.gh_token,
        libraries_token: this.request_data.user.libraries_token,
      });
    },
    validateGitHub(value: string) {
      return (value && value.length > 0 && (value.startsWith('https://github.com/') || value.startsWith('https://www.github.com/'))) || 'Enter GitHub profile link, i.e. https://github.com/userName';
    },
    validateRequired(value: string) {
      return (value && value.length > 0) || 'Field is required';
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
