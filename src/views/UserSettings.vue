<template>
  <va-card>
    <va-card-title>User settings</va-card-title>
    <va-card-content>
      <user-settings-component/>
    </va-card-content>
  </va-card>
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
