<template>
  <va-form style="width: 300px; padding: 0.75rem">
    <va-input
      class="mb-4"
      label="Package platform"
      v-model="job.platform"
      :rules="[value => (value && value.length > 0) || 'Field is required']"
    />

    <va-input
      class="mb-4"
      label="Package Owner"
      v-model="job.owner"
      :rules="[value => (value && value.length > 0) || 'Field is required']"
    />

    <va-input
      class="mb-4"
      label="Package name"
      v-model="job.name"
      :rules="[value => (value && value.length > 0) || 'Field is required']"
    />

    <va-input
      class="mb-4"
      label="Package Release"
      v-model="job.release"
      :rules="[value => (value && value.length > 0) || 'Field is required']"
    />
    <va-button v-on:click="addJob" type="submit" class="mt-2">
      Submit
    </va-button>
  </va-form>
  <div v-if="response">
    <p>{{ response }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

interface Job {
  platform: string,
  owner: string,
  name: string,
  release: string
}

export default defineComponent({
  name: 'add-job-component',
  data() {
    return {
      response: '',
      job: {
        platform: '',
        owner: '',
        name: '',
        release: '',
      },
    };
  },
  methods: {
    async addJob(job: Job) {
      const { data } = await axios.post('http://localhost:3000/api/dlt/add-job', job);
      this.response = data;
    },
  },
});
</script>

<style scoped>
</style>
