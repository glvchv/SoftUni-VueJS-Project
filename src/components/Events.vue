<template>
  <div class="wrapper">
    <ul v-show="hasEvents()">
      <li v-for="event in allEvents" :key="event.id">
        <v-card class="mx-auto" max-width="350">
          <v-img class="white--text align-end" height="150px" :src="event.photoUrl"></v-img>
          <h2>{{event.name}}</h2>
          <v-card-subtitle class="pb-0">{{event.city}}, {{event.venue}}</v-card-subtitle>

          <v-card-text class="text--primary">
            <div>Ticket price: {{event.ticketPrice}} BGN</div>

            <div>Date: {{event.date}} Starting: {{event.time}}</div>
          </v-card-text>

          <v-card-actions class="justify-center">
            
            <v-btn color="purple" text bottom :to="{ name: 'details', params:{ id : event.id }}">View in details</v-btn>
            
          </v-card-actions>
        </v-card>
      </li>
    </ul>
    <h2 class="no-events" v-show="!hasEvents()">No events posted in this category yet!</h2>
  </div>
</template>

<script>
export default {
  name: "AppEvents",
  props: {
    selectedCat: {
      required: true,
      type: String
    },
    allEvents: {
      required: true
    }
  },
  data() {
    return {
    };
  },
  methods: {
    hasEvents: function() {
      let evts = this.allEvents;
      if(evts === null || evts.length === 0) {
        return false;
      } 
      return true;
    }
  }
};
</script>

<style scoped>
/* .wrapper {
  display: inline;
} */
li {
  display: inline-block;
  margin: 20px;
}
.no-events {
  margin: 30px;
}
</style>