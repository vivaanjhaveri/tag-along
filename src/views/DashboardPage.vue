<!-- src/views/Dashboard.vue -->
<template>
    <div class="container mt-5">
      <h2 class="text-center">Dashboard</h2>
      <div class="mt-4">
        <h4>RFID Tags Information</h4>
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Tag ID</th>
              <th scope="col">Location</th>
              <th scope="col">Status</th>
              <th scope="col">Last Updated</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="tag in tags" :key="tag.id">
              <td>{{ tag.id }}</td>
              <td>{{ tag.location }}</td>
              <td>
                <span
                  class="badge"
                  :class="tag.status === 'Active' ? 'bg-success' : 'bg-secondary'"
                >
                  {{ tag.status }}
                </span>
              </td>
              <td>{{ tag.lastUpdated }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Dashboard-Page',
    data() {
      return {
        tags: [
          // Placeholder data; replace with actual data from backend
          {
            Tag_ID: 'TAG001',
            Object: 'Warehouse A',
            Status: 'Active',
            Description: 'optional',
            Last_Updated: '2025-01-17 10:00 AM',
          },
          {
            Tag_ID: 'TAG002',
            Object: 'Warehouse B',
            Status: 'Active',
            Description: 'optional',
            Last_Updated: '2025-01-17 10:00 AM',
          },
          // Add more tag objects as needed
        ],
      };
    },
    mounted() {
      // Fetch RFID tag data from backend API when available
    },
  };
  </script>
  
  <style scoped>
  /* Add any custom styles here */
  </style>
  