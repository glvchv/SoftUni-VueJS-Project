<template>
  <v-app>
    <div id="app">
      <app-navigation :isLogged="isLogged"></app-navigation>
      <router-view :isLogged="isLogged"></router-view>
      <app-footer></app-footer>
    </div>
  </v-app>
</template>

<script>
import AppNavigation from "./core/Navigation";
import AppFooter from "./core/Footer";
import firebase from 'firebase';

export default {
  name: "App",
  components: {
    AppNavigation,
    AppFooter
  },
  data() {
    return {
      isLogged: false
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(u => this.isLogged = !!u)
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
