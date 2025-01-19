// src/store/modules/auth/actions.js

import {
    SET_USER_TOKEN_DATA_MUTATION,
    CLEAR_AUTH_MUTATION,
    SET_AUTO_LOGOUT_MUTATION,
    AUTO_LOGIN_ACTION,
    LOGOUT_ACTION,
    AUTO_LOGOUT_ACTION,
    SEND_SIGNIN_LINK,
    VERIFY_SIGNIN_LINK,
    SIGNUP_ACTION,
    LOGIN_ACTION,
  } from '@/store/storeconstants';
  
  import {
    auth,
    sendSignInLinkToEmail,
    isSignInWithEmailLink,
    signInWithEmailLink,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
  } from '@/services/firebase';
    
  let timer = null;
  
  export default {
    // Signup with Email and Password
    async [SIGNUP_ACTION](context, payload) {
      context.commit('SET_LOADING');
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, payload.email, payload.password);
        const user = userCredential.user;
        const token = await user.getIdToken();
        const tokenData = {
          email: user.email,
          token: token,
          expiresIn: new Date().getTime() + 3600 * 1000, // 1 hour
          refreshToken: user.refreshToken,
          userId: user.uid,
        };
        localStorage.setItem('userData', JSON.stringify(tokenData));
        context.commit(SET_USER_TOKEN_DATA_MUTATION, tokenData);
        // Setup auto logout
        timer = setTimeout(() => {
          context.dispatch(AUTO_LOGOUT_ACTION);
        }, 3600 * 1000); // 1 hour
      } catch (error) {
        console.error("Error during sign up:", error);
        throw error.message || "Signup failed.";
      } finally {
        context.commit('CLEAR_LOADING');
      }
    },
  
    // Login with Email and Password
    async [LOGIN_ACTION](context, payload) {
      context.commit('SET_LOADING');
      try {
        const userCredential = await signInWithEmailAndPassword(auth, payload.email, payload.password);
        const user = userCredential.user;
        const token = await user.getIdToken();
        const tokenData = {
          email: user.email,
          token: token,
          expiresIn: new Date().getTime() + 3600 * 1000, // 1 hour
          refreshToken: user.refreshToken,
          userId: user.uid,
        };
        localStorage.setItem('userData', JSON.stringify(tokenData));
        context.commit(SET_USER_TOKEN_DATA_MUTATION, tokenData);
        // Setup auto logout
        timer = setTimeout(() => {
          context.dispatch(AUTO_LOGOUT_ACTION);
        }, 3600 * 1000); // 1 hour
      } catch (error) {
        console.error("Error during login:", error);
        throw error.message || "Login failed.";
      } finally {
        context.commit('CLEAR_LOADING');
      }
    },
  
    // Send Passwordless Sign-In Link
    async [SEND_SIGNIN_LINK](context, payload) {
      context.commit('SET_LOADING');
      const actionCodeSettings = {
        url: 'http://localhost:8081/login', // Replace with your app's URL
        handleCodeInApp: true,
      };
      try {
        await sendSignInLinkToEmail(auth, payload.email, actionCodeSettings);
        // Save the email locally to complete sign-in after clicking the link
        window.localStorage.setItem('emailForSignIn', payload.email);
      } catch (error) {
        console.error("Error sending sign-in link:", error);
        throw error.message || "Failed to send sign-in link.";
      } finally {
        context.commit('CLEAR_LOADING');
      }
    },
  
    // Verify Passwordless Sign-In Link
    async [VERIFY_SIGNIN_LINK](context, payload) {
      context.commit('SET_LOADING');
      try {
        const email = window.localStorage.getItem('emailForSignIn') || payload.email;
        if (!isSignInWithEmailLink(auth, window.location.href)) {
          throw new Error("Invalid sign-in link.");
        }
  
        const userCredential = await signInWithEmailLink(auth, email, window.location.href);
        const user = userCredential.user;
        const token = await user.getIdToken();
        const tokenData = {
          email: user.email,
          token: token,
          expiresIn: new Date().getTime() + 3600 * 1000, // 1 hour
          refreshToken: user.refreshToken,
          userId: user.uid,
        };
        localStorage.removeItem('emailForSignIn');
        localStorage.setItem('userData', JSON.stringify(tokenData));
        context.commit(SET_USER_TOKEN_DATA_MUTATION, tokenData);
        // Setup auto logout
        timer = setTimeout(() => {
          context.dispatch(AUTO_LOGOUT_ACTION);
        }, 3600 * 1000); // 1 hour
      } catch (error) {
        console.error("Error verifying sign-in link:", error);
        throw error.message || "Failed to sign in with the provided link.";
      } finally {
        context.commit('CLEAR_LOADING');
      }
    },
  
    // Logout Action
    [LOGOUT_ACTION](context) {
      auth.signOut();
      context.commit(CLEAR_AUTH_MUTATION);
      localStorage.removeItem('userData');
      if (timer) {
        clearTimeout(timer);
      }
    },
  
    // Auto Logout Action
    [AUTO_LOGOUT_ACTION](context) {
      context.dispatch(LOGOUT_ACTION);
      context.commit(SET_AUTO_LOGOUT_MUTATION);
    },
  
    // Auto Login Action
    async [AUTO_LOGIN_ACTION](context) {
      const userData = JSON.parse(localStorage.getItem('userData'));
      if (!userData) {
        return;
      }
  
      const expiresIn = userData.expiresIn;
      const currentTime = new Date().getTime();
  
      if (expiresIn < currentTime) {
        context.dispatch(AUTO_LOGOUT_ACTION);
        return;
      }
  
      context.commit(SET_USER_TOKEN_DATA_MUTATION, userData);
      const remainingTime = expiresIn - currentTime;
      timer = setTimeout(() => {
        context.dispatch(AUTO_LOGOUT_ACTION);
      }, remainingTime);
    },
  };  