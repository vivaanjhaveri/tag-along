import Axios from 'axios';
import SignupValidations from '@/services/SignupValidations';

import {
  AUTH_ACTION,
  LOGIN_ACTION,
  AUTO_LOGIN_ACTION,
  LOGOUT_ACTION,
  SET_USER_TOKEN_DATA_MUTATION,
  SIGNUP_ACTION,
  AUTO_LOGOUT_ACTION,
  SET_AUTO_LOGOUT_MUTATION,
} from '@/store/storeconstants';

let timer = null;

export default {
  [LOGOUT_ACTION](context) {
    context.commit('CLEAR_AUTH');
    localStorage.removeItem('userData');
    if (timer) {
      clearTimeout(timer);
    }
  },

  [AUTO_LOGOUT_ACTION](context) {
    context.dispatch(LOGOUT_ACTION);
    context.commit(SET_AUTO_LOGOUT_MUTATION);
  },

  async [LOGIN_ACTION](context, payload) {
    return context.dispatch(AUTH_ACTION, {
      ...payload,
      url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FIREBASE_API_KEY}`,
    });
  },

  async [SIGNUP_ACTION](context, payload) {
    return context.dispatch(AUTH_ACTION, {
      ...payload,
      url: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_FIREBASE_API_KEY}`,
    });
  },

  [AUTO_LOGIN_ACTION](context) {
    let userDataString = localStorage.getItem('userData');

    if (userDataString) {
      let userData = JSON.parse(userDataString);
      let expirationTime = userData.expiresIn - new Date().getTime();

      if (expirationTime < 10000) {
        context.dispatch(AUTO_LOGOUT_ACTION);
      } else {
        timer = setTimeout(() => {
          context.dispatch(AUTO_LOGOUT_ACTION);
        }, expirationTime);
      }

      context.commit(SET_USER_TOKEN_DATA_MUTATION, userData);
    }
  },

  async [AUTH_ACTION](context, payload) {
    let postData = {
      email: payload.email,
      password: payload.password,
      returnSecureToken: true,
    };
    let response = '';
    try {
      response = await Axios.post(payload.url, postData);
    } catch (err) {
      let errorMessage = 'Unexpected error occurred. Please try again.';
      if (
        err.response &&
        err.response.data &&
        err.response.data.error &&
        err.response.data.error.message
      ) {
        errorMessage = SignupValidations.getErrorMessageFromCode(
          err.response.data.error.message
        );
      }
      throw errorMessage;
    }

    if (response.status === 200) {
      let expirationTime = +response.data.expiresIn * 1000;

      timer = setTimeout(() => {
        context.dispatch(AUTO_LOGOUT_ACTION);
      }, expirationTime);

      let tokenData = {
        email: response.data.email,
        token: response.data.idToken,
        expiresIn: new Date().getTime() + expirationTime,
        refreshToken: response.data.refreshToken,
        userId: response.data.localId,
      };
      localStorage.setItem('userData', JSON.stringify(tokenData));
      context.commit(SET_USER_TOKEN_DATA_MUTATION, tokenData);
    }
  },
}