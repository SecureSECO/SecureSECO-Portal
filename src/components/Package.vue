<template>
  <div class="row">
    <div class="flex xs6">
      <div class="row">
        <div class="flex xs4 propName">Platform:</div>
        <div class="flex xs8 propValue">{{ item.id }}</div>
      </div>
      <div class="row">
        <div class="flex xs4 propName">Owner:</div>
        <div class="flex xs8 propValue">{{ item.id }}</div>
      </div>
      <div class="row">
        <div class="flex xs4 propName">Name:</div>
        <div class="flex xs8 propValue">{{ item.id }}</div>
      </div>
      <div class="row">
        <div class="flex xs4 propName">Release:</div>
        <div class="flex xs8 propValue">{{ item.id }}</div>
      </div>
    </div>
    <div class="flex xs6">
      <div class="row">
        <div class="flex xs4 propName">Trust score:</div>
        <div class="flex xs8 propValue">{{ item.score }}</div>
      </div>
      <div class="row">
        <div class="flex xs4 propName">Confidence rating:</div>
        <div class="flex xs8 propValue">{{ item.id }}</div>
      </div>
      <div class="row">
        <div class="flex xs4 propName">Updated at:</div>
        <div class="flex xs8 propValue">{{ item.id }}</div>
      </div>
      <div class="row">
        <div class="flex xs4 propName">Number of trust facts:</div>
        <div class="flex xs8 propValue">{{ item.id }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { defaultPackage, Package, TrustFact } from '@/api/DLTPlugin';

/*
 Fields to display:
 - Package platform
 - Package owner
 - Package name
 - Package release

 - Trust score
 - Last updated timestamp
 - Number of gathered trust facts
 - Quality rating?

 - Table/List of trust facts

 Optionally group by release as well?
 */

export default defineComponent({
  name: 'package-component',
  props: {
    package: {
      type: Object as () => Package,
      required: true,
    },
  },
  data() {
    const loadingPackage: Package = {
      ...defaultPackage,
      name: 'Loading...',
    };

    return {
      item: loadingPackage,
      trustFacts: [] as TrustFact[],
    };
  },
});
</script>

<style scoped>
.propName {
  text-align: right;
}
</style>
