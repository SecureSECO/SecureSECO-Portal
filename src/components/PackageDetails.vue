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
      <section class="score-panel" aria-label="Trust scores">
        <h3>Trust score</h3>
        <div v-for="kind in ['local', 'confirmed']" :key="kind" class="score-line">
          <span :class="['score-indicator', scorePair?.[kind]?.score != null ? kind : 'unavailable']" aria-hidden="true">{{ kind === 'confirmed' && scorePair?.confirmed?.score != null ? '✓' : '●' }}</span>
          <span>{{ kind === 'local' ? 'Local estimate' : 'Confirmed' }}</span>
          <strong>{{ scorePair?.[kind]?.score != null ? scorePair[kind].score.toFixed(1) : 'Not available yet' }}</strong>
          <details class="score-explanation">
            <summary :aria-label="`About the ${kind} score`">ⓘ</summary>
            <p>{{ kind === 'local' ? 'Uses the latest available measurements, including those awaiting ledger confirmation.' : 'Uses only finalized measurements. New pending data does not replace older confirmed inputs.' }} Both use the same scoring formula. Finality does not prove source accuracy.</p>
            <p v-if="scorePair">Calculated: {{ new Date(scorePair.updatedAt).toLocaleString() }}</p>
          </details>
        </div>
        <p class="score-coverage" v-if="scorePair">{{ scorePair.local.measurementCount }} scoring measurements locally · {{ scorePair.confirmed.measurementCount }} finalized</p>
        <p class="score-coverage" v-if="scorePair">Coverage: {{ scorePair.local.factTypeCount }}/{{ scorePair.local.totalFactTypes }} scoring types locally · {{ scorePair.confirmed.factTypeCount }}/{{ scorePair.confirmed.totalFactTypes }} finalized</p>
        <p class="score-coverage">Different coverage can explain a difference in scores.</p>
        <p v-if="scoreError" role="status">{{ scoreError }}</p>
      </section>
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
      scorePair: null as any,
      scoreError: '',
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
    this.timer = setInterval(() => this.updateScore().catch(() => { this.scorePair = null; this.scoreError = 'Scores temporarily unavailable.'; }), 5000);
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
      const {data} = await axios.get(`${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_HOST}/api/dlt/scores/${encodeURIComponent(this.name)}/${encodeURIComponent(this.version)}`);
      this.scorePair = data;
      this.scoreError = data.ledgerAvailable ? '' : 'Ledger unavailable; confirmed score cannot be checked.';
      this.language = trustfacts.find((fact) => fact.type === 'gh_repository_language')?.value.replaceAll('"', '');
    },
  },
});
</script>

<style lang="scss">
.score-panel { padding: 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; margin-bottom: 16px; }
.score-panel h3 { margin-bottom: 12px; }
.score-line { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; margin: 10px 0; }
.score-line strong { margin-left: auto; }
.score-indicator.unavailable { color: #94a3b8; }
.score-indicator.local { color: #d99012; }
.score-indicator.confirmed { background: #1769bb; color: white; border-radius: 50%; width: 20px; height: 20px; text-align: center; }
.score-coverage { font-size: 12px; color: #64748b; margin-top: 8px; }
.score-explanation { font-size: 13px; }
.score-explanation summary { cursor: pointer; }
.score-explanation[open] { flex-basis: 100%; }

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
