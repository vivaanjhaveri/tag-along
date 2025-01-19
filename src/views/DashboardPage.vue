<template>
  <div class="container mt-5">
    <h2 class="text-center">Dashboard</h2>

    <!-- NFC Scan Section -->
    <div class="mt-4" style="text-align: center;">
      <button class="btn btn-primary mb-3" @click="startScan" :disabled="isScanning">
        {{ isScanning ? "Scanning..." : "Start Scan" }}
      </button>
      <div v-if="scanError" class="text-danger mt-4">
        <p>{{ scanError }}</p>
      </div>

      <button class="btn btn-danger mb-3" @click="resetAllTagsStatus">
        Reset Tags
      </button>
    </div>
    <hr />

    <!-- RFID Tags Information Section -->
    <div class="mt-4">
      <h4>RFID Tags Information</h4>

      <!-- Tags Table -->
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Tag ID</th>
            <th scope="col">Object</th>
            <th scope="col">Status</th>
            <th scope="col">Last Updated</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="tag in tags" :key="tag.id">
            <td>{{ tag.Tag_ID }}</td>
            <td>{{ tag.Object }}</td>
            <td>
              <span class="badge text-white" :class="tag.Status === 'Registered' ? 'bg-success' : 'bg-warning'">
                {{ tag.Status }}
              </span>
            </td>
            <td>{{ tag.Last_Updated }}</td>
            <td>
              <button class="btn btn-warning btn-sm me-2" @click="openRenameTagModal(tag)" :disabled="isActionLocked">
                Rename
              </button>
              <button class="btn btn-danger btn-sm" @click="deleteTag(tag.id)" :disabled="isActionLocked">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Rename Tag Modal -->
    <div v-if="showRenameTagModal" class="modal show d-block" tabindex="-1">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Rename Object</h5>
            <button type="button" class="btn-close" @click="closeRenameTagModal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="renameTag">
              <div class="mb-3">
                <label for="renameObject" class="form-label">Object</label>
                <input type="text" id="renameObject" v-model="editableTag.Object" class="form-control" required />
              </div>
              <button type="submit" class="btn btn-primary">Rename</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global NDEFReader */
