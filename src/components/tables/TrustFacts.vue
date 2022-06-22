<template>
  <div class="badgeWrapper">
    <va-badge :text="`Version: ${version}`" color="secondary"/>
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
    version: {
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
    async version() {
      await this.updateTrustFacts();
    },
  },
  async mounted() {
    if (this.version !== '') {
      await this.updateTrustFacts();
    }
  },
  methods: {
    async updateTrustFacts() {
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
.va-badge {
  margin: 2px;

  .va-badge__text {
    font-size: 0.8rem;
    text-transform: none;
  }
}
</style>
