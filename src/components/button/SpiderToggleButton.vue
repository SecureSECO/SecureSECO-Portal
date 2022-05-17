<template>
  <va-button v-on:click="toggleSpider">{{ running ? 'Stop Spider' : 'Start spider' }}</va-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'spider-toggle-button',
  data() {
    return {
      running: false,
    };
  },
  async mounted() {
    const { data } = await axios.get('http://localhost:3000/api/spider/status');
    this.running = data;
  },
  methods: {
    async toggleSpider() {
      await axios.post(`http://localhost:3000/api/spider/${this.running ? 'stop' : 'start'}`);

      this.running = !this.running;
    },
  },
});
</script>

<style scoped>
</style>
