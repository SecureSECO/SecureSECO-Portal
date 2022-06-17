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
        <div class="flex xs4 propName">Selected release:</div>
        <div class="flex xs8 propValue">{{ selectedRelease }}</div>
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
        <div class="flex xs4 propName">Number of trust facts:</div>
        <div class="flex xs8 propValue">{{ trustFactCount }}</div>
      </div>
    </div>
    <div class="row">
      <div class="flex xs12">
        <va-radio v-for="release in package.releases" :key="release" v-model="selectedRelease" :option="release">
          <va-badge :text="release" color="secondary"/>
        </va-radio>
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
  data() {
    return {
      selectedRelease: this.package.releases[0],
    };
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

<style lang="scss">
.propName {
  text-align: right;
}

.va-radio {
  margin: 0 !important;

  .va-radio__icon {
    display: none;
  }

  .va-radio__text {
    margin-left: 0;
  }
}

.va-badge {
  margin: 2px;

  .va-badge__text {
    font-size: 0.8rem;
  }
}
</style>
