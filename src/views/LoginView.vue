<template>
  <main>
    <div>
      <va-form
          style="width: 300px;"
          tag="form"
          @submit.prevent="handleSubmit"
      >
        <va-input
            v-model="username"
            label="Username"
        />

        <va-input
            class="mt-2"
            v-model="password"
            type="password"
            label="Password"
        />

        <va-button type="submit" class="mt-2">
          Login
        </va-button>

        <p>
          {{keys}}
        </p>
      </va-form>
    </div>
  </main>
</template>

<script>
import {newCredentials} from "@/api/LiskAPI.ts";

export default {
  name: "LoginView",
  data() {
    return {
      username: '',
      password: '',
      keys: {}
    }
  },
  methods: {
    handleSubmit() {
      return;
    }
  },
  beforeMount() {
    this.keys = newCredentials();
  }
}
</script>

<style scoped>

</style>