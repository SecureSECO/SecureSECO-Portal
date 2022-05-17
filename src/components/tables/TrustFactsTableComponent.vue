<template>
  <va-input
    class="mb-4"
    v-model="package"
    placeholder="Enter package name"
  />
  <va-button v-on:click="getFacts">Search!</va-button>
  <va-data-table :items="trust_facts"></va-data-table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'trust-facts-table-component',
  data() {
    return {
      package: '',
      trust_facts: [],
    };
  },
  methods: {
    async getFacts() {
      const { data } = await axios.get('http://localhost:3000/api/dlt/trust-facts', {
        params: {
          packageName: this.package,
        },
      });
      this.trust_facts = data;
    },
  },
});
</script>

<style scoped>
</style>
