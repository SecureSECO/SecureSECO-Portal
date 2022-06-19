<template>
  <span v-if="!isTimeAgo">{{ formatted }}</span>
  <span v-if="isTimeAgo" :title="formatted">{{ timeAgo }}</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import * as timeAgo from 'timeago.js';

export default defineComponent({
  name: 'display-date-component',
  props: {
    date: {
      type: Date,
      required: true,
    },
    isTimeAgo: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    formatted() {
      return this.date.toLocaleString();
    },
    timeAgo() {
      return timeAgo.format(this.date);
    },
  },
});
</script>
<style scoped>
</style>
