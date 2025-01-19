export default {
    GET_USER_TOKEN_GETTER: (state) => {
      return state.token;
    },
  
    IS_USER_AUTHENTICATE_GETTER(state) {
      return !!state.token;
    },
  };