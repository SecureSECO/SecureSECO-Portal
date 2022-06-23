<template>
  <div class="badgeWrapper">
    <va-badge :text="`Version: ${version}`" color="secondary"/>
    <va-badge :text="`${trustFacts.length} known facts`" color="info"/>
  </div>
  <va-input v-model="filter" class="xs12 filter" placeholder="Filter Trust Facts"/>
  <va-data-table :columns="columns" :filter="filter" :items="trustFacts" :loading="isLoading" allow-footer-sorting
                 clickable hoverable sticky-header striped/>
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
    const columns = [
      {
        key: 'type',
        width: '50%',
        alignHead: 'right',
        align: 'right',
        verticalAlign: 'top',
        sortable: true,
      },
      {
        key: 'value',
        width: '50%',
        verticalAlign: 'top',
        sortable: true,
      },
    ];

    return {
      columns,
      trustFacts: [] as TrustFact[],
      filter: '',
      isLoading: true,
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
      this.isLoading = true;
      this.trustFacts = await this.$dltApi.getTrustFacts(this.name, this.version);
      this.isLoading = false;
    },
  },
});
</script>

<style lang="scss" scoped>
.va-data-table {
  // The full viewport - .app__navbar height - .layout padding - previous .va-card height/margin - .va-card__* padding - .va-card__title font-size - filter input height - 2px (idk)
  max-height: calc(100vh - 4.0625rem - 2 * 1.5rem - 208px - 1.5rem - 4 * var(--va-card-padding) - 0.625rem - var(--va-input-min-height) - 2px);
}

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
