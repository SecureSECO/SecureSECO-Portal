<template>
  <p>Displaying package data for {{ item.name }}</p>
  <p>With id {{ item.id }}</p>
  <p>And score {{ item.score }}</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Package } from '@/api/DLTPlugin';

export default defineComponent({
  name: 'package-component',
  props: {
    id: Number,
  },
  data() {
    const loadingPackage: Package = {
      id: 0,
      name: 'Loading...',
      score: 0,
    };

    return {
      item: loadingPackage,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      if (this.id) {
        this.item = this.$dltPlugin.retrievePackage(this.id);
      }
    },
  },
});
</script>

<style scoped>
</style>
