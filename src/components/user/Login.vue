<template>
  <div class="container">
    <h1>Login</h1>
    <form>
      <v-text-field
        v-model="email"
        :error-messages="emailErrors"
        label="E-mail"
        required
        @blur="$v.email.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="password"
        type="password"
        :error-messages="passwordErrors"
        label="Password"
        required
        @blur="$v.password.$touch()"
      ></v-text-field>
      <p id="regLink">You don't have an account? Register <router-link id="reg" to='/register'>here!</router-link></p>
      <v-btn color="primary" class="mr-4" :disabled="$v.$invalid" @click="submit">Login</v-btn>
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength, email } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  validations: {
    password: { required, minLength: minLength(6) },
    email: { required, email }
  },
  data() {
    return {
      password: "",
      email: ""
    };
  },
  computed: {
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength &&
        errors.push("Password must be at least 6 characters long");
      !this.$v.password.required && errors.push("Password is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    }
  },
  methods: {
    submit() {
      this.$v.$touch();
      if(!this.$v.$error) {
        console.log(this.email + this.password);
      }
    }
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