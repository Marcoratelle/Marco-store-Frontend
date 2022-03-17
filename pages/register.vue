<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-form class="text-center" v-model="valid">
        <h1>
          Please Register
        </h1>

        <v-text-field
          v-model="username"
          label="Username"
          required
          clearable
          :rules="usernameRules"
        ></v-text-field>

        <v-text-field
          v-model="firstname"
          label="FirstName"
          required
          clearable
          :rules="firstNameRules"
        ></v-text-field>

        <v-text-field
          v-model="lastname"
          label="LastName"
          required
          clearable
          :rules="lastNameRules"
        ></v-text-field>

        <v-text-field
          type="password"
          v-model="password"
          label="Password"
          required
          clearable
          class="input-group--focused"
          :rules="passwordRules"
        ></v-text-field>

        <v-spacer></v-spacer>

        <v-btn
          class="my-3 text-center"
          :disabled="!valid"
          @click="registerUser"
        >
          Register
        </v-btn>

        <v-divider vertical inset></v-divider>
        <v-spacer />
        <div class="text-center">
          Already have an account?
        </div>

        <v-spacer />
        <v-btn to="/login" class="my-3 text-center">
          Login
        </v-btn>
      </v-form>
    </v-row>
  </v-container>
</template>
<!-- SCRIPT SECTION BELOW -->
<script>
import {} from "vuex";
export default {
  data: () => ({
    valid: true,

    usernameRules: [
      value => !!value || "Required!",
      value => (value && value.length >= 3) || "3 or more characters!"
    ],

    passwordRules: [
      value => !!value || "Required!",
      value => (value && value.length >= 8) || "8 or more characters!"
    ],

    firstNameRules: [
      value => !!value || "Required!",
      value => (value && value.length >= 1) || "1 or more characters!"
    ],

    lastNameRules: [
      value => !!value || "Required!",
      value => (value && value.length >= 3) || "3 or more characters!"
    ],

    text: ``,
    username: null,
    password: null,
    firstname: null,
    lastname: null,
    formErrors: false
  }),
  computed: {},

  methods: {
    registerUser() {
      this.$store.dispatch("modules/user/registerUser", {
        username: this.username,
        password: this.password,
        firstname: this.firstname,
        lastname: this.lastname
      });
    }
  },
  mounted() {
    if (this.$store.state.modules.user.isLoggedIn == true) {
      let message = "You are already logged in, redirecting to products.";
      this.$router.push("products");
      this.$store.dispatch("modules/messages/setNewMessage", message);
    } else {
      return;
    }
  }
};
</script>
