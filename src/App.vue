<template>
  <Navbar> </Navbar>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div>
          <router-view>
                
          </router-view>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
import { mapState } from 'vuex';
import Navbar from '@/components/Navbar.vue';
import { AUTO_LOGIN_ACTION } from './store/storeconstants';

export default {
    name: 'App',
    computed: {
        ...mapState({
            showLoading: (state) => state.showLoading,
            autoLogout: (state) => state.auth.autoLogout,
        }),
    },

    watch: {
        autoLogout(curValue, oldValue) {
            if (curValue && curValue != oldValue) {
                this.$router.replace('/login');
            }
        },
    },
    components: {
        Navbar,
    },
    created() {
        this.$store.dispatch(`auth/${AUTO_LOGIN_ACTION}`);
    },
};
</script>