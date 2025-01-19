<template>
  <div class="container mt-5">
    <h2 class="text-center">Dashboard</h2>
    <div class="mt-4">
      <h4>RFID Tags Information</h4>
      <button
        class="btn btn-primary mb-3"
        @click="openAddTagModal"
        :disabled="tags.length >= maxTagsPerUser"
      >
        Add New Tag
      </button>
      <div v-if="tags.length >= maxTagsPerUser" class="text-danger mb-3">
        Cannot add new tag. Maximum number of tags ({{ maxTagsPerUser }}) reached. Please delete one to add another.
      </div>

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
              <span
                class="badge"
                :class="tag.Status === 'Scanned' ? 'bg-success' : 'bg-warning'"
              >
                {{ tag.Status }}
              </span>
            </td>
            <td>{{ tag.Last_Updated }}</td>
            <td>
              <button
                class="btn btn-warning btn-sm me-2"
                @click="openRenameTagModal(tag)"
                :disabled="isActionLocked"
              >
                Rename
              </button>
              <button
                class="btn btn-danger btn-sm"
                @click="deleteTag(tag.id)"
                :disabled="isActionLocked"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add Tag Modal -->
    <div v-if="showAddTagModal" class="modal show d-block" tabindex="-1">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add New Tag</h5>
            <button type="button" class="btn-close" @click="closeAddTagModal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addNewTag">
              <div class="mb-3">
                <label for="tagId" class="form-label">Tag ID</label>
                <input
                  type="text"
                  id="tagId"
                  v-model="newTag.Tag_ID"
                  class="form-control"
                  readonly
                />
                <button
                  type="button"
                  class="btn mt-2"
                  :class="isCalibrated ? 'btn-success' : 'btn-warning'"
                  @click="calibrateTag"
                  :disabled="isCalibrated"
                >
                  {{ isCalibrated ? 'Calibrated' : 'Calibrate Tag' }}
                </button>
              </div>
              <div class="mb-3">
                <label for="object" class="form-label">Object</label>
                <input
                  type="text"
                  id="object"
                  v-model="newTag.Object"
                  class="form-control"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">Description (Optional)</label>
                <textarea
                  id="description"
                  v-model="newTag.Description"
                  class="form-control"
                ></textarea>
              </div>
              <button
                type="submit"
                class="btn btn-primary"
                :disabled="isActionLocked || tags.length >= maxTagsPerUser"
              >
                Add Tag
              </button>
            </form>
          </div>
        </div>
      </div>
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
                <input
                  type="text"
                  id="renameObject"
                  v-model="editableTag.Object"
                  class="form-control"
                  required
                />
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
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";

// Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default {
  name: "DashboardPage",
  data() {
    return {
      tags: [],
      showAddTagModal: false,
      showRenameTagModal: false,
      scanComplete: false,
      isCalibrated: false,
      newTag: {
        Tag_ID: "",
        Object: "",
        Status: "Not Scanned",
        Description: "",
      },
      editableTag: null,
      isActionLocked: false,
      userId: "user123",
      maxTagsPerUser: 5,
    };
  },
  methods: {
    openAddTagModal() {
      this.showAddTagModal = true;
      this.isCalibrated = false;
      this.scanComplete = false;
    },
    closeAddTagModal() {
      this.showAddTagModal = false;
      this.resetNewTag();
    },
    resetNewTag() {
      this.newTag = {
        Tag_ID: "",
        Object: "",
        Status: "Not Scanned",
        Description: "",
      };
      this.isCalibrated = false;
    },
    async addNewTag() {
      if (this.isActionLocked || this.tags.length >= this.maxTagsPerUser) return;
      this.isActionLocked = true;
      const timestamp = new Date().toLocaleString();
      const newTagWithTimestamp = { ...this.newTag, Last_Updated: timestamp, userId: this.userId };
      try {
        const docRef = await addDoc(collection(db, "tags"), newTagWithTimestamp);
        this.tags.push({ id: docRef.id, ...newTagWithTimestamp });
        console.log("Tag added to Firebase:", newTagWithTimestamp);
        this.resetNewTag();
      } catch (error) {
        console.error("Error adding tag to Firebase:", error);
        alert("Failed to save the tag to Firebase.");
      } finally {
        this.isActionLocked = false;
      }
    },
    calibrateTag() {
      const generatedToken = this.generateRFIDToken();
      this.newTag.Tag_ID = generatedToken;
      this.newTag.Status = "Not Scanned";
      this.scanComplete = true;
      this.isCalibrated = true;
    },
    generateRFIDToken() {
      return `RFID-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
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
        const index = this.tags.findIndex((tag) => tag.id === this.editableTag.id);
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
    try {
      const querySnapshot = await getDocs(collection(db, "tags"));
      this.tags = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
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
</style>