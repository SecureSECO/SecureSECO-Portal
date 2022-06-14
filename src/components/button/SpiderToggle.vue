<template>
  <va-switch v-model="state" :color="getColor" :loading="isLoading"
             class="spiderToggleButton" indeterminate left-label
             @click.capture.stop="toggle">
    {{ getStatusText }}
  </va-switch>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'spider-toggle-button',
  data() {
    return {
      state: null as boolean | null,
      isActive: false,
      isLoading: false,
    };
  },
  async mounted() {
    this.isActive = await this.$spiderApi.getSpiderStatus();
    this.state = this.isActive;
    console.log('SpiderToggle.load', this.isActive);
  },
  computed: {
    getColor(): string {
      return (this.isActive ? 'success' : 'warning');
    },
    getStatusText(): string {
      return (this.isActive ? 'Spider is ON' : 'Spider is OFF');
    },
  },
  methods: {
    async toggle() {
      if (this.isLoading) {
        return;
      }

      this.isLoading = true;
      this.state = null;
      try {
        await this.$fakeDelay();
        const newState = await this.$spiderApi.toggleSpider();
        this.isActive = newState;
        this.state = this.isActive;
        console.log('SpiderToggle.toggle', newState);
      } catch (e) {
        this.state = this.isActive;
        console.error('SpiderToggle.toggle', e.message);
      }
      this.isLoading = false;
    },
  },
});
</script>

<style>
.spiderToggleButton .va-switch__label {
  width: 100px;
}
</style>
