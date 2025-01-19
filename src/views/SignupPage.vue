<!-- src/views/SignupPage.vue -->
<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <div class="card mt-5">
        <div class="card-body">
          <h3>Signup</h3>
          <hr />

          <!-- Email/Password Sign-Up Section -->
          <h5>Email/Password Sign-Up</h5>
          <!-- Error Alert -->
          <div class="alert alert-danger" v-if="emailPasswordError">
            {{ emailPasswordError }}
          </div>
          <!-- Success Alert -->
          <div class="alert alert-success" v-if="emailPasswordSuccess">
            {{ emailPasswordSuccess }}
          </div>
          <form @submit.prevent="onEmailPasswordSignup">
            <div class="form-group mb-3">
              <label for="email">Email</label>
              <input
                type="email"
                class="form-control"
                id="email"
                v-model.trim="email"
                @blur="validateEmail"
                :class="{ 'is-invalid': emailErrors.email }"
                placeholder="Enter your email"
              />
              <div class="invalid-feedback" v-if="emailErrors.email">
                {{ emailErrors.email }}
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
                  :class="{ 'is-invalid': emailErrors.password }"
                  placeholder="Enter your password"
                />
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  @click="togglePasswordVisibility"
                >
                  <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                </button>
                <div class="invalid-feedback" v-if="emailErrors.password">
                  {{ emailErrors.password }}
                </div>
              </div>
            </div>

            <div class="my-3">
              <button type="submit" class="btn btn-primary w-100">
                Signup with Email
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { SIGNUP_ACTION } from '@/store/storeconstants';

export default {
  name: 'SignupPage',
  data() {
    return {
      // Email/Password Sign-Up Data
      email: '',
      password: '',
      emailErrors: {},
      emailPasswordError: '',
      emailPasswordSuccess: '',

      // Password Visibility Toggle
      showPassword: false,
    };
  },
  methods: {
    ...mapActions('auth', {
      signup: SIGNUP_ACTION,
    }),

    // Toggle Password Visibility
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },

    // Validate Email
    validateEmail() {
      if (!this.email) {
        this.emailErrors.email = 'Email is required.';
      } else if (!this.validEmail(this.email)) {
        this.emailErrors.email = 'Please enter a valid email address.';
      } else {
        this.emailErrors.email = '';
      }
    },

    // Validate Password
    validatePassword() {
      if (!this.password) {
        this.emailErrors.password = 'Password is required.';
      } else if (this.password.length < 6) {
        this.emailErrors.password = 'Password must be at least 6 characters.';
      } else {
        this.emailErrors.password = '';
      }
    },

    // Handle Email/Password Sign-Up
    async onEmailPasswordSignup() {
      // Reset previous errors and messages
      this.emailPasswordError = '';
      this.emailPasswordSuccess = '';
      this.validateEmail();
      this.validatePassword();

      // Check for validation errors
      if (Object.values(this.emailErrors).some(error => error)) {
        return;
      }

      try {
        await this.signup({
          email: this.email,
          password: this.password,
        });
        this.emailPasswordSuccess = "Signup successful! Redirecting to dashboard...";
        // Redirect to Dashboard after a short delay
        setTimeout(() => {
          this.$router.push('/dashboard');
        }, 2000);
      } catch (e) {
        this.emailPasswordError = "Signup failed. Please try again.";
      }
    },

    // Email Format Checker
    validEmail(email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
      return re.test(email);
    },
  },
};
</script>

<style scoped>
.invalid-feedback {
  display: block;
}

.alert {
  margin-top: 10px;
}

.card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

h5 {
  margin-top: 20px;
}
</style>
