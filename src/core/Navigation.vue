<template>
  <div id="nav">
    <v-toolbar>
      <router-link to="/" id="title">Eventure</router-link>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn color="purple" text v-if="!isLogged" to="/login">Login</v-btn>
        <template v-else>
          <v-btn text to="/create">Create event</v-btn>
          <v-btn text to="/myevents">My events</v-btn>
          <v-btn color="purple" text @click="logout">Logout</v-btn>
        </template>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
import authService from '../services/authService';

export default {
  name: "AppNavigation",
  props: {
    isLogged: Boolean
  },
  data () {
    return {
      
    }
  },
  methods: {
    logout() {
      authService.logoutUser();
    }
  }
};
</script>


<style scoped>

#title {
  font-family: Cubic;
  font-size: 30px;
  text-decoration: none;
  color: black;
}
#title:hover {
    color: grey;
    box-shadow: 2px;
}
#nav {
    margin-top: 0px;
}
</style>
