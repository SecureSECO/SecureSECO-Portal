<template>
  <div v-if="logs.length === 0">Nothing yet</div>
  <VueTerminal v-if="logs.length > 0" :messages="logs" console-sign="$" height="350px" style="width: 50%"/>
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
