<script setup lang="ts">
import { defineProps } from 'vue';
import { loadPackage, platformImage } from '../api/package';
import { TopPackageResult } from '@/api';

defineProps<{ packages: TopPackageResult[] }>();
</script>

<template>
  <div class="packages-grid">
    <div v-for="pack in packages" class="top-package" @click="() => loadPackage(pack.packageName)"
      @keydown="() => loadPackage(pack.packageName)">
      <img :alt="pack.packagePlatform" :title="pack.packagePlatform" class="platform-logo"
        :src="platformImage(pack.packagePlatform)" />
      <div class="package-info">
        <div class="va-list-item-label"> {{ pack.packageName }} </div>
        <div class="score va-list-item-label va-list-item-label--caption"> Score: {{ pack.score }} </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.platform-logo {
  width: 50px;
  height: 50px;
  margin-right: 1em;
  flex-grow: 0;
}

.packages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10em, 1fr));
  gap: 2em;
  width: 100%;
  justify-content: center;
}

.top-package {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 12em;
  padding: 0.5em;
  box-sizing: border-box;
  cursor: pointer;
}

.package-info {
  flex-grow: 1;
}
</style>
