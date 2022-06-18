<template>
  <div class="row">
    <div class="flex xs6">
      Release: {{ selectedRelease }}
    </div>
    <div class="flex xs6 trustFactCount">
      {{ trustFacts.length }} known Trust Facts
    </div>
  </div>
  <va-data-table :columns="columns" :items="trustFacts"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { TrustFact } from '@/api';

export default defineComponent({
  name: 'trust-facts-table',
  props: {
    name: {
      type: String,
      required: true,
    },
    selectedRelease: {
      type: String,
      required: true,
    },
  },
  data() {
    const trustFacts: TrustFact[] = [];
    const columns = [
      { key: 'type' },
      { key: 'value' },
    ];

    return {
      trustFacts,
      columns,
    };
  },
  watch: {
    async selectedRelease() {
      this.trustFacts = await this.$dltApi.getTrustFacts(this.name);
    },
  },
});
</script>

<style scoped>
.trustFactCount {
  text-align: right;
}
</style>
