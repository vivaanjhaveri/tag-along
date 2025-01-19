<template>
    <div class="container mt-5">
        <!-- Page Title -->
        <h1 class="text-center mb-4" style="color: #0d6efd;">How to Use Our Product</h1>

        <!-- Guide Steps -->
        <div>
            <!-- Step 1 -->
            <div class="card shadow mb-3">
                <div class="card-body">
                    <h5>1. Attach tag to your item</h5>
                    <p>Securely attach the RFID tag to the item you wish to track.</p>
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
                    <h5>3. On your dashboard, click on "Add new tag"</h5>
                    <p>Once logged in, navigate to your dashboard and click the "Add new tag" button to begin.</p>
                    <hr>
                </div>

                <!-- Step 4 -->
                <div class="card-body">
                    <h5>4. Scan the RFID tag</h5>
                    <p>
                        Use your device to scan the RFID tag. Ensure that the tag is within scanning range for accurate
                        detection.
                    </p>
                    <hr>
                </div>

                <!-- Step 5 -->
                <div class="card-body">
                    <h5>5. Complete the tag details</h5>
                    <p>Fill in the required details:</p>
                    <ul>
                        <li><strong>Tag ID:</strong> The unique ID of your tag.</li>
                        <li><strong>Object:</strong> The name of the object the tag is attached to.</li>
                        <li><strong>Description:</strong> A brief description of the object.</li>
                    </ul>
                    <hr>
                </div>

                <!-- Step 6 -->
                <div class="card-body">
                    <h5>6. You’re all set!</h5>
                    <p>You can now track your items. At any time, you can delete or rename a tag as needed.</p>
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
/* Styling the container and card */
.card-body {
    margin-top: 0px;
    padding-top: 0%;
    margin-bottom: 0px;
    padding-bottom: 0%;
}

.container {
    max-width: 800px;
}

h5 {
    color: #0d6efd;
    /* Bootstrap primary color */
}

.card {
    padding-top: 50px;
    padding-left: 40px;
    padding-right: 40px;
    padding-bottom: 50px;
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