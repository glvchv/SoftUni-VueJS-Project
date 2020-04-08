<template>
  <v-card class="mx-auto" max-width="1100" v-if="data">
    <v-img class="white--text align-end" height="600px" :src="data.photoUrl"></v-img>
    <h2>{{data.name}}</h2>
    <v-card-subtitle class="pb-0">
      <span class="data">Location</span>
      {{data.city}}, {{data.venue}}
    </v-card-subtitle>
    <v-card-subtitle class="pb-0">
      <span class="data">Date:</span>
      {{data.date}}
      <span class="data">Starting:</span>
      {{data.time}}
    </v-card-subtitle>
    <v-card-text class="text--primary">
      <div>
        <span class="data">Description:</span>
        {{data.description}}
      </div>
      <div>
        <span class="data">Posted by:</span>
        {{data.creatorName}}({{data.creatorEmail}})
      </div>
      <div>
        <span class="data">Ticket price:</span>
        {{data.ticketPrice}} BGN
      </div>
      <div>
        <span class="data">Ticket available:</span>
        {{data.tickets}}
      </div>
    </v-card-text>

    <v-card-actions class="justify-center">
      <div v-if="!isCreator && !hasReserved && !hasStarted">
        <v-btn color="purple" text @click="reserveTicket">Reserve ticket</v-btn>
      </div>
      <div v-if="isCreator && hasStarted">
        <v-btn color="error" text @click="closeEvent">Delete event</v-btn>
      </div>
      <h3 v-if="!isCreator && hasReserved" class="pb-0">You have already reserved a ticket for this event!</h3>
      <h3 v-if="(hasStarted || data.ticket === 0) && !isCreator">Tickets are no longer available!</h3>
    </v-card-actions>
  </v-card>
</template>

<script>
import dataService from "../services/dataService";
export default {
  data() {
    return {
      data: null,
      isCreator: null,
      hasReserved: null,
      hasStarted: null
    };
  },
  created: async function() {
    let id = this.$route.params.id;
    let fetched = await dataService.getSingleEventById(id);
    this.data = fetched;
    console.log(this.data);
    if (this.data.creatorEmail === sessionStorage.getItem("email")) {
      this.isCreator = true;
    }
    if (this.data.reservations.includes(sessionStorage.getItem("email"))) {
      this.hasReserved = true;
    }
    let currentDate = new Date();
    let eventDate = new Date(this.data.date);
    if(currentDate >= eventDate) {
      this.hasStarted = true;
    }
  },
  methods: {
    reserveTicket() {
      this.data.reservations.push(sessionStorage.getItem("email"));
      this.data.tickets -= 1;
      dataService.updateEvent(
        { reservations: this.data.reservations, tickets: this.data.tickets },
        this.$route.params.id
      );
      this.hasReserved = true;
    },
    closeEvent() {
      dataService.deleteEvent(this.$route.params.id)
    }
  }
};
</script>

<style scoped>
.mx-auto {
  margin-top: 30px;
  margin-bottom: 60px;
}
.data {
  font-weight: bold;
}
</style>