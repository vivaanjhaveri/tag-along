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
              <button type="submit" class="btn btn-success w-100">
                Signup with Email
              </button>
            </div>
          </form>

          <hr />

          <!-- Passwordless Email Link Sign-Up Section -->
          <h5>Passwordless Email Link Sign-Up</h5>
          <!-- Error Alert -->
          <div class="alert alert-danger" v-if="passwordlessError">
            {{ passwordlessError }}
          </div>
          <!-- Success Alert -->
          <div class="alert alert-success" v-if="passwordlessSuccess">
            {{ passwordlessSuccess }}
          </div>
          <form @submit.prevent="onPasswordlessSignup">
            <div class="form-group mb-3">
              <label for="passwordlessEmail">Email</label>
              <input
                type="email"
                class="form-control"
                id="passwordlessEmail"
                v-model.trim="passwordlessEmail"
                @blur="validatePasswordlessEmail"
                :class="{ 'is-invalid': passwordlessErrors.passwordlessEmail }"
                placeholder="Enter your email"
              />
              <div class="invalid-feedback" v-if="passwordlessErrors.passwordlessEmail">
                {{ passwordlessErrors.passwordlessEmail }}
              </div>
            </div>

            <div class="my-3">
              <button type="submit" class="btn btn-secondary w-100">
                Send Sign-In Link
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
import { SEND_SIGNIN_LINK, SIGNUP_ACTION } from '@/store/storeconstants';

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

      // Passwordless Email Link Sign-Up Data
      passwordlessEmail: '',
      passwordlessErrors: {},
      passwordlessError: '',
      passwordlessSuccess: '',

      // Password Visibility Toggle
      showPassword: false,
    };
  },
  methods: {
    ...mapActions('auth', {
      sendSignInLink: SEND_SIGNIN_LINK,
      signup: SIGNUP_ACTION,
    }),

    // Toggle Password Visibility
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },

    // Email/Password Sign-Up Methods

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

    // Passwordless Email Link Sign-Up Methods

    // Validate Passwordless Email
    validatePasswordlessEmail() {
      if (!this.passwordlessEmail) {
        this.passwordlessErrors.passwordlessEmail = 'Email is required.';
      } else if (!this.validEmail(this.passwordlessEmail)) {
        this.passwordlessErrors.passwordlessEmail = 'Please enter a valid email address.';
      } else {
        this.passwordlessErrors.passwordlessEmail = '';
      }
    },

    // Handle Passwordless Email Link Sign-Up
    async onPasswordlessSignup() {
      // Reset previous errors and messages
      this.passwordlessError = '';
      this.passwordlessSuccess = '';
      this.validatePasswordlessEmail();

      // Check for validation errors
      if (Object.values(this.passwordlessErrors).some(error => error)) {
        return;
      }

      try {
        await this.sendSignInLink({ email: this.passwordlessEmail });
        this.passwordlessSuccess = "Sign-in link sent! Please check your email.";
      } catch (e) {
        this.passwordlessError = e;
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
