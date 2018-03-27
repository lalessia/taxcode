<template>
<div id="app">
  <div class="cover-container d-flex h-100 p-3 mx-auto flex-column">
    <headerComponent></headerComponent>
    <router-view/>
  </div>
</div>
</template>

<script>

import HeaderComponent from './components/HeaderComponent.vue'

export default {
  name: 'App',
  components: {
    HeaderComponent
  }
}
</script>

<style>
html,
body {
  height: 100%;
  background-color: #333;
}

body {
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -ms-flex-pack: center;
  -webkit-box-pack: center;
  justify-content: center;
  color: #fff;
  text-shadow: 0 .05rem .1rem rgba(0, 0, 0, .5);
  box-shadow: inset 0 0 5rem rgba(0, 0, 0, .5);
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.cover-container {
  max-width: 42em;
}
</style>
