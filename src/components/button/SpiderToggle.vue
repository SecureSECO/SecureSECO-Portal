<template>
  <va-switch v-model="isRunning" :color="getColor" left-label>
    {{ getStatusText }}
  </va-switch>
  <!--  <va-button :color="getColor" v-on:click="toggleSpider">-->
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
      isRunning: false,
    };
  },
  async mounted() {
    const { data } = await axios.get('http://localhost:3000/api/spider/status');
    this.isRunning = data;
  },
  computed: {
    getColor() {
      return (this.isRunning ? 'success' : 'warning');
    },
    getStatusText() {
      return (this.isRunning ? 'Spider is ON' : 'Spider is OFF');
    },
  },
  methods: {
    async toggleSpider() {
      // await axios.post(`http://localhost:3000/api/spider/${this.running ? 'stop' : 'start'}`);

      this.isRunning = !this.isRunning;
    },
  },
});
</script>

<style scoped>
</style>
