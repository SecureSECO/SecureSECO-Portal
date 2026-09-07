<template>
  <va-button :loading="isLoading" @click="download">View setup instructions</va-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'download-cosy-button',
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    async download() {
      this.isLoading = true;
      const link = await this.$dltApi.getDownloadLink();
      window.location.href = link;
    },
  },
});
</script>

<style scoped>
</style>
