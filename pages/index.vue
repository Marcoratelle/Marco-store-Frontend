<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="text-center"></div>
      <v-card>
        <v-card-title class="headline">
          Marco's DB
        </v-card-title>
        <v-card-text>
          <hr class="my-3" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-container class="text-center" v-if="isLoggedIn()">
            <v-btn class="ma-3 text-center" nuxt @click="logOut"
              >Log out
            </v-btn>
            <v-spacer />
            <v-btn class="ma-3 text-center" nuxt @click="shoppingCart()"
              >Shopping cart
            </v-btn>
            <v-spacer />
            <v-btn class="ma-3 text-center" nuxt @click="products()"
              >Products
            </v-btn>
          </v-container>
          <v-btn nuxt v-if="!isLoggedIn()" to="/login">Log in</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({}),
  methods: {
    products() {
      this.$router.push("products");
    },
    shoppingCart() {
      this.$router.push("shoppingCart");
    },
    isLoggedIn() {
      return this.$store.state.modules.user.isLoggedIn;
    },
    logOut() {
      this.$store.dispatch("modules/user/logOut");
    }
  },
  components: {}
};
</script>
