<template>
    <div class="container mt-5">
      <h2 class="text-center">NFC Scanner</h2>
      <div class="mt-4">
        <button
          class="btn btn-primary mb-3"
          @click="startScan"
          :disabled="isScanning"
        >
          {{ isScanning ? "Scanning..." : "Start Scan" }}
        </button>
  
        <div v-if="scannedTag" class="mt-4">
          <h5>Scanned Tag Information:</h5>
          <p><strong>Tag ID:</strong> {{ scannedTag.id }}</p>
          <p><strong>Message:</strong> {{ scannedTag.message }}</p>
          <div class="mt-3">
            <button class="btn btn-success" @click="saveTagToFirestore">
              Save to Firestore
            </button>
          </div>
        </div>
  
        <div v-if="scanError" class="text-danger mt-4">
          <p>{{ scanError }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  /* global NDEFReader */ // <-- Tells ESLint that NDEFReader is a recognized global
  
  import { getFirestore, collection, addDoc } from "firebase/firestore";
  import { getAuth } from "firebase/auth";
  
  export default {
    name: "Scanner-Page",
    data() {
      return {
        isScanning: false,
        scannedTag: null,
        scanError: "",
        userId: null, // Store the logged-in user's UID
      };
    },
    methods: {
      async fetchUserId() {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
          this.userId = user.uid;
        } else {
          this.scanError = "User not authenticated. Please log in.";
        }
      },
      async startScan() {
        // Check if the NDEFReader API is supported
        if (!("NDEFReader" in window)) {
          this.scanError = "Web NFC is not supported on this device.";
          return;
        }
  
        this.isScanning = true;
        this.scanError = "";
  
        try {
          const ndef = new NDEFReader();
          await ndef.scan();
          ndef.onreading = (event) => {
            const decoder = new TextDecoder();
            let message = "";
            for (const record of event.message.records) {
              message += decoder.decode(record.data) + " ";
            }
            this.scannedTag = {
              id: event.serialNumber || "Unknown",
              message: message.trim(),
            };
            this.isScanning = false;
          };
          ndef.onreadingerror = () => {
            this.scanError = "NFC reading error. Please try again.";
            this.isScanning = false;
          };
        } catch (error) {
          this.scanError =
            "NFC scan failed. Ensure your device supports NFC and try again.";
          console.error("NFC Scan Error:", error);
          this.isScanning = false;
        }
      },
      async saveTagToFirestore() {
        if (!this.scannedTag) return;
  
        // Ensure we have a valid user ID
        if (!this.userId) {
          await this.fetchUserId();
          if (!this.userId) {
            alert("Cannot save tag. User is not authenticated.");
            return;
          }
        }
  
        const db = getFirestore();
        const newTag = {
          Tag_ID: this.scannedTag.id,
          Message: this.scannedTag.message,
          Status: "Scanned",
          Last_Updated: new Date().toLocaleString(),
          userId: this.userId,
        };
  
        try {
          await addDoc(collection(db, "tags"), newTag);
          alert("Tag saved successfully to Firestore.");
          this.scannedTag = null;
        } catch (error) {
          console.error("Error saving tag to Firestore:", error);
          alert("Failed to save the tag. Please try again.");
        }
      },
    },
    async mounted() {
      await this.fetchUserId(); // Fetch the user ID on component mount
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 500px;
    margin: auto;
  }
  </style>
  