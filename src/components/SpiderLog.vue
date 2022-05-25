<template>
  <VueTerminal console-sign="$" height="350px" :messages="logs" style="width: 50%"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VueTerminal from '@/components/VueTerminal.vue';

export default defineComponent({
  name: 'spider-log-component',
  components: { VueTerminal },
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
      };
    },
  },
});
</script>

<style scoped>
</style>
