<template>
  <h1 class="display-5">User settings</h1>
  <user-settings-component/>
</template>

<script>
import UserSettingsComponent from '../components/UserSettingsComponent.vue';

export default {
  name: 'user-settings-view',
  components: { UserSettingsComponent },
};
</script>

<style scoped>
</style>
