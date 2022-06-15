<template>
  <div class="row">
    <div class="flex xs6">
      <div class="row">
        <div class="flex xs4 propName">Platform:</div>
        <div class="flex xs8 propValue">{{ package.platform }}</div>
      </div>
      <div class="row">
        <div class="flex xs4 propName">Owner:</div>
        <div class="flex xs8 propValue">{{ package.owner }}</div>
      </div>
      <div class="row">
        <div class="flex xs4 propName">Name:</div>
        <div class="flex xs8 propValue">{{ package.name }}</div>
      </div>
      <div class="row">
        <div class="flex xs4 propName">Release:</div>
        <div class="flex xs8 propValue">{{ package.release }}</div>
      </div>
    </div>
    <div class="flex xs6">
      <div class="row">
        <div class="flex xs4 propName">Trust score:</div>
        <div class="flex xs8 propValue">{{ package.score }}</div>
      </div>
      <div class="row">
        <div class="flex xs4 propName">Confidence rating:</div>
        <div class="flex xs8 propValue">TODO</div>
      </div>
      <div class="row">
        <div class="flex xs4 propName">Updated at:</div>
        <div class="flex xs8 propValue">{{ package.updatedAt }}</div>
      </div>
      <div class="row">
        <div class="flex xs4 propName">Number of trust facts:</div>
        <div class="flex xs8 propValue">{{ trustFactCount }}</div>
      </div>
    </div>
    <div v-if="githubLink !== undefined" class="flex xs12">
      <va-button :href="githubLink" flat target="_blank">
        <va-icon name="home"/>
        GitHub
      </va-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Package } from '@/api';

export default defineComponent({
  name: 'package-details-component',
  props: {
    package: {
      type: Object as () => Package,
      required: true,
    },
    trustFactCount: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    // TODO: Add links for other Platforms and generalise
    githubLink() {
      if (this.package.platform !== 'github') {
        return undefined;
      }

      return `https://github.com/${this.package.owner}/${this.package.name}`;
    },
  },
});
</script>

<style scoped>
.propName {
  text-align: right;
}
</style>
