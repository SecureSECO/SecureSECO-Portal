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
          <va-button flat to="/metrics">Metrics</va-button>
        </va-navbar-item>
        <va-navbar-item>
          <va-button text-color="white" to="/packages">Trust Scores</va-button>
        </va-navbar-item>
        <va-navbar-item>
          <va-button flat to="/">My rewards</va-button>
        </va-navbar-item>
        <va-navbar-item>
          <SpiderToggleButton/>
        </va-navbar-item>
      </template>
      <template v-slot:right>
        <va-navbar-item>
          <span v-if="isDevMode">DEV</span>
        </va-navbar-item>
        <va-navbar-item>
          <router-link to="/">Youri</router-link>
        </va-navbar-item>
      </template>
    </va-navbar>
  </div>
</template>

<script>
import SpiderToggleButton from '../button/SpiderToggle.vue';

export default {
  name: 'header-component',
  components: {
    SpiderToggleButton,
  },
  computed: {
    isDevMode() {
      return process.env.NODE_ENV === 'development';
    },
  },
};
</script>

<style lang="scss" scoped>
.va-navbar {
  box-shadow: var(--va-box-shadow);
  z-index: 1;
}
</style>
