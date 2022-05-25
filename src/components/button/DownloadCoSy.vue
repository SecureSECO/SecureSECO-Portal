<template>
  <va-button :href="link">Download TrustSECO instance</va-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'download-cosy-button',
  data() {
    return {
      link: '',
    };
  },
  async mounted() {
    const { data } = await axios.get('http://localhost:3000/api/download');
    this.link = data;
  },
});
</script>

<style scoped>
</style>
