<template>
  <div class="app-layout__navbar">
    <va-navbar color="#ffffff" text-color="primary">
      <template v-slot:left>
        <va-navbar-item>
          <router-link class="text--header" to="/">TrustSECO - Home</router-link>
        </va-navbar-item>
      </template>
      <template v-slot:center>
        <va-navbar-item>
          <va-button text-color="white" to="/packages">Trust Scores</va-button>
        </va-navbar-item>
        <va-navbar-item>
          <va-button outline to="/add-package">Missing Package?</va-button>
        </va-navbar-item>
        <va-navbar-item>
          <va-button flat to="/spider-package">Spider package</va-button>
        </va-navbar-item>
        <va-navbar-item>
          <va-button flat to="/dlt">DL Information</va-button>
        </va-navbar-item>
        <va-navbar-item>
          <va-button flat to="/">My rewards</va-button>
        </va-navbar-item>
      </template>
      <template v-slot:right>
        <va-navbar-item>
          <router-link to="/">Youri</router-link>
        </va-navbar-item>
      </template>
    </va-navbar>
  </div>
</template>

<script>
export default {
  name: 'header-component',
};
</script>

<style lang="scss" scoped>
.va-navbar {
  box-shadow: var(--va-box-shadow);
}
</style>
