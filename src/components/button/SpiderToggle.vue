<template>
  <va-switch v-model="state" :color="getColor" :loading="isLoading"
             class="spiderToggleButton" indeterminate left-label
             @click="toggle">
    <!-- @click.capture.stop="toggle">-->
    {{ getStatusText }}
  </va-switch>
  <!--  <va-button :color="getColor" v-on:click="toggle">-->
  <!--    {{ getStatusText }}-->
  <!--  </va-button>-->
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'spider-toggle-button',
  data() {
    return {
      state: null,
      isRunning: false,
    };
  },
  async mounted() {
    const { data } = await axios.get('http://localhost:3000/api/spider/status');
    this.isRunning = data;
    this.state = this.isRunning;
    console.log('SpiderToggle.load', data);
  },
  computed: {
    isLoading() {
      return this.state === null;
    },
    // getState() {
    //   return this.isLoading ? null : this.isRunning;
    // },
    getColor() {
      return (this.isRunning ? 'success' : 'warning');
    },
    getStatusText() {
      return (this.isRunning ? 'Spider is ON' : 'Spider is OFF');
    },
  },
  methods: {
    async toggle() {
      if (this.isLoading) {
        return;
      }

      this.state = null;
      try {
        // Emulate loading
        if (process.env.NODE_ENV !== 'development') {
          await new Promise((resolve) => {
            setTimeout(resolve, 1000);
          });
        }

        const newStatus = this.isRunning ? 'stop' : 'start';
        const result = await axios.post(`http://localhost:3000/api/spider/${newStatus}`);
        this.isRunning = !this.isRunning;
        console.log('SpiderToggle.toggle', result);
      } catch (e) {
        console.error('SpiderToggle.toggle', e);
      }
      this.state = this.isRunning;
    },
  },
});
</script>

<style>
.spiderToggleButton .va-switch__label {
  width: 100px;
}
</style>
