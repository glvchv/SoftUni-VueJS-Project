<template>
  <div id="nav">
    <v-toolbar>
      <router-link to="/" id="title">Eventure</router-link>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn text v-if="!isLogged" to="/login">Login</v-btn>
        <template v-else>
          <v-btn text to="/create">Create event</v-btn>
          <v-btn text to="/myevents">My events</v-btn>
          <v-btn text @click="logout">Logout</v-btn>
        </template>
      </v-toolbar-items>
      <v-menu class="hidden-md-and-up">
          <v-list>
            <v-list-tile v-for="item in menu" :key="item.icon">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-menu>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: "AppNavigation",
  data () {
    return {
      isLogged: true,
      menu: [
        {title: 'Create event'},
        {title: 'My events'},
        {title: 'Logout'}
      ],
      drawer: null
    }
  },
  methods: {
    logout() {
      this.isLogged = false;
    },
    login() {
      this.isLogged = true;
    }
  },
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
