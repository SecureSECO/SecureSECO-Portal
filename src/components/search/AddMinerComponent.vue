<template>
  <va-modal v-model="showAddedModal" hide-default-actions overlay-opacity="0.2">
    <template #header>
      <h2>Miner Added</h2>
    </template>
    <div>Your miner has been added</div>
    <template #footer>
      <va-button @click="showAddedModal = false"> Close </va-button>
    </template>
  </va-modal>

  <va-modal v-model="showErrorModal" hide-default-actions overlay-opacity="0.2">
    <template #header>
      <h2>Add Miner Error</h2>
    </template>
    <div>{{ errorMessage }}</div>
    <template #footer>
      <va-button @click="showErrorModal = false"> Close </va-button>
    </template>
  </va-modal>

  <va-modal v-model="showFieldEmpty" hide-default-actions overlay-opacity="0.2">
    <template #header>
      <h2>Field empty</h2>
    </template>
    <div>One or more fields have been left empty.</div>
    <template #footer>
      <va-button @click="showFieldEmpty = false"> Close </va-button>
    </template>
  </va-modal>

  <va-form>
    <div class="row">
      <va-input
        v-model="miner.github_token"
        :rules="[validateRequired]"
        class="flex xs6"
        label="Github Token"
      />
      <va-input
        v-model="miner.worker_name"
        :rules="[validateRequired]"
        class="flex xs6"
        label="Worker Name"
      />
      <div class="flex xs12">
        <va-button type="submit" @click="addMiner">Submit</va-button>
        <div v-if="response">
          <p>{{ response }}</p>
        </div>
      </div>
    </div>
  </va-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'add-miner-component',
  data() {
    return {
      showAddedModal: false,
      showErrorModal: false,
      showFieldEmpty: false,
      response: '',
      errorMessage: '',
      miner: {
        github_token: '',
        worker_name: '',
      },
    };
  },
  methods: {
    async addMiner() {
      const m = this.miner;
      if (m.github_token.length > 0 && m.worker_name.length > 0) {
        const result = await this.$searchApi.addMiner(m);
        if (result && result.success === true) {
          this.showAddedModal = true;
        } else {
          this.showErrorModal = true;
          this.errorMessage = result.message;
        }
      } else {
        this.showFieldEmpty = true;
      }
    },
    // TODO: Move to generalized validation system
    validateRequired(value: string) {
      return (value && value.length > 0) || 'Field is required';
    },
  },
});
</script>

<style scoped></style>
<!-- This program has been developed by students from the bachelor Computer Science at Utrecht University within the Software Project course.
© Copyright Utrecht University (Department of Information and Computing Sciences) -->
