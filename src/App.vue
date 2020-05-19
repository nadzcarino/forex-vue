<template>
  <div id="app">   
    <ForexTable /> 
  </div>
</template>

<script>
import ForexTable from "./components/ForexTable";

export default {
  name: 'App',
  components: {
    ForexTable
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
