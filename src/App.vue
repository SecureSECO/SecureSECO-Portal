<template>
  <router-view v-slot="{ Component }">
    <!--    <keep-alive include="package-view">-->
    <component :is="Component"/>
    <!--    </keep-alive>-->
  </router-view>
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
}

body {
  margin: 0;
  background: var(--va-background);
}
</style>
