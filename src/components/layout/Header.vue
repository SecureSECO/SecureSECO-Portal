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
          <va-button flat to="/">My rewards</va-button>
        </va-navbar-item>
      </template>
      <template v-slot:right>
        <va-navbar-item>
          <span v-if="isLoggedIn">
            <router-link to="/user/profile">User</router-link> | 
            <a @click="logout">Logout</a>
          </span>
          <span v-else>
            <router-link to="/user/register">Register</router-link> |
            <router-link to="/user/login">Login</router-link>
          </span>
        </va-navbar-item>
      </template>
    </va-navbar>
  </div>
</template>

<script>
export default {
  name: 'header-component',
  computed : {
      isLoggedIn : function(){ return this.$store.getters.isAuthenticated}
    },
    methods: {
      async logout (){
        await this.$store.dispatch('LogOut')
        this.$router.push('/user/login')
      }
    },
}
</script>

<style lang="scss" scoped>
.va-navbar {
  box-shadow: var(--va-box-shadow);
}
</style>
