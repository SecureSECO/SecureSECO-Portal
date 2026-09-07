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
        <div class="flex xs4 propName"><b>Confirmed trust score:</b></div>
        <div class="flex xs8 propValue"><b>
          <span v-if="score !== undefined" :title="score">{{ score.toFixed(2) }}</span>
          <span v-if="score === undefined" title="A score is shown once the recorded measurements have reached ledger finality">
            Unknown
            <va-icon class="material-icons" name="info"/>
          </span>
        </b></div>
      </div>
      <div class="row" v-if="language">
        <div class="flex xs4 propName">Language:</div>
        <div class="flex xs8 propValue">{{ language }}</div>
      </div>
      <div class="row">
        <div class="flex xs4 propName">Repo:</div>
        <a :href="githubLink"><div class="flex xs16 propValue">{{package.owner}}/{{package.name}}</div></a>
      </div>
    </div>
    <div class="row">
      <div class="flex xs12">
        <va-button-toggle
          focus-color="textPrimary"
          size="small"
          v-model="versionLocal"
          :options="package.versions.map(v=> ({'label':v, 'value':v}))"
          v-if="package.versions.length <= 7"
        />
        <va-select
          v-model="version"
          v-model:search="autoCompleteSearchValue"
          class="col-span-1"
          label="Version"
          placeholder="Type or select version"
          :options="package.versions"
          autocomplete
          highlight-matched-text
          v-else
        ></va-select>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import { defaultPackage } from '@/api';
import router from '@/router';

export default defineComponent({
  name: 'PackageDetailsComponent',
  props: {
    name: {
      type: String,
      required: true,
    },
    version: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      package: defaultPackage,
      score: undefined as number | undefined,
      timer: undefined as ReturnType<typeof setInterval> | undefined,
      // version prop is immutable so this is needed to use in a v-model
      versionLocal: this.version,
      language: undefined as string | undefined,
    };
  },
  computed: {
    githubLink(): string {
      return `https://github.com/${this.package.owner}/${this.package.name}`;
    },
  },
  watch: {
    async versionLocal(newVersion) {
      await this.updateScore();
      this.selectVersion(newVersion);
    },
    async version(newVersion) {
      await this.updateScore();
      this.selectVersion(newVersion);
    },
  },
  async mounted() {
    this.timer = setInterval(() => this.updateScore().catch(() => { this.score = undefined; }), 5000);
    this.package = await this.$dltApi.getPackage(this.name);
    if (this.version === '') {
      await router.replace({
        name: 'Package with Version',
        params: {
          name: this.name,
          version: this.package.versions[0],
        },
      });
    } else {
      await this.updateScore();
    }
    this.versionLocal = this.version;
  },
  beforeUnmount() { clearInterval(this.timer); },
  methods: {
    selectVersion(version: string) {
      router.push({
        name: 'Package with Version',
        params: {
          name: this.name,
          version,
        },
      });
    },
    async updateScore() {
      const trustfacts = await this.$dltApi.getTrustFacts(this.name, this.version);
      const {data} = await axios.get(`${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_HOST}/api/dlt/confirmed-score/${encodeURIComponent(this.name)}/${encodeURIComponent(this.version)}`);
      this.score = typeof data.score === 'number' ? data.score : undefined;
      this.language = trustfacts.find((fact) => fact.type === 'gh_repository_language')?.value.replaceAll('"', '');
    },
  },
});
</script>

<style lang="scss">
.propName {
  text-align: right;
}

.va-button {
  margin: 2px;
}

.va-button--focus {
  background-color: rgb(44, 130, 224) !important;
}

.va-button--active {
  background-color: rgb(31, 117, 209) !important;
}
</style>

<!-- This program has been developed by students from the bachelor Computer Science at Utrecht University within the Software Project course.
© Copyright Utrecht University (Department of Information and Computing Sciences) -->