import { writeBatch } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default {
  name: "DashboardPage",
  data() {
    return {
      isScanning: false,
      scanError: "",
      tags: [],
      showRenameTagModal: false,
      isActionLocked: false,
      userId: "user123", // sample user ID
      maxTagsPerUser: 5,
      newTag: {
        Tag_ID: "",
        Object: "",
        Status: "",
        Description: "",
      },
      editableTag: null,
      tagScanTimers: {},
    };
  },
  methods: {
    async resetAllTagsStatus() {
    if (this.isActionLocked) return;

    this.isActionLocked = true;
    try {
      // Update each tag status to "Registered" in Firestore
      const timestamp = new Date().toLocaleString();
      const batch = writeBatch(db);  // Batch write to reduce multiple requests

      this.tags.forEach((tag) => {
        const tagRef = doc(db, "tags", tag.id);
        batch.update(tagRef, {
          Status: "Registered",
          Last_Updated: timestamp,
        });
      });

      // Commit the batch update
      await batch.commit();
      // Update local tags list
      this.tags.forEach((tag) => {
        tag.Status = "Registered";
        tag.Last_Updated = timestamp;
      });

      console.log("All tags have been reset to 'Registered'.");
    } catch (error) {
      console.error("Error resetting tags:", error);
      alert("Failed to reset the tags.");
    } finally {
      this.isActionLocked = false;
    }
  },

    async startScan() {
      if (!("NDEFReader" in window)) {
        this.scanError = "Web NFC is not supported on this device.";
        return;
      }

      console.log("User clicked scan button");
      this.isScanning = true;
      this.scanError = "";

      try {
        const ndef = new NDEFReader();
        await ndef.scan();
        console.log("> Scan started");

        ndef.addEventListener("readingerror", () => {
          console.log("Cannot read data from the NFC tag. Try another one?");
          this.scanError = "Cannot read data from the NFC tag. Try another one?";
          this.isScanning = false;
        });

        ndef.addEventListener("reading", ({ message, serialNumber }) => {
          console.log(`> Serial Number: ${serialNumber}`);
          console.log(`> Records: (${message.records.length})`);

          this.isScanning = false;

          // Check if the tag already exists in the list
          const existingTagIndex = this.tags.findIndex(
            (tag) => tag.Tag_ID === serialNumber
          );

          // Only show the alert and add new tag if it does not exist
          if (existingTagIndex === -1) {
            this.newTag.Tag_ID = serialNumber || "Unknown";
            this.newTag.Object = "Scanned NFC Tag";
            this.newTag.Status = "Registered";
            this.newTag.Description = "";

            this.addNewTag();
          } else {
            const existingTagId = this.tags[existingTagIndex].id;
            this.updateTagStatus(existingTagId, "Scanned");
            this.startTagTimer(serialNumber);
          }
        });
      } catch (error) {
        console.log("NFC scan error:", error);
        this.scanError = "NFC scan failed. Ensure your device supports NFC and try again.";
        this.isScanning = false;
      }
    },

    startTagTimer(tagId) {
      if (this.tagScanTimers[tagId]) {
        clearTimeout(this.tagScanTimers[tagId]);
      }

      const timerId = setTimeout(() => {
        const registeredTags = this.tags.filter((t) => t.Status === "Registered");

        if (registeredTags.length > 0) {
          registeredTags.forEach((tag) => {
            const objectName = tag.Object;
            alert(`You left your ${objectName} behind`);
          });
        }

        delete this.tagScanTimers[tagId];
      }, 5000);

      this.tagScanTimers[tagId] = timerId;
    },

    async addNewTag() {
      if (this.isActionLocked) return;

      // Check for max tags condition before proceeding
      if (this.tags.length >= this.maxTagsPerUser) {
        if (!this.scanError) {
          alert("Max tags reached!");
          this.scanError = "Max tags reached!";
        }
        return;
      }

      this.isActionLocked = true;
      try {
        const timestamp = new Date().toLocaleString();
        const newTagWithTimestamp = {
          ...this.newTag,
          Last_Updated: timestamp,
          userId: this.userId,
        };

        const docRef = await addDoc(collection(db, "tags"), newTagWithTimestamp);
        this.tags.push({ id: docRef.id, ...newTagWithTimestamp });

        console.log("Tag added to Firebase:", newTagWithTimestamp);

        this.newTag = { Tag_ID: "", Object: "", Status: "", Description: "" };
      } catch (error) {
        console.error("Error adding tag to Firebase:", error);
        alert("Failed to save the tag to Firebase.");
      } finally {
        this.isActionLocked = false;
      }
    },

    async updateTagStatus(tagId, newStatus) {
      if (this.isActionLocked) return;
      this.isActionLocked = true;

      try {
        const tagRef = doc(db, "tags", tagId);
        const timestamp = new Date().toLocaleString();

        await updateDoc(tagRef, {
          Status: newStatus,
          Last_Updated: timestamp,
        });

        const index = this.tags.findIndex((t) => t.id === tagId);
        if (index !== -1) {
          this.tags[index].Status = newStatus;
          this.tags[index].Last_Updated = timestamp;
        }

        console.log(`Tag updated to '${newStatus}':`, tagId);
      } catch (error) {
        console.error("Error updating tag:", error);
        alert("Failed to update the tag status.");
      } finally {
        this.isActionLocked = false;
      }
    },

    async deleteTag(tagId) {
      if (this.isActionLocked) return;
      this.isActionLocked = true;
      try {
        await deleteDoc(doc(db, "tags", tagId));
        this.tags = this.tags.filter((tag) => tag.id !== tagId);
        console.log("Tag deleted:", tagId);
      } catch (error) {
        console.error("Error deleting tag:", error);
        alert("Failed to delete the tag.");
      } finally {
        this.isActionLocked = false;
      }
    },

    // -------------------------------------
    // Rename Tag
    // -------------------------------------
    openRenameTagModal(tag) {
      this.editableTag = { ...tag };
      this.showRenameTagModal = true;
    },
    closeRenameTagModal() {
      this.showRenameTagModal = false;
      this.editableTag = null;
    },
    async renameTag() {
      try {
        const tagRef = doc(db, "tags", this.editableTag.id);
        await updateDoc(tagRef, { Object: this.editableTag.Object });

        const index = this.tags.findIndex((t) => t.id === this.editableTag.id);
        if (index !== -1) {
          this.tags[index].Object = this.editableTag.Object;
        }
        console.log("Tag renamed:", this.editableTag);
      } catch (error) {
        console.error("Error renaming tag:", error);
        alert("Failed to rename the object.");
      } finally {
        this.closeRenameTagModal();
      }
    },
  },
  async mounted() {
    // Fetch existing tags from Firestore
    try {
      const querySnapshot = await getDocs(collection(db, "tags"));
      this.tags = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Error fetching tags from Firebase:", error);
    }
  },
};
</script>

<style scoped>
.modal.show {
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn {
  margin-right: 10px;
}

.container {
  max-width: 800px;
  margin: auto;
}

/* Ensures white text for the badge */
.badge.text-white {
  color: #fff;
}
</style>