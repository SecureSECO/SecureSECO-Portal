<template>
  <va-card>
     <va-card-title>Spider log</va-card-title>
     <va-card-content>
        <VueTerminal console-sign="$" height="350px" :messages="logs" style="width: 50%"/>
     </va-card-content>
  </va-card>
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
