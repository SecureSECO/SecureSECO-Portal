<template>
  <h1 class="display-5">User profile</h1>
  <user-profile-component/>
</template>

<script>
import UserProfileComponent from '../components/UserProfileComponent.vue';

export default {
  name: 'user-profile-view',
  components: { UserProfileComponent },
};
</script>

<style scoped>
</style>


