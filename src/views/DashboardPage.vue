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
      <table class="table table-striped table-dark-mode">
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
        <div class="modal-content dark-mode-content">
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
        <div class="modal-content dark-mode-content">
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
/* Same script content as provided earlier */
</script>

<style scoped>
.table-dark-mode {
  background-color: var(--bs-dark) !important;
  color: var(--bs-light) !important;
}

.dark-mode-content {
  background-color: var(--bs-dark) !important;
  color: var(--bs-light) !important;
}

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
