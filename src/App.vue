<template>
  <div id="app">
      <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',

  methods: {
    // todo
    // ip定位

  }
}
</script>

<style>
  body{
    margin: 0;
    display: flex;
    justify-content: center;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #222;
  margin: 0;
  max-width: 1242px;
  width: 750px;
  min-height: 21rem;
  height: 1334px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
