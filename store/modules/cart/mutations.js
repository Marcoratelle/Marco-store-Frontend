import userApi from "../../../src/api/user";

export default {
  addItem(state, itemName) {
    userApi.addToCart(
      itemName.payload,
      this.state.__ob__.value.modules.user.user
    );
    for (const item of state.productNames) {
      if (item == itemName.payload.name) {
        const productIndex = state.productNames.indexOf(itemName.payload.name);
        let quantity = parseFloat(itemName.payload.quantity);
        if (isNaN(quantity)) {
          quantity = 1;
        }
        state.productQuantities[productIndex] =
          parseFloat(state.productQuantities[productIndex]) + quantity;
        return;
      }
    }
    state.productPrices.push(itemName.payload.price);
    state.productImg.push(itemName.payload.img);
    state.productNames.push(itemName.payload.name);
    state.productQuantities.push(parseFloat(itemName.payload.quantity));
  },
  removeCartItem(state, itemName) {
    userApi.removeFromCart(
      itemName.payload,
      this.state.__ob__.value.modules.user.user
    );
    let index = state.productNames.indexOf(itemName.payload.item);
    if (index == -1) {
      return;
    }
    state.productNames.splice(index, 1);
    state.productQuantities.splice(index, 1);
    state.productImg.splice(index, 1);
    state.productPrices.splice(index, 1);
  },
  updateQuant(state, items) {
    userApi.modifyInCart(
      items.payload,
      this.state.__ob__.value.modules.user.user
    );
    let index = state.productNames.indexOf(items.payload.name);
    if (index == -1) {
      return;
    }
    state.productQuantities[index] = items.payload.newAmount;
    return state;
  },
  retrieveCart(state, user) {
    let stateCopy = {
      productPrices: [],
      productImg: [],
      productNames: [],
      productQuantities: []
    };
    for (let i = 0; i < user.payload.data.items.length; i++) {
      stateCopy.productPrices.push(user.payload.data.items[i][0]["item_price"]);
      stateCopy.productImg.push(user.payload.data.items[i][0]["item_img"]);
      stateCopy.productNames.push(user.payload.data.items[i][0]["item_name"]);
      stateCopy.productQuantities.push(parseFloat(user.payload.data.qtys[i]));
    }
    state.productPrices = stateCopy.productPrices;
    state.productImg = stateCopy.productImg;
    state.productNames = stateCopy.productNames;
    state.productQuantities = stateCopy.productQuantities;
  },
  logOut(state) {
    state.productPrices = [];
    state.productImg = [];
    state.productNames = [];
    state.productQuantities = [];
  }
};
