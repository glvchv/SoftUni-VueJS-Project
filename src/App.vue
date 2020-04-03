<template>
  <v-app>
    <div id="app">
      <app-navigation></app-navigation>
        <router-view></router-view>
      </div>
  </v-app>
</template>

<script>
import AppNavigation from "./core/Navigation";

export default {
  name: "App",
  components: {
    AppNavigation
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
@font-face {
  font-family: Cubic;
  src: url("./assets/cubic.ttf");
}
</style>
