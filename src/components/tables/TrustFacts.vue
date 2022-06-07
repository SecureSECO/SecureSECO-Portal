<template>
  <!--  <va-input v-model="package" class="mb-4" placeholder="Enter package name"/>-->
  <!--  <va-button v-on:click="getFacts">Search!</va-button>-->
  <va-data-table :columns="columns" :items="trustFacts"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { TrustFact } from '@/api/DLTPlugin';

export default defineComponent({
  name: 'trust-facts-table',
  props: {
    trustFacts: {
      type: Object as () => TrustFact[],
      required: true,
    },
  },
  data() {
    const columns = [
      { key: 'type' },
      { key: 'value' },
    ];

    return {
      columns,
    };
  },
});
</script>

<style scoped>
</style>
