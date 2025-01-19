<template>
  <div class="container homepage">
    <h1 class="main-title text-center">Welcome to</h1>
    <div class="logo-container">
      <img :src="isDarkMode ? '/logo_yellow.png' : '/logo_blue.png'" alt="Logo" class="homepage-logo" />
    </div>
    <p class="text-center">
      Track and manage your RFID tags seamlessly.
    </p>
    <div class="text-center mt-4">
      <router-link to="/guide" class="btn btn-primary">Product Guide</router-link>
      <router-link to="/signup" class="btn btn-primary">Sign Up</router-link>
      <router-link to="/login" class="btn btn-primary">Login</router-link>
    </div>
  </div>
</template>

<style scoped>
/* Center-align the entire container */
.homepage {
  display: flex;
  margin-top: 10%;
  flex-direction: column;
  justify-content: top; /* Vertically centers content */
  align-items: center; /* Horizontally centers content */
  height: 100vh; /* Full viewport height */
}

/* Style for the logo */
.logo-container {
  display: flex;
  justify-content: center; /* Horizontal alignment */
}

.homepage-logo {
  height: 150px;
  width: auto;
  object-fit: contain; /* Maintain aspect ratio */
  margin-bottom: 35px;
}

/* Other styles for the container and text */
.container {
  max-width: 800px;
}

h1 {
  color: #0d6efd; /* Bootstrap primary color */
}

.btn-primary {
  margin-right: 15px;
}

.card {
  padding: 20px;
}

.list-group-item {
  margin-bottom: 15px;
}
</style>

<script>
export default {
  name: "Home-Page",
  computed: {
    isDarkMode() {
      return this.$store.state.darkMode; // Assuming dark mode is stored in Vuex
    },
  },
};
</script>
