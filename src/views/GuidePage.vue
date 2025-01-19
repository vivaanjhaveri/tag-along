<template>
    <div class="container mt-5">
      <!-- Page Title -->
      <h1 class="text-center mb-4" style="color: #0d6efd;">How to Use Our Product</h1>
  
      <!-- Guide Steps -->
      <div>
        <!-- Step 1 -->
        <div class="card shadow mb-3">
          <div class="card-body">
            <h5>1. Attach the RFID tag to your item</h5>
            <p>Securely attach the tag to whatever you want to track.</p>
            <hr>
          </div>
  
          <!-- Step 2 -->
          <div class="card-body">
            <h5>2. Sign up (or Log in) to your account</h5>
            <p>
              If you're new, create an account to get started. Already have an account? Log in to access your
              dashboard.
            </p>
            <div class="d-flex gap-3">
              <router-link to="/signup" class="btn btn-primary">
                Sign Up
              </router-link>
              <router-link to="/login" class="btn btn-secondary">
                Log In
              </router-link>
            </div>
            <hr>
          </div>
  
          <!-- Step 3 -->
          <div class="card-body">
            <h5>3. On your dashboard, click on "Start Scan"</h5>
            <p>
              Once logged in, head to your dashboard. Make sure your device has NFC enabled. Click the <strong>Start
              Scan</strong> button and bring the item (with its RFID tag) near your device.
            </p>
            <hr>
          </div>
  
          <!-- Step 4 -->
          <div class="card-body">
            <h5>4. Check the status of your tag</h5>
            <p>
              If it's a <strong>new tag</strong>, you'll see an alert confirming it has been
              <em>"added successfully"</em> and the status will appear as <strong>"Registered"</strong> (green badge).
              If it’s an <strong>existing tag</strong>, the status changes to <strong>"Scanned"</strong> (yellow
              badge).
            </p>
            <p>
              You can view all tags in the table on your dashboard. Each tag shows its ID, object name, status,
              and last updated time.
            </p>
            <hr>
          </div>
  
          <!-- Step 5 -->
          <div class="card-body">
            <h5>5. Watch out for the 1-minute timer</h5>
            <p>
              When a new tag is first scanned, a background timer starts. If the tag is somehow not
              successfully in the system after 1 minute, you'll see an alert saying 
              <em>"You left your {tag_id} behind"</em>. This helps ensure you don't forget to finalize
              registration of your new tag.
            </p>
            <hr>
          </div>
  
          <!-- Step 6 -->
          <div class="card-body">
            <h5>6. Manage your tags as needed</h5>
            <p>
              On the dashboard, you can:
            </p>
            <ul>
              <li><strong>Rename</strong> a tag (to update the <em>Object</em> field).</li>
              <li><strong>Delete</strong> a tag if it's no longer in use.</li>
            </ul>
            <p>That’s it! Your items are now easily tracked and managed through your dashboard.</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "GuidePage",
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
  }
  
  h5 {
    color: #0d6efd; /* Bootstrap primary color */
  }
  
  .card {
    padding-top: 50px;
    padding-left: 40px;
    padding-right: 40px;
    padding-bottom: 50px;
  }
  
  .card-body {
    margin-top: 0;
    padding-top: 0;
    margin-bottom: 0;
    padding-bottom: 0;
  }
  
  /* Style buttons */
  .btn-primary {
    background-color: #007bff;
    border: none;
  }
  
  .btn-secondary {
    background-color: #6c757d;
    border: none;
  }
  </style>
  