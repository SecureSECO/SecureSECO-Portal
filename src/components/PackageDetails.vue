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
    </div>
    <div class="flex xs6">
      <div class="row">
        <div class="flex xs4 propName"><b>Trust score:</b></div>
        <div class="flex xs8 propValue"><b>{{ score }}</b></div>
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
        <va-radio v-for="version in package.versions" :key="version" v-model="selectedVersion" :option="version">
          <va-badge :text="version" color="secondary"/>
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
import { defaultPackage } from '@/api';

export default defineComponent({
  name: 'package-details-component',
  props: {
    name: {
      type: String,
      required: true,
    },
    trustFactCount: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      package: defaultPackage,
      selectedVersion: '',
      score: 0,
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
  watch: {
    async selectedVersion() {
      this.score = await this.$dltApi.getTrustScore(this.package.name, this.selectedVersion);
    },
  },
  async created() {
    this.package = await this.$dltApi.getPackage(this.name);
    this.selectedVersion = this.$route.params.version as string ?? this.package.versions[0];
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
