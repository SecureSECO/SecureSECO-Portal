<template>
  <div class="badgeWrapper">
    <va-badge :text="`Version: ${selectedVersion}`" color="secondary"/>
    <va-badge :text="`${trustFacts.length} known facts`" color="info"/>
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
    selectedVersion: {
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
    async selectedVersion() {
      this.trustFacts = await this.$dltApi.getTrustFacts(this.name);
    },
  },
});
</script>

<style lang="scss" scoped>
.trustFactCount {
  text-align: right;
}

.badgeWrapper {
  position: absolute;
  top: -0.5em;
  right: -0.5em;
  margin: -2px;
}
</style>

<style lang="scss">
.va-badge__text {
  text-transform: none;
}
</style>
