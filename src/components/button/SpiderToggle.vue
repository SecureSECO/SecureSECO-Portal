<template>
  <va-switch v-model="state" :color="getColor" :loading="isLoading"
             class="spiderToggleButton" indeterminate left-label
             @click.capture.stop="toggle">
    {{ getStatusText }}
  </va-switch>

   <va-modal
    v-model="showSpiderErrorModal"
    hide-default-actions
    overlay-opacity="0.2"
  >
    <template #header>
      <h2>Error: couldn't start spider</h2>
    </template>
    <div>{{ modalErrorMessage }}</div>
    <template #footer>
      <va-button @click="showSpiderErrorModal = false">
        Close
      </va-button>
    </template>
  </va-modal>
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
      showSpiderErrorModal: false,
      modalErrorMessage: "",
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
        const newState = await this.$spiderApi.toggleSpider();
        if (typeof newState === 'string' || newState instanceof String){
          //Not succeeded
          this.modalErrorMessage=newState;
          this.showSpiderErrorModal=true;
          this.isActive=false;
        } else  {
          this.isActive = newState;
        }
        
        this.state = this.isActive;
        
      } catch (e) {
        this.modalErrorMessage=e.message;
        this.showSpiderErrorModal=true;
        this.state = this.isActive;
        console.error('SpiderToggle.toggle', e.message);
      }
      this.isLoading = false;
    },
  },
});
</script>

<style lang="scss" scoped>
.spiderToggleButton .va-switch__label {
  width: 100px;
}
</style>
