<template>
  <div class="container">
    <h1>Create an event</h1>
    <form>
      <!-- EVENT NAME -->
      <v-text-field
        v-model="name"
        :error-messages="nameErrors"
        label="Event name"
        required
        @blur="$v.name.$touch()"
      ></v-text-field>
      <!-- DESCRIPTION -->
      <v-text-field
        v-model="description"
        :error-messages="descErrors"
        label="Description"
        required
        @blur="$v.description.$touch()"
      ></v-text-field>
      <!-- CATEGORY -->
      <v-select
        v-model="select"
        :items="items"
        :error-messages="selectErrors"
        label="Category"
        required
        @blur="$v.select.$touch()"
      ></v-select>
      <v-row>
        <!-- CITY -->
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="city"
            :error-messages="cityErrors"
            label="City"
            required
            @blur="$v.city.$touch()"
          ></v-text-field>
        </v-col>
        <!-- VENUE -->
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="venue"
            :error-messages="venueErrors"
            label="Venue"
            required
            @blur="$v.venue.$touch()"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <!-- DATE PICKER -->
        <v-col cols="12" sm="6" md="6">
          <v-menu
            v-model="dateBool"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="date"
                label="Date of the event"
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" @input="dateBool = false"></v-date-picker>
          </v-menu>
        </v-col>
        <!-- TIME PICKER -->
        <v-col cols="12" sm="6" md="6">
          <v-menu
            ref="menu"
            v-model="timeBool"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="time"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="time"
                label="Time"
                :error-messages="timeErrors"
                prepend-icon="access_time"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="timeBool"
              v-model="time"
              full-width
              @click:minute="$refs.menu.save(time)"
            ></v-time-picker>
          </v-menu>
        </v-col>
      </v-row>
      <v-row>
        <!-- TICKET PRICE -->
        <v-col cols="12" sm="6" md="6">
          <v-subheader class="pl-0">
            Ticket price -
            <strong>{{price}} BGN</strong>
          </v-subheader>
          <v-slider v-model="price" thumb-label min="10" max="200"></v-slider>
        </v-col>
        <!-- AVAILABLE TICKETS -->
        <v-col cols="12" sm="6" md="5">
          <v-subheader class="pl-0">
            Available tickets -
            <strong>{{tickets}}</strong>
          </v-subheader>
          <v-slider v-model="tickets" thumb-label min="10" max="3000"></v-slider>
        </v-col>
        <v-col cols="12" sm="6" md="1">
          <input id="tickets-num" type="number" v-model="tickets" />
        </v-col>
      </v-row>
      <v-btn class="mr-4" :disabled="$v.$invalid" @click.prevent="consoleLogInfo">submit</v-btn>
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],

  validations: {
    name: { required, minLength: minLength(10) },
    description: { required, minLength: minLength(30) },
    select: { required },
    time: { required },
    city: { required, minLength: minLength(6) },
    venue: { required, minLength: minLength(6) }
  },
  data() {
    return {
      name: "",
      description: "",
      select: null,
      items: ["Music", "Sports", "Theatre plays", "Educational / Informative"],
      city: "",
      venue: "",
      date: new Date().toISOString().substr(0, 10),
      dateBool: false,
      timeBool: false,
      time: null,
      price: "",
      tickets: ""
    };
  },
  computed: {
    selectErrors() {
      const errors = [];
      if (!this.$v.select.$dirty) return errors;
      !this.$v.select.required && errors.push("Category is required.");
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.minLength &&
        errors.push("Event name must be at least 10 characters long");
      !this.$v.name.required && errors.push("Event name is required.");
      return errors;
    },
    venueErrors() {
      const errors = [];
      if (!this.$v.venue.$dirty) return errors;
      !this.$v.venue.minLength &&
        errors.push("Venue must be at least 6 characters long");
      !this.$v.venue.required && errors.push("Venue is required.");
      return errors;
    },
    descErrors() {
      const errors = [];
      if (!this.$v.description.$dirty) return errors;
      !this.$v.description.minLength &&
        errors.push("Description must be at least 30 characters long");
      !this.$v.description.required && errors.push("Description is required.");
      return errors;
    },
    cityErrors() {
      const errors = [];
      if (!this.$v.city.$dirty) return errors;
      !this.$v.city.minLength &&
        errors.push("City must be at least 6 characters long");
      !this.$v.city.required && errors.push("City is required.");
      return errors;
    },
    timeErrors() {
      const errors = [];
      if (!this.$v.time.$dirty) return errors;
      !this.$v.time.required &&
        errors.push("Please choose when the event is happening!");
      return errors;
    }
  },
  methods: {
    consoleLogInfo() {
      this.$v.$touch();
      if (!this.$v.$error) {
        console.log(this.name);
        console.log(this.description);
        console.log(this.date);
        console.log(this.select.toLowerCase());
        console.log(this.time);
        console.log(this.price);
        console.log(this.tickets);
      }
    }
  }
};
</script>

<style scoped>
.container {
  width: 70%;
}
#tickets-num {
  width: 50px;
}
</style>