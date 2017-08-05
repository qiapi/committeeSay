<template>
  <div id="app">
    <router-view>
      <topbar/>
    </router-view>
  </div>
</template>

<script>
import Navigator from './components/Navigator.vue'
import Topbar from './components/Topbar.vue'

export default {
  name: 'app',
  components: {
    'navigator': Navigator,
    'topbar': Topbar
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background-color: #eeeeee;
}
ul,li {
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
