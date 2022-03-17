export default {
  setErrorMessage(state, message) {
    let username = JSON.parse(message.response.config.data).username;
    let newMessage = message.response.data.message;

    if (newMessage == "Username is already taken") {
      state.messages = ` ${newMessage} : ${username}`;
    } else if (newMessage == "Login credentials are invalid") {
      state.messages = ` ${newMessage} `;
    } else {
      state.messages = newMessage;
    }
  },

  setMessage(state, message) {
    let newMessage = message.data;
    state.messages = newMessage;
  },
  setNewMessage(state, message) {
    console.log(message);
    state.messages = message;
  }
};
