const axios = require("axios");

class UserApi {
  fetchUsers() {
    return Promise.resolve(
      axios
        .get("http://localhost:5000/api/v1/users")
        .then(response => response.data[0])
    );
  }

  registerUser(payload) {
    return axios({
      method: "post",
      url: "http://localhost:5000/api/v1/users/register",
      data: {
        username: payload.username,
        password: payload.password,
        firstName: payload.firstname,
        lastName: payload.lastname
      }
    });
  }
  loginUser(payload) {
    return axios({
      method: "post",
      url: "http://localhost:5000/api/v1/users/login",
      data: {
        username: payload.username,
        password: payload.password
      }
    });
  }
  addToCart(payload, username) {
    return axios({
      method: "post",
      url: "http://localhost:5000/api/v1/users/shoppingCart/addToCart",
      data: {
        user: username,
        item: payload.name,
        amount: payload.quantity
      }
    });
  }
  removeFromCart(payload, username) {
    return axios({
      method: "post",
      url: "http://localhost:5000/api/v1/users/shoppingCart/removeFromCart",
      data: {
        user: username,
        item: payload.item,
        amount: payload.quantity
      }
    });
  }
  modifyInCart(payload, username) {
    return axios({
      method: "post",
      url: "http://localhost:5000/api/v1/users/shoppingCart/modifyInCart",
      data: {
        user: username,
        item: payload.name,
        amount: payload.newAmount
      }
    });
  }
  retrieveProducts() {
    return axios({
      method: "get",
      url: "http://localhost:5000/api/v1/users/fetchProducts"
    });
  }
  retrieveCart(payload) {
    return axios({
      method: "post",
      url: "http://localhost:5000/api/v1/users/retrieveUserCart",
      data: {
        user: payload
      }
    });
  }
}

export default new UserApi();
