import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default {
    namespaced: true,
    state() {
        return {
          token: '',
          email: '',
          userId: '',
          refreshToken: '',
          expiresIn: null,
          autoLogout: false,
        };
    },
    mutations,
    getters,
    actions,
};