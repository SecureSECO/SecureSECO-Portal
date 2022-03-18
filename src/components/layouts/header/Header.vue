<template>
  <va-navbar color="primary">
    <template #left>
      <va-navbar-item>
        <router-link to="/" class="text--header">Home</router-link>
      </va-navbar-item>
    </template>
    <template #center>
      <va-navbar-item>
        <router-link to="/packages" class="text--header">Packages</router-link>
      </va-navbar-item>
    </template>
  </va-navbar>
</template>

<script>
export default {
  name: 'header-component',
};
</script>

<style scoped>
.text--header {
  color: white;
}
</style>
