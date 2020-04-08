<template>
  <div>
    <v-content v-if="!isLogged">
      <section>
        <v-parallax
          src="https://i2.wp.com/rockthenight.eu/wp/wp-content/uploads/2017/02/Concertgoerswithphonesinair_resize.jpg?fit=960%2C637&ssl=1"
          height="600"
        >
          <v-layout column align-center justify-center class="white--text">
            <h1 id="eventure">Eventure</h1>
            <div
              class="white--text subheading mb-3 text-xs-center"
              style="font-weight: 900; text-shadow: 2px 2px #000000"
            >Become a member to discover your dream events!</div>
            <v-btn color="purple" dark large to="/login">Get Started</v-btn>
          </v-layout>
        </v-parallax>
      </section>
      <section>
        <v-layout column wrap class="my-5" align-center>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md6>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">public</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Explore the country</div>
                    </v-card-title>
                    <v-card-text>Travel around Bulgaria, discovering the most exciting events for you!</v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md6>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">share</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Create new connections</div>
                    </v-card-title>
                    <v-card-text>Do you want to meet people interested in the same things as you? Join now!</v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>
    </v-content>
    <v-content v-if="isLogged">
      <ul>
        <h2>Category:</h2>
      <li v-for="(cat, index) in categories" :key="index" @click="selectedIndexHandler(index)">
        <v-btn outlined color="purple" :disabled="index === selectedIndex">{{cat}}</v-btn>
      </li>
      </ul>
      <app-events :allEvents="eventsByCategory" :selectedCat="selectedCategory"></app-events>
    </v-content>
  </div>
</template>

<script>
import dataService from "../services/dataService";
import AppEvents from "./Events";

export default {
  components: {
    AppEvents
  },
  name: "AppHome",
  props: {
    isLogged: Boolean
  },
  data: function() {
    return {
      events: null,
      categories: ['Sports', 'Music', 'Theatre', 'Education'],
      selectedIndex: 0,
      selectedCategory: 'Sports',
      eventsByCategory: null
    };
  },
  created: async function() {
    let data = await dataService.getAllEvents();
    this.events = data;
    this.eventsByCategory = this.events.filter(ev => ev.category === 'Sports');
  },
  methods: {
    selectedIndexHandler(idx) {
      this.selectedIndex = idx;
      this.selectedCategory = this.categories[idx]
      if (this.events) {
        this.eventsByCategory = this.events.filter(ev => ev.category === this.selectedCategory);
      }
      
    }
  },
};
</script>

<style scoped>
.container {
  width: 70%;
}
#eventure {
  font-weight: 900;
  text-shadow: 3px 2px #000000;
  font-family: Cubic;
  font-size: 40px;
  margin-bottom: 20px;
}
li {
  display: inline;
  margin: 5px;
}
h2 {
  margin-bottom: 10px;
}
.clicked {
  color: greenyellow;
}
</style>