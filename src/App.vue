<template>
  <router-view/>
</template>

<script lang="ts">
export default {
  name: 'portal-app',
};
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
