<template>
  <v-container>
    <v-list v-for="(product, i) in newProducts" :key="i" class="transparent">
      <v-list-item>
        <v-card class="mx-auto" width="45em">
          <v-card-text>
            <v-row fluid>
              <v-col cols="4" sm="3">
                <v-img
                  class="rounded-sm"
                  min-width="60"
                  aspect-ratio="1"
                  :src="product.item_img"
                ></v-img>
              </v-col>
              <v-col cols="8" sm="4">
                <div>
                  <v-card-title
                    v-text="product.item_name"
                    class="headline text-left"
                  />

                  <v-card-subtitle v-text="' $ ' + product.item_price" />
                </div>
              </v-col>
              <v-col cols="6" sm="2">
                <v-form ref="form">
                  <v-select
                    :ref="product.item_name"
                    id="select"
                    label="Qty"
                    :items="quantity"
                  ></v-select>

                  <v-btn
                    @click="
                      onAddToCart(
                        product.item_name,
                        product.item_img,
                        product.item_price
                      )
                    "
                  >
                    Add to Cart
                  </v-btn>
                </v-form>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-list-item>
    </v-list>
    <v-col align="center">
      <v-btn to="/shoppingCart">Go to shopping cart</v-btn>
    </v-col>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      newProducts: [],
      defaultQuantity: 1,
      quantity: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    };
  },
  async fetch() {
    this.$store.dispatch("modules/user/retrieveProducts").then(response => {
      this.newProducts = response.data;
    });
  },
  methods: {
    onAddToCart(name, img, price) {
      let quantity = this.$refs[name][0]._data.selectedItems[0];
      if (isNaN(this.$refs[name][0]._data.selectedItems[0]) == true) {
        quantity = 1;
      }

      this.$store.dispatch("modules/cart/addItem", {
        name,
        quantity,
        img,
        price
      });
      this.$refs[name][0].reset();
    }
  },
  beforeCreate() {
    if (this.$store.state.modules.user.isLoggedIn == false) {
      let message = "Please log in before viewing products";
      this.$router.push("login");
      this.$store.dispatch("modules/messages/setNewMessage", message);
    } else {
      return;
    }
  }
};
</script>
