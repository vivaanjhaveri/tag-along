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
    };
  },
  mutations: {
    [SET_LOADING](state) {
      state.showLoading = true;
    },
    [CLEAR_LOADING](state) {
      state.showLoading = false;
    },
  },
});

export default store;