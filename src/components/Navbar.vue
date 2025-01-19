<template>
    <nav class="navbar navbar-expand-lg" :class="isDarkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'">
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
              <router-link to="/" class="nav-link" exact-active-class="active">
                Home
              </router-link>
            </li>

            <!-- Links for Unauthenticated Users -->
            <template v-if="!isAuthenticated">
              <li class="nav-item">
                <router-link to="/guide" class="nav-link" exact-active-class="active">
                  Guide
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/login" class="nav-link" exact-active-class="active">
                  Login
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/signup" class="nav-link" exact-active-class="active">
                  Signup
                </router-link>
              </li>
            </template>
  
            <!-- Links for Authenticated Users -->
            <template v-else>
              <li class="nav-item">
                <router-link to="/dashboard" class="nav-link" exact-active-class="active">
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
  
          <!-- Dark Mode Toggle -->
          <div class="form-check form-switch ms-3">
            <input
              class="form-check-input"
              type="checkbox"
              id="darkModeToggle"
              :checked="isDarkMode"
              @change="toggleDarkMode"
            />
            <label class="form-check-label" for="darkModeToggle">
              {{ !isDarkMode ? 'Light Mode' : 'Dark Mode' }}
            </label>
          </div>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  import { mapActions, mapState, mapGetters } from 'vuex';
  import { LOGOUT_ACTION } from '@/store/storeconstants';
  
  export default {
    name: 'Nav-bar',
    computed: {
      ...mapState(['darkMode']), // Access global darkMode state
      ...mapGetters('auth', {
        isAuthenticated: 'IS_USER_AUTHENTICATE_GETTER',
      }),
      isDarkMode() {
        return this.darkMode; // Synced with Vuex
      },
    },
    methods: {
      ...mapActions(['toggleDarkMode']), // Vuex action to toggle dark mode
      ...mapActions('auth', {
        logout: LOGOUT_ACTION,
      }),
      onLogout() {
        this.logout()
          .then(() => {
            this.$router.push('/login'); // Redirect to Login after logout
          })
          .catch((error) => {
            console.error('Logout failed:', error); // Handle logout error
          });
      },
    },
  };
  </script>
  
  <style scoped>
  /* Ensure the active link is highlighted */
  .nav-link.active {
    color: #0d6efd; /* Bootstrap primary color */
    font-weight: bold;
  }
  
  /* Dark Mode Styles */
  body.dark-mode {
    background-color: #121212;
    color: #e0e0e0;
  }
  
  body.dark-mode .navbar-dark {
    background-color: #1f1f1f !important;
  }
  
  body.dark-mode .nav-link {
    color: #e0e0e0 !important;
  }
  
  body.dark-mode .nav-link.active {
    color: #ffd700 !important; /* Highlighted color in dark mode */
  }
  
  body.dark-mode .form-check-label {
    color: #e0e0e0;
  }
  </style>
  