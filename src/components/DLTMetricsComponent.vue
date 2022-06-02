<template>
<h4>DLT Metrics</h4>
<table>
   <tr><th>Total trust facts spidered</th><td>1</td></tr>
   <tr><th>Total number of packages in system</th><td>1</td></tr>
   <tr><th>Blockheight</th><td>1</td></tr>
   <tr><th>aantal nodes</th><td>1</td></tr>
</table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'dlt-metrics-component',
  components: {  },
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
