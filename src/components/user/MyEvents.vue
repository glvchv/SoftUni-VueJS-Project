<template>
  <div class="container">
    <h1>{{name}}'s events:</h1>
    <hr />
    <div class="holder" v-if="eventsCreated">
      <h2>Events created:</h2>
      <div v-if="eventsCreated.length > 0">
        <v-card v-for="event in eventsCreated" :key="event.id">
          <v-card-actions>
            <v-card-title>{{event.name}}</v-card-title>
            <v-spacer></v-spacer>
            <v-card-subtitle>{{event.date}}</v-card-subtitle>
            <v-spacer></v-spacer>
            <v-btn text color="purple" :to="{name: 'details', params:{id: event.id}}">See event</v-btn>
          </v-card-actions>
        </v-card>
      </div>
      <p v-if="eventsCreated.length === 0">No events created!</p>
    </div>
    <div class="holder" v-if="eventsReserved">
      <h2>Reserved tickets for:</h2>
      <div class="text-center" v-if="eventsReserved.length > 0">
        <v-card v-for="event in eventsReserved" :key="event.id">
          <v-card-actions>
            <v-card-title>{{event.name}}</v-card-title>
            <v-spacer></v-spacer>
            <v-card-subtitle>{{event.date}}</v-card-subtitle>
            <v-spacer></v-spacer>
            <v-btn text color="purple" :to="{name: 'details', params:{id: event.id}}">See event</v-btn>
          </v-card-actions>
        </v-card>
      </div>
      <p v-if="eventsReserved.length === 0">No events reserved!</p>
    </div>
  </div>
</template>

<script>
import dataService from "../../services/dataService";
export default {
  name: "MyEvents",
  data() {
    return {
      name: sessionStorage.getItem("name"),
      eventsCreated: null,
      eventsReserved: null,
      v0: true
    };
  },
  created: async function() {
    let events = await dataService.getAllEvents();
    const email = sessionStorage.getItem("email");
    this.eventsCreated = events.filter(ev => ev.creatorEmail === email);
    console.log(events);
    this.eventsReserved = events.filter(ev => ev.reservations.includes(email));
    // console.log(this.eventsCreated);
    console.log(this.eventsReserved);
  }
};
</script>

<style scoped>
</style>
