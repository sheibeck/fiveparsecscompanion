<template>
  <div id="app">    
    <Crew />
  </div>
</template>

<script>
import Crew from './components/Crew.vue'

export default {
  name: 'App',
  components: {
    Crew
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
