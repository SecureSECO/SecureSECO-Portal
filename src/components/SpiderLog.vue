<template>
  <div v-for="(log, index) in logs" :key="index">
    {{ log }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'spider-log-component',
  data() {
    return {
      logs: [],
    };
  },
  async mounted() {
    this.setupWebsocket();
  },
  methods: {
    setupWebsocket() {
      const connection = new WebSocket('ws://localhost:3000/websocket');

      connection.onmessage = (message) => {
        this.logs.push(message.data);

        if (this.logs.length > 10) this.logs.shift();
      };
    },
  },
});
</script>

<style scoped>
</style>
