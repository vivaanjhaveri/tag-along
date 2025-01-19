import Axios from 'axios';
import SignupValidations from '@/services/SignupValidations';

import {
  AUTH_ACTION,
  LOGIN_ACTION,
  AUTO_LOGIN_ACTION,
  LOGOUT_ACTION,
  SET_USER_TOKEN_DATA_MUTATION,
  /**CLEAR_AUTH_MUTATION,
  SET_LOADING,
  CLEAR_LOADING,*/
  SIGNUP_ACTION,
  AUTO_LOGOUT_ACTION,
  SET_AUTO_LOGOUT_MUTATION,
} from '@/store/storeconstants';
import { auth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from '@/services/firebase';

let timer = null;
  export default {
    async sendSignInLink(context, payload) {
      context.commit('SET_LOADING');
      const actionCodeSettings = {
        // URL you want to redirect back to. 
        url: 'tag-along.web.app', 
        handleCodeInApp: true,
      };
  
      try {
        await sendSignInLinkToEmail(auth, payload.email, actionCodeSettings);
        // Save the email locally so you don't need to ask the user again
        window.localStorage.setItem('emailForSignIn', payload.email);
        // Optionally, show a message to the user to check their email
      } catch (error) {
        // Handle Errors here.
        console.error("Error sending sign-in link:", error);
        throw "Failed to send sign-in link. Please try again.";
      } finally {
        context.commit('CLEAR_LOADING');
      }
    },
  
    async verifySignInLink(context, payload) {
      context.commit('SET_LOADING');
      try {
        const email = window.localStorage.getItem('emailForSignIn') || payload.email;
        if (!isSignInWithEmailLink(auth, window.location.href)) {
          throw "Invalid sign-in link.";
        }
  
        // The client SDK will parse the code from the link for you.
        const result = await signInWithEmailLink(auth, email, window.location.href);
        // Clear the email from storage.
        window.localStorage.removeItem('emailForSignIn');
  
        // Extract user information
        const user = result.user;
        const tokenData = {
          email: user.email,
          token: await user.getIdToken(),
          expiresIn: new Date().getTime() + 3600 * 1000, // 1 hour
          refreshToken: user.refreshToken,
          userId: user.uid,
        };
  
        localStorage.setItem('userData', JSON.stringify(tokenData));
        context.commit(SET_USER_TOKEN_DATA_MUTATION, tokenData);
      } catch (error) {
        console.error("Error verifying sign-in link:", error);
        throw "Failed to sign in. Please try again.";
      } finally {
        context.commit('CLEAR_LOADING');
      }
    },
    
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
      let errorMessage = 'Invalid login details.';
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