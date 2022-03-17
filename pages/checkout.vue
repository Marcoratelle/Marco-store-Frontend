<template>
  <v-container>
    <h1 class="text-center">Checkout</h1>
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
              <v-col cols="8" sm="3">
                <div>
                  <v-card-title
                    v-text="shoppingProduct.productName"
                    class="headline text-left"
                  />
                  <v-card-subtitle>
                    Quantity: {{ shoppingProduct.productQuantity }}
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

              <v-col cols="12" sm="5" class="align">
                <p class="my-9 text-left">
                  Price:
                  <v-divider></v-divider>
                </p>

                <p class="text-right">
                  {{
                    format(
                      shoppingProduct.productQuantity *
                        shoppingProduct.productPrice
                    )
                  }}
                </p>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-list-item>
    </v-list>
    <v-list class="transparent">
      <v-list-item>
        <v-card class="mx-auto" width="20em">
          <v-card-text>
            <v-row fluid>
              <v-col cols="12" sm="12">
                <div class="text-center">
                  Order total : {{ format(totalPrice) }}
                  
                </div>
                <div class='text-center'>
                <v-btn class="mt-5 float-center">Place your order</v-btn>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-list-item>
    </v-list>
    <v-col align="center">
      <v-btn class="my-5" to="/shoppingCart">Edit shopping cart</v-btn>
      <v-btn to="/products">Back to products</v-btn>
    </v-col>
  </v-container>
</template>

<script>
export default {
  data: () => {
    return {
      shoppingCartItems: [],
      totalPrice: 0
    };
  },

  methods: {
    format(number) {
      var formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
      });
      return formatter.format(number);
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

  components: {},
  async fetch() {
    for (const item in this.$store.state.modules.cart.productNames.__ob__
      .value) {
      this.shoppingCartItems.push({
        productName: this.$store.state.modules.cart.productNames.__ob__.value[
          item
        ],
        productQuantity: this.$store.state.modules.cart.productQuantities.__ob__
          .value[item],
        productImg: this.$store.state.modules.cart.productImg.__ob__.value[
          item
        ],
        productPrice: this.$store.state.modules.cart.productPrices.__ob__.value[
          item
        ]
      });
    }
    if (this.shoppingCartItems.length > 0) {
      for (const item in this.shoppingCartItems) {
        this.totalPrice +=
          this.$store.state.modules.cart.productQuantities.__ob__.value[item] *
          this.$store.state.modules.cart.productPrices.__ob__.value[item];
      }
    }
  }
};
</script>
