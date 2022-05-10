<template>
  <div class="app">
    <Header/>
    <div class="app__content">
      <div class="app__page">
        <div class="layout fluid gutter--xl">
          <router-view/>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Header from './Header.vue';
import Footer from './Footer.vue';

export default {
  name: 'layout-component',
  components: {
    Header,
    Footer,
  },
};
</script>

<style lang="scss">
.app {
  height: 100vh;
  display: flex;
  flex-direction: column;

  &__navbar {
    min-height: 4rem;
  }

  &__content {
    display: flex;
    height: calc(100vh - 4rem);
    flex: 1;
  }

  &__page {
    flex-grow: 2;
    overflow-y: scroll;
  }
}
</style>
