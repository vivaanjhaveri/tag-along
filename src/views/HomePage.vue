<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Welcome to TagAlong</h1>
    <p class="text-center">
      Track and manage your RFID tags seamlessly.
    </p>
    <div class="text-center mt-4">
      <router-link to="/guide" class="btn me-2" style = "background-color:#0d6efd; color: white">Product Guide</router-link>
      <router-link to="/signup" class="btn me-2" style = "background-color:#0d6efd; color: white">Sign Up</router-link>
      <router-link to="/login" class="btn me-2" style = "background-color:#0d6efd; color: white">Login</router-link>
    </div>
  </div>
</template>

<style scoped>
  .container {
    max-width: 800px;
  }
  
  h1 {
    color: #0d6efd; /* Bootstrap primary color */
  }
  
  .card {
    padding: 20px;
  }
  
  .list-group-item {
    margin-bottom: 15px;
  }
  
  .btn-primary {
    background-color: #007bff;
    border: none;
  }
  
  .btn-secondary {
    background-color: #6c757d;
    border: none;
  }
  </style>
  
<script>
export default {
  name: 'Home-Page',
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
