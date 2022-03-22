<template>
  <div id="layout">
    <Header/>
    <div class="flex-center md6" style="padding: 0.75rem">
      <div class="main-content-inner">
        <router-view/>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Footer from './footer/Footer.vue';
import Header from './header/Header.vue';

export default {
  name: 'layout-component',
  components: {
    Header,
    Footer,
  },
};
</script>

<style>
html body {
  font-family: Source Sans Pro,serif;
}

.main-content-inner {
  width: 60%;
}
</style>
