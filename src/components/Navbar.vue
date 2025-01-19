<!-- src/components/Navbar.vue -->
<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <!-- Brand -->
        <router-link class="navbar-brand" to="/">TagAlong</router-link>
  
        <!-- Toggler for mobile view -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
  
        <!-- Navbar Links -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <!-- Home Link -->
            <li class="nav-item">
              <router-link
                to="/"
                class="nav-link"
                exact-active-class="active"
              >
                Home
              </router-link>
            </li>
  
            <!-- Links for Unauthenticated Users -->
            <template v-if="!isAuthenticated">
              <li class="nav-item">
                <router-link
                  to="/login"
                  class="nav-link"
                  exact-active-class="active"
                >
                  Login
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  to="/signup"
                  class="nav-link"
                  exact-active-class="active"
                >
                  Signup
                </router-link>
              </li>
            </template>
  
            <!-- Links for Authenticated Users -->
            <template v-else>
              <li class="nav-item">
                <router-link
                  to="/dashboard"
                  class="nav-link"
                  exact-active-class="active"
                >
                  Dashboard
                </router-link>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link" @click.prevent="onLogout">
                  Logout
                </a>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  import { mapActions, mapGetters } from 'vuex';
  import { LOGOUT_ACTION } from '@/store/storeconstants';
  
  export default {
    name: 'Nav-bar',
    computed: {
      ...mapGetters('auth', {
        isAuthenticated: 'IS_USER_AUTHENTICATE_GETTER',
      }),
    },
    methods: {
      ...mapActions('auth', {
        logout: LOGOUT_ACTION,
      }),
      onLogout() {
        this.logout()
          .then(() => {
            // Redirect to Login page after successful logout
            this.$router.push('/login');
          })
          .catch((error) => {
            // Handle any errors during logout
            console.error('Logout failed:', error);
          });
      },
    },
  };
  </script>
  
  <style scoped>
  /* Ensure the active link is highlighted */
  .nav-link.active {
    color: #0d6efd; /* Bootstrap primary color */
  }
  
  </style>
  