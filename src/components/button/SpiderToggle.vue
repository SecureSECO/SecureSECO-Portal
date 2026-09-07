<template>
  <va-switch v-model="state" :color="getColor" :loading="isLoading"
             class="spiderToggleButton" indeterminate left-label
             @click.capture.stop="toggle" v-if="this.server_type===1">
    Collect measurements automatically
  </va-switch>

  <p role="status" style="margin-top: 12px">{{ activity }}</p>

  <PopUpMessage v-model="showSpiderErrorModal" title="Error: couldn't start spider">
    {{ modalErrorMessage }}
  </PopUpMessage>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import PopUpMessage from '@/components/PopUpMessage.vue';
import { ServerType } from '@/api';

export default defineComponent({
  name: 'spider-toggle-button',
  components: { PopUpMessage },
  data() {
    return {
      activity: 'Checking collection status…',
      poll: undefined as ReturnType<typeof setInterval> | undefined,
      state: null as boolean | null,
      isActive: false,
      isLoading: false,
      showSpiderErrorModal: false,
      modalErrorMessage: '',
      server_type: ServerType.Public,
    };
  },
  async mounted() {
    this.isActive = await this.$spiderApi.getSpiderStatus();
    this.state = this.isActive;
    await this.refreshActivity();
    this.poll = setInterval(() => this.refreshActivity(), 5000);
    this.server_type = await this.$api.getServerType();
  },
  beforeUnmount() { clearInterval(this.poll); },
  computed: {
    getColor(): string {
      return (this.isActive ? 'success' : 'warning');
    },
    getStatusText(): string {
      return (this.isActive ? 'Spider is ON' : 'Spider is OFF');
    },
  },
  methods: {
    async refreshActivity() {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_HOST}/api/spider/activity`);
        this.activity = data.activity;
        if (!this.isLoading) { this.isActive = data.running; this.state = data.running; }
      } catch { this.activity = 'Collection status unavailable.'; }
    },
    async toggle() {
      if (this.isLoading) {
        return;
      }

      this.isLoading = true;
      this.state = null;
      try {
        const newState = await this.$spiderApi.toggleSpider();
        if (typeof newState === 'string' || newState instanceof String) {
          // Not succeeded
          this.modalErrorMessage = newState;
          this.showSpiderErrorModal = true;
          this.isActive = false;
        } else {
          this.isActive = newState;
        }

        this.state = this.isActive;
      } catch (e) {
        this.modalErrorMessage = e.message;
        this.showSpiderErrorModal = true;
        this.state = this.isActive;
        console.error('SpiderToggle.toggle', e.message);
      }
      this.isLoading = false;
      await this.refreshActivity();
    },
  },
});
</script>

<style lang="scss" scoped>
.spiderToggleButton .va-switch__label {
  max-width: 240px;
}
</style>
