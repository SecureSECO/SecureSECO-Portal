<template>
  <div id="app">
    <Layout/>
  </div>
</template>

<script lang="ts">
import Layout from '@/components/layouts/Layout.vue';

export default {
  name: 'portal-app',
  components: {
    Layout,
  },
};

//  background: var(--va-background);
</script>

<style lang="scss">
@import './sass/main.scss';
#app {
  font-family: 'Source Sans Pro', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
body {
  margin: 0;
}
</style>
