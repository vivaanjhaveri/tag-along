// src/store/index.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    user: null,
    token: null,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
    CLEAR_AUTH(state) {
      state.user = null;
      state.token = null;
    },
  },
  actions: {
    login({ commit }, credentials) {
      // Placeholder for login API call
      // Replace with actual API integration
      // For now, we'll mock successful login
      const mockUser = {
        id: 1,
        name: 'John Doe',
        email: credentials.email,
      };
      const mockToken = 'abcdef123456';

      commit('SET_USER', mockUser);
      commit('SET_TOKEN', mockToken);

      // Optionally, save to localStorage for persistence
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('token', mockToken);
    },
    signup({ commit }, userData) {
      // Placeholder for signup API call
      // Replace with actual API integration
      // For now, we'll mock successful signup
      const mockUser = {
        id: 2,
        name: userData.name,
        email: userData.email,
      };
      const mockToken = 'uvwxyz7891011';

      commit('SET_USER', mockUser);
      commit('SET_TOKEN', mockToken);

      // Optionally, save to localStorage for persistence
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('token', mockToken);
    },
    logout({ commit }) {
      commit('CLEAR_AUTH');
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
    initializeStore({ commit }) {
      const user = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      if (user && token) {
        commit('SET_USER', JSON.parse(user));
        commit('SET_TOKEN', token);
      }
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    user: (state) => state.user,
  },
  modules: {},
});
