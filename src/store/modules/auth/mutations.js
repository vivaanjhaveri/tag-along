import {
    SET_USER_TOKEN_DATA_MUTATION,
    CLEAR_AUTH_MUTATION,
    SET_LOADING,
    CLEAR_LOADING,
    SET_AUTO_LOGOUT_MUTATION,
} from '@/store/storeconstants';

export default {
    [SET_USER_TOKEN_DATA_MUTATION](state, payload) {
        state.email = payload.email;
        state.token = payload.token;
        state.expiresIn = payload.expiresIn;
        state.refreshToken = payload.refreshToken;
        state.userId = payload.userId;
        state.autoLogout = false;
    },

    [CLEAR_AUTH_MUTATION](state) {
        state.email = null;
        state.token = null;
        state.expiresIn = null;
        state.refreshToken = null;
        state.userId = null;
        state.autoLogout = false;
    },

    [SET_LOADING](state) {
        state.showLoading = true;
    },

    [CLEAR_LOADING](state) {
        state.showLoading = false;
    },

    [SET_AUTO_LOGOUT_MUTATION](state) {
        state.autoLogout = true;
    },
};