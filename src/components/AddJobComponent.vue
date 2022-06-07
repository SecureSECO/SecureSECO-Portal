<template>
  <div class="row">
    <div class="flex xs12">
      <va-card>
        <va-card-title>Add job</va-card-title>
        <va-card-content>
          <va-form>
            <div class="row">
              <va-input v-model="job.platform" :rules="[validateRequired]" class="flex xs6" label="Platform"/>
              <va-input v-model="job.owner" :rules="[validateRequired]" class="flex xs6" label="Owner"/>
              <va-input v-model="job.name" :rules="[validateRequired]" class="flex xs6" label="Name"/>
              <va-input v-model="job.release" :rules="[validateRequired]" class="flex xs6" label="Release"/>
              <div class="flex xs12">
                <va-button type="submit" @click="addJob">Submit</va-button>
                <div v-if="response">
                  <p>{{ response }}</p>
                </div>
              </div>
            </div>
          </va-form>
        </va-card-content>
      </va-card>
    </div>
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
  name: 'add-package-component',
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
    // TODO: Move to generalized validation system
    validateRequired(value: string) {
      return (value && value.length > 0) || 'Field is required';
    },
  },
});
</script>

<style scoped>
</style>
