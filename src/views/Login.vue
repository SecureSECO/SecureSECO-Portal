<template>
  <h1 class="display-5">User login</h1>
  <login-component/>
</template>

<script>
import LoginComponent from '../components/LoginComponent.vue';
export default {
  name: 'login-view',
  components: { LoginComponent },
};
</script>

<style scoped>
</style>