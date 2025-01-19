<template>
    <div class="row">
        <div class="col-md-6 offset-md-3">
            <div>
                <div>
                    <h3>Login</h3>
                    <hr />
                </div>
                <div class="alert alert-danger" v-if="error">
                    {{ error }}
                </div>
                <form @submit.prevent="onLogin()">
                    <div class="form-group">
                        <label>Email</label>
                        <input
                            type="text"
                            class="form-control"
                            v-model.trim="email"
                        />
                        <div class="error" v-if="errors.email">
                            {{ errors.email }}
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            class="form-control"
                            v-model.trim="password"
                        />
                        <div class="error" v-if="errors.password">
                            {{ errors.password }}
                        </div>
                    </div>

                    <div class="my-3">
                        <button type="submit" class="btn btn-primary">
                            Login
                        </button>
                    </div>
                </form>
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
        // Display authentication error
        this.error = e;
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