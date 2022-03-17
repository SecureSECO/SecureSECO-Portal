<template>
  <package-table></package-table>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import PackageTable from './components/PackageTable.vue';

@Options({
  components: {
    PackageTable,
  },
})
export default class App extends Vue {}
</script>

<style>
</style>
