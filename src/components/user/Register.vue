<template>
  <div class="container">
    <h1>Register</h1>
    <form>
      <v-text-field
        v-model="firstName"
        :error-messages="firstNameErrors"
        label="First Name"
        required
        @blur="$v.firstName.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="lastName"
        :error-messages="lastNameErrors"
        label="Last Name"
        required
        @blur="$v.lastName.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="email"
        :error-messages="emailErrors"
        label="E-mail"
        required
        @blur="$v.email.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="password"
        :error-messages="passwordErrors"
        label="Password"
        type="password"
        required
        @blur="$v.password.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="rePassword"
        :error-messages="rePasswordErrors"
        label="Confirm password"
        type="password"
        required
        @blur="$v.rePassword.$touch()"
      ></v-text-field>
      <p id="regLink">You already have an account? Login <router-link id="reg" to='/login'>here!</router-link></p>
      <v-btn color="primary" class="mr-4" :disabled="$v.$invalid" @click.prevent="submit">Register</v-btn>
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength, email } from "vuelidate/lib/validators";
//import firebase from 'firebase'
import authService from '../../services/authService'

export default {
  mixins: [validationMixin],
  validations: {
    firstName: { required, minLength: minLength(3) },
    lastName: { required, minLength: minLength(3) },
    email: { required, email },
    password: { required, minLength: minLength(6) },
    rePassword: { required, minLength: minLength(6) },
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      rePassword: ""
    };
  },
  computed: {
    firstNameErrors() {
      const errors = [];
      if (!this.$v.firstName.$dirty) return errors;
      !this.$v.firstName.minLength &&
        errors.push("Name must be at least 3 characters long");
      !this.$v.firstName.required && errors.push("First name is required.");
      return errors;
    },
    lastNameErrors() {
      const errors = [];
      if (!this.$v.lastName.$dirty) return errors;
      !this.$v.lastName.minLength &&
        errors.push("Name must be at least 3 characters long");
      !this.$v.lastName.required && errors.push("Last name is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength &&
        errors.push("Password must be at least 6 characters long");
      !this.$v.password.required && errors.push("Password is required.");
      return errors;
    },
    rePasswordErrors() {
      const errors = [];
      if (!this.$v.rePassword.$dirty) return errors;
      !this.$v.rePassword.required && errors.push('Passwords do not match!');
      if (this.$v.password.$model !== this.$v.rePassword.$model) {
        errors.push("Passwords do not match!");
        return errors;
      }
      return errors;
    }
  },

  methods: {
    submit() {
      this.$v.$touch();
      const fullName = `${this.firstName} ${this.lastName}`
      if (this.password === this.rePassword) {
        authService.registerUser(this.email, this.password, fullName, this.$router)
      }
    },
  }
};
</script>

<style scoped>
.container {
  width: 70%;
}
#regLink {
  color: #0a7bd1
}
#reg {
  text-decoration: none;
  font-weight: bold;
}
</style>