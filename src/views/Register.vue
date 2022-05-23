<template>
  <h1 class="display-5">Register login</h1>
  <div class="register">
    <va-form
      style="width: 300px;"
      tag="form"
      @submit.prevent="registerUser"
    >
      <va-input
        v-model="form.username"
        class="mb-4"
        label="Username"
      />

      <va-input
        v-model="form.password"
        class="mb-4"
        label="Password"
        type="password"
      />

      <va-button type="submit" class="mt-2">Register</va-button>
    </va-form><p v-if="showError" id="error">Username already exists</p>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Register",
  components: {},
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      showError: false
    };
  },
  methods: {
    ...mapActions(["Register"]),
    async registerUser() {
      try {
        await this.Register(this.form);
        this.$router.push("/");
        this.showError = false
      } catch (error) {
        this.showError = true
      }
    },
  },
};
</script>
<style scoped>
#error {
  color: red;
}
</style>