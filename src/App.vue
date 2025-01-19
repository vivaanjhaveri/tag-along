<template>
  <div>
    <Navbar />
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div>
            <router-view></router-view>
          </div>
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
      isDarkMode: (state) => state.darkMode,
    }),
  },
  watch: {
    isDarkMode(newValue) {
      // Apply or remove dark mode on the <body> tag
      document.body.classList.toggle('dark-mode', newValue);
    },
  },
  components: {
    Navbar,
  },
  created() {
    this.$store.dispatch(`auth/${AUTO_LOGIN_ACTION}`);
    // Load dark mode preference from localStorage
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    this.$store.dispatch('setDarkMode', savedDarkMode);
  },
};
</script>

<style scoped>
/* Scoped styles specific to App.vue */
</style>
