<template>
  <router-view v-slot="{ Component }">
    <!--    <keep-alive include="package-view">-->
    <component :is="Component"/>
    <!--    </keep-alive>-->
  </router-view>
</template>

<script lang="ts">
export default {
  name: 'app',
};
</script>

<style lang="scss">
@import './sass/index.scss';
</style>
