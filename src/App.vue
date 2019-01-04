<template>
  <div id="app">
    <MainWindow/>
  </div>
</template>

<script>
import MainWindow from './components/MainWindow.vue';

export default {
  name: 'app',
  components: {
    MainWindow,
  },
};
</script>

<style>
  #app {
    width: 100vw;
    height: 100vh;
    position: relative;
    overflow: hidden;
  }
</style>
