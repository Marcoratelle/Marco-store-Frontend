<template>
  <div>
    <v-container fluid>
      <v-row justify="center" align="center">
        <v-col cols="5">
          <h1 justify="center" align="center">
            Marco's Store
          </h1>

          <v-form class="text-center" v-model="valid">
            <v-spacer></v-spacer>
            <br />
            <h2 class="text-h5 text-left mb-2">
              Log In
            </h2>

            <v-text-field
              v-model="username"
              label="Username"
              required
              :rules="usernameRules"
              clearable
            ></v-text-field>

            <v-text-field
              type="password"
              v-model="password"
              label="Password"
              required
              class="input-group--focused"
              :rules="passwordRules"
              clearable
            ></v-text-field>

            <v-spacer> </v-spacer>

            <v-btn class="my-4" :disabled="!valid" @click="loginUser">
              Submit
            </v-btn>
            <div class="my-4">
              Not registered?
            </div>
            <v-btn class="my-4" to="/register">Register</v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    valid: true,

    usernameRules: [
      value => !!value || "Invalid username",
      value => (value && value.length >= 3) || "3 or more characters!"
    ],

    passwordRules: [
      value => !!value || "Invalid password",
      value => (value && value.length >= 3) || "3 or more characters!"
    ],

    username: null,

    password: null
  }),
  methods: {
    loginUser() {
      this.$store
        .dispatch("modules/user/loginUser", {
          username: this.username,
          password: this.password
        })
        .then(
          this.$store.dispatch("modules/cart/retrieveCart", {
            username: this.username
          })
        );
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

<style scoped></style>
