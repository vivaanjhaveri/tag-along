<!-- src/views/LoginPage.vue -->
<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <div class="card mt-5">
        <div class="card-body">
          <h3>Login</h3>
          <hr />
          
          <!-- General Error Alert -->
          <div class="alert alert-danger" v-if="error">
            {{ error }}
          </div>
          
          <!-- Email/Password Sign-In Form -->
          <form @submit.prevent="onEmailPasswordLogin">
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
              <button type="submit" class="btn btn-primary w-100">
                <span>Login</span>
              </button>
            </div>
          </form>

          <hr />

          <!-- Passwordless Sign-In Form -->
           <h5>Passwordless Email Link Log-In </h5>
          <form @submit.prevent="onPasswordlessLogin">
            <div class="form-group mb-3">
              <label for="passwordlessEmail">Email</label>
              <input
                type="email"
                class="form-control"
                id="passwordlessEmail"
                v-model.trim="passwordlessEmail"
                @blur="validatePasswordlessEmail"
                :class="{ 'is-invalid': errors.passwordlessEmail }"
                placeholder="Enter your email"
              />
              <div class="invalid-feedback" v-if="errors.passwordlessEmail">
                {{ errors.passwordlessEmail }}
              </div>
            </div>

            <div class="my-3">
              <button type="submit" class="btn w-100" style="background-color: green; color: white;">
                <span>Send Sign-In Link</span>
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth, isSignInWithEmailLink } from '@/services/firebase';
import { mapActions, mapGetters } from 'vuex';
import { VERIFY_SIGNIN_LINK, LOGIN_ACTION, SEND_SIGNIN_LINK } from '@/store/storeconstants';

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      passwordlessEmail: '',
      errors: {},
      error: '',
      showPassword: false,
    };
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'autoLogout']),
  },
  created() {
    // Handle sign-in link if present in URL
    if (isSignInWithEmailLink(auth, window.location.href)) {
      const email = window.localStorage.getItem('emailForSignIn') || this.passwordlessEmail;
      if (!email) {
        // Prompt user to enter their email
        this.error = "Please enter your email for sign-in.";
      } else {
        this.passwordlessEmail = email;
        this.onPasswordlessLoginLink();
      }
    }
  },
  methods: {
    ...mapActions('auth', {
      login: LOGIN_ACTION,
      sendSignInLink: SEND_SIGNIN_LINK,
      verifySignInLink: VERIFY_SIGNIN_LINK,
    }),

    // Email/Password Login
    async onEmailPasswordLogin() {
      // Reset previous errors
      this.errors = {};
      this.error = '';

      // Validate form inputs
      this.validateEmail();
      this.validatePassword();

      // Check for validation errors
      if (Object.keys(this.errors).length) {
        return;
      }

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
      }
    },

    // Passwordless Sign-In: Send Sign-In Link
    async onPasswordlessLogin() {
      // Reset previous errors and messages
      this.errors = {};
      this.error = '';

      // Validate email
      this.validatePasswordlessEmail();

      // Check for validation errors
      if (Object.keys(this.errors).length) {
        return;
      }

      // Send sign-in link
      try {
        await this.sendSignInLink({ email: this.passwordlessEmail });
        this.error = "Sign-in link sent! Please check your email.";
      } catch (e) {
        this.error = e;
      }
    },

    // Handle Sign-In Link Click
    async onPasswordlessLoginLink() {
      try {
        await this.verifySignInLink({ email: this.passwordlessEmail });
        this.$router.push('/dashboard');
      } catch (e) {
        this.error = e;
      }
    },

    // Real-time Email Validation for Email/Password Login
    validateEmail() {
      if (!this.email) {
        this.errors.email = 'Email is required.';
      } else if (!this.validEmail(this.email)) {
        this.errors.email = 'Please enter a valid email address.';
      } else {
        this.errors.email = '';
      }
    },

    // Real-time Password Validation for Email/Password Login
    validatePassword() {
      if (!this.password) {
        this.errors.password = 'Password is required.';
      } else if (this.password.length < 6) {
        this.errors.password = 'Password must be at least 6 characters.';
      } else {
        this.errors.password = '';
      }
    },

    // Real-time Email Validation for Passwordless Sign-In
    validatePasswordlessEmail() {
      if (!this.passwordlessEmail) {
        this.errors.passwordlessEmail = 'Email is required.';
      } else if (!this.validEmail(this.passwordlessEmail)) {
        this.errors.passwordlessEmail = 'Please enter a valid email address.';
      } else {
        this.errors.passwordlessEmail = '';
      }
    },

    // Email Format Checker
    validEmail(email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
      return re.test(email);
    },

    // Toggle Password Visibility
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
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

</style>
