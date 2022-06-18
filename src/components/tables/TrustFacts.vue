<template>
  Release: {{ selectedRelease }}
  <va-data-table :columns="columns" :items="trustFacts"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { TrustFact } from '@/api';

export default defineComponent({
  name: 'trust-facts-table',
  props: {
    trustFacts: {
      type: Object as () => TrustFact[],
      required: true,
    },
    selectedRelease: {
      type: String,
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
  watch: {
    selectedRelease() {
      console.log(this.selectedRelease);
    },
  },
});
</script>

<style scoped>
</style>
