<!-- src/views/LoginPage.vue -->
<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <div class="card mt-5">
        <div class="card-body">
          <h3 style="color: #0d6efd;">Login</h3>
          <hr />
          <!-- Error Alert -->
          <div class="alert alert-danger" v-if="error">
            {{ error }}
          </div>
          <form @submit.prevent="onLogin">
            <div class="form-group mb-3">
              <label for="email">Email</label>
              <input
                type="email"
                class="form-control"
                id="email"
                v-model.trim="email"
                @blur="validateEmail"
                :class="{ 'is-invalid': errors.email }"
                placeholder="Enter your email"
              />
              <div class="invalid-feedback" v-if="errors.email">
                {{ errors.email }}
              </div>
            </div>
            <div class="form-group mb-3">
              <label for="password">Password</label>
              <div class="input-group">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  class="form-control"
                  id="password"
                  v-model.trim="password"
                  @blur="validatePassword"
                  :class="{ 'is-invalid': errors.password }"
                  placeholder="Enter your password"
                />
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  @click="togglePasswordVisibility"
                >
                  <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                </button>
                <div class="invalid-feedback" v-if="errors.password">
                  {{ errors.password }}
                </div>
              </div>
            </div>

            <div class="my-3">
              <button type="submit" class="btn btn-primary w-100" :disabled="loading">
                <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span v-else>Login</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import SignupValidations from '@/services/SignupValidations';
import { LOGIN_ACTION } from '@/store/storeconstants';

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      errors: {},
      error: '',
      showPassword: false,
    };
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'autoLogout']),
    loading() {
      return this.$store.state.showLoading;
    },
  },
  methods: {
    ...mapActions('auth', {
      login: LOGIN_ACTION,
    }),

    async onLogin() {
      // Reset previous errors
      this.errors = {};
      this.error = '';

      // Validate form inputs
      const validations = new SignupValidations(this.email, this.password);
      this.errors = validations.checkValidations();

      // Check for validation errors
      if (Object.keys(this.errors).length) {
        return;
      }

      // Show loading spinner
      this.$store.commit('SET_LOADING');

      // Attempt to login
      try {
        await this.login({
          email: this.email,
          password: this.password,
        });
        // Redirect to Dashboard upon successful login
        this.$router.push('/dashboard');
      } catch (e) {
        // Display fixed authentication error
        this.error = "Invalid login details";
      } finally {
        // Hide loading spinner
        this.$store.commit('CLEAR_LOADING');
      }
    },

    // Real-time Email Validation
    validateEmail() {
      if (!this.email) {
        this.errors.email = 'Email is required.';
      } else if (!this.validEmail(this.email)) {
        this.errors.email = 'Please enter a valid email address.';
      } else {
        this.errors.email = '';
      }
    },

    // Real-time Password Validation
    validatePassword() {
      if (!this.password) {
        this.errors.password = 'Password is required.';
      } else if (this.password.length < 6) {
        this.errors.password = 'Password must be at least 6 characters.';
      } else {
        this.errors.password = '';
      }
    },

    // Toggle Password Visibility
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },

    // Email Format Checker
    validEmail(email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
      return re.test(email);
    },
  },
  watch: {
    autoLogout(newVal) {
      if (newVal) {
        this.$router.replace('/login');
      }
    },
  },
};
</script>

<style scoped>
.invalid-feedback {
  display: block;
}

button[disabled] {
  cursor: not-allowed;
  opacity: 0.65;
}

.card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
