<template>
  <div class="login">
    <va-form
      style="width: 300px;"
      tag="form"
      @submit.prevent="tryLogIn"
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

      <va-button type="submit" class="mt-2">Log in</va-button>
    </va-form><p v-if="showError" id="error">Login incorrect</p>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions } from "vuex";

export default defineComponent({
  name: "login-component",
  components: { },
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
    ...mapActions(["AuthUser"]),
    async tryLogIn() {
      const User = new FormData();
      User.append("username", this.form.username);
      User.append("password", this.form.password);
      try {
          await this.AuthUser(User);
          this.$router.push("/");
          this.showError = false
      } catch (error) {
        this.showError = true
      }
    },
  },
});
</script>

<style scoped>
#error {
  color: red;
}
</style>