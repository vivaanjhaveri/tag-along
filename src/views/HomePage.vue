<template>
  <div class="container mt-5">
    <h1 class="text-center">Welcome to TagAlong</h1>
    <p class="text-center">
      Track and manage your RFID tags seamlessly.
    </p>
    <div class="text-center mt-4">
      <router-link to="/signup" class="btn btn-primary me-2">Sign Up</router-link>
      <router-link to="/login" class="btn btn-secondary">Login</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home-Page',
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
