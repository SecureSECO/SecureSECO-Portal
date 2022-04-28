<template>
  <h1 class="display-5">Dlt Status</h1>
  <div>
    Blockheight: {{ block_height }}
  </div>
</template>

<script>
// eslint-disable-next-line import/no-unresolved
import * as client from 'lisk-client';

export default {
  name: 'dlt-status',
  data() {
    return {
      block_height: '',
    };
  },
  async mounted() {
    const clientCache = await client.apiClient.createWSClient('ws://localhost:8080/ws');

    const nodeInfo = await clientCache.node.getNodeInfo();
    this.block_height = nodeInfo.height;

    clientCache.subscribe('app:block:new', async ({ block }) => {
      const record = await clientCache.block.decode(block);
      this.block_height = record.header.height;
    });
  },
};
</script>

<style scoped>
</style>
