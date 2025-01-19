import { createStore } from 'vuex';
import auth from './modules/auth/index';
import { SET_LOADING, CLEAR_LOADING } from './storeconstants';

const store = createStore({
  modules: {
    auth,
  },
  state() {
    return {
      showLoading: false,
      darkMode: false, // Global dark mode state
    };
  },
  mutations: {
    [SET_LOADING](state) {
      state.showLoading = true;
    },
    [CLEAR_LOADING](state) {
      state.showLoading = false;
    },
    TOGGLE_DARK_MODE(state) {
      state.darkMode = !state.darkMode;
    },
    SET_DARK_MODE(state, payload) {
      state.darkMode = payload;
    },
  },
  getters: {
    isDarkMode: (state) => state.darkMode,
  },
  actions: {
    toggleDarkMode({ commit, state }) {
      const newMode = !state.darkMode;
      localStorage.setItem('darkMode', newMode);
      commit('TOGGLE_DARK_MODE');
    },
    setDarkMode({ commit }, payload) {
      localStorage.setItem('darkMode', payload);
      commit('SET_DARK_MODE', payload);
    },
  },
});

export default store;