<template>
    <div class="container mt-5">
      <!-- Page Title -->
      <h1 class="main-title">
        How to Use Our Product 🚀
      </h1>
  
      <!-- Single Card for All Steps -->
      <div class="card shadow mb-3">
            <div class="card-body">
                <!-- Step 1 -->
                <h5>1️⃣ Attach the tag to your item</h5>
                <p>🔒 Securely attach the RFID tag to the item you wish to track.</p>
                <hr />

                <!-- Step 2 -->
                <h5>2️⃣ Sign up (or Log in) to your account</h5>
                <p>📝 If you're new, create an account to get started. Already have an account? Log in to access your dashboard.</p>
                <div class="d-flex gap-3 mb-3">
                    <router-link to="/signup" class="btn btn-primary">
                        Sign Up
                    </router-link>
                    <router-link to="/login" class="btn btn-secondary">
                        Log In
                    </router-link>
                </div>
                <hr />

                <!-- Step 3 -->
                <h5>3️⃣ On your dashboard, click on "Add new tag"</h5>
                <p>🖱️ Once logged in, navigate to your dashboard and click the "Add new tag" button to begin.</p>
                <hr />

                <!-- Step 4 -->
                <h5>4️⃣ Scan the RFID tag</h5>
                <p>📡 Use your device to scan the RFID tag. Ensure that the tag is within scanning range for accurate detection.</p>
                <hr />

                <!-- Step 5 -->
                <h5>5️⃣ Complete the tag details</h5>
                <p>📋 Fill in the required details:</p>
                <ul>
                    <li><strong>🔑 Tag ID:</strong> The unique ID of your tag.</li>
                    <li><strong>📌 Object:</strong> The name of the object the tag is attached to.</li>
                    <li><strong>🖊️ Description:</strong> A brief description of the object.</li>
                </ul>
                <hr />

                <!-- Step 6 -->
                <h5>6️⃣ You’re all set!</h5>
                <p>🎉 You can now track your items. At any time, you can delete or rename a tag as needed.</p>
            </div>
        </div>
    </div>
</template>
  
  <script>
  export default {
    name: "GuidePage",computed: {
    isDarkMode() {
      return this.$store.state.darkMode; // Assuming dark mode is stored in Vuex
    },
  },
};
</script>

<style scoped>
/* Styling for the card and container */
.card {
  border-radius: 15px;
  transition: transform 0.2s ease-in-out;
  padding: 25px;
}

.card:hover {
  transform: scale(1.03);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.container {
  max-width: 800px;
  margin: auto;
}

/* Step Title Styling */
.step-title {
  color: #0d6efd; /* Default light mode color */
}

body.dark-mode .step-title {
  color: white; /* Dark mode color */
}

/* Button styling */
.btn-primary {
  margin-right: 15px;
}

hr {
  border-top: 1px solid #ddd;
}
</style>