<template>
  <v-container>
    <h1 class="text-center">Shopping cart</h1>
    <v-list
      class="transparent"
      v-for="(shoppingProduct, i) in this.shoppingCartItems"
      :key="i"
    >
      <v-list-item>
        <v-card class="mx-auto" width="45em">
          <v-card-text>
            <v-row fluid>
              <v-col cols="4" sm="3">
                <v-img
                  class="rounded-sm"
                  min-width="60"
                  aspect-ratio="1"
                  :src="shoppingProduct.productImg"
                ></v-img>
              </v-col>
              <v-col cols="8" sm="4">
                <div>
                  <v-card-title
                    v-text="shoppingProduct.productName"
                    class="headline text-left"
                  />
                  <v-card-subtitle>
                    Quantity:
                    <v-select
                      :label="shoppingProduct.productQuantity.toString()"
                      v-model="shoppingProduct.productQuantity"
                      :items="itemQuantity"
                      @change="
                        updateQuant(
                          shoppingProduct.productQuantity,
                          shoppingProduct.productName
                        )
                      "
                    ></v-select>
                  </v-card-subtitle>
                  <v-btn
                    @click="
                      removeItem(
                        shoppingProduct.productName,
                        shoppingProduct.productQuantity
                      ),
                        localRemove(
                          shoppingProduct.productName,
                          shoppingProduct.productQuantity
                        )
                    "
                    >Remove</v-btn
                  >
                </div>
              </v-col>
              <v-col cols="6" sm="2">
                <v-form ref="form" lazy-validation> </v-form>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-list-item>
    </v-list>

    <v-col align="center">
      <v-btn to="/checkout">Checkout </v-btn>
      <v-btn to="/products">Back to products</v-btn>
    </v-col>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      itemQuantity: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      shoppingCartItems: []
    };
  },
  computed: {},
  activated() {
    if (this.$store.state.modules.cart.productNames.__ob__.value.length > 0) {
      this.$fetch;
    } else {
      return "Your shopping cart is empty.";
    }
  },
  async fetch() {
    for (const item in this.$store.state.modules.cart.productNames.__ob__
      .value) {
      console.log(item);
      this.shoppingCartItems.push({
        productName: this.$store.state.modules.cart.productNames.__ob__.value[
          item
        ],
        productQuantity: this.$store.state.modules.cart.productQuantities.__ob__
          .value[item],
        productImg: this.$store.state.modules.cart.productImg.__ob__.value[item]
      });
    }
  },

  methods: {
    updateQuant(newAmount, name) {
      this.$store.dispatch("modules/cart/updateQuant", {
        newAmount,
        name
      });
    },
    removeItem(item, quantity) {
      this.$store.dispatch("modules/cart/removeItem", {
        item,
        quantity
      });
    },
    localRemove(item) {
      const result = this.shoppingCartItems.filter(
        obj => obj.productName !== item
      );
      this.shoppingCartItems = result;
    }
  },

  watch: {},
  mounted() {
    if (this.$store.state.modules.user.isLoggedIn == false) {
      let message = "You must log in before you can view your shopping cart.";
      this.$router.push("login");
      this.$store.dispatch("modules/messages/setNewMessage", message);
    } else {
      return;
    }
  }
};
</script>
