<template>
  <h1 class="display-5">Add a package</h1>
  <div>
    <va-form style="width: 300px; padding: 0.75rem">
      <va-input
        class="mb-4"
        label="Package name"
        v-model="package_name"
        :rules="[value => (value && value.length > 0) || 'Field is required']"
      />
      <va-button v-on:click="onSubmit" type="submit" class="mt-2">
        Submit
      </va-button>
    </va-form>
  </div>
</template>

<script>
export default {
  name: 'add-package-view',
  data() {
    return {
      package_name: '',
    };
  },
  methods: {
    onSubmit() {
      console.log('submitted');
    },
  },
};
</script>

<style scoped>
</style>
