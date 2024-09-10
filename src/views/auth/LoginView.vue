<template>
  <div class="col-md-4">
    <div class="card bg-warning">
      <div class="card-body">
        <h3 class="card-title text-center">Login</h3>
        <form @submit.prevent="login">
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input v-model="username" type="text" class="form-control" id="username" placeholder="Enter your username"
              required />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input v-model="password" type="password" class="form-control" id="password"
              placeholder="Enter your password" required />
          </div>
          <div class="d-grid gap-2">
            <button type="submit" class="btn btn-dark" :disabled="loading">
              <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              <span v-else>Login</span>
            </button>
          </div>
        </form>
        <div v-if="errorMessage" class="alert alert-danger mt-3">
          {{ errorMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      loading: false,
      errorMessage: '',
    };
  },
  methods: {
    async login() {
      this.loading = true;
      this.errorMessage = '';

      try {
        const response = await axios.post('auth/token/login', {
          username: this.username,
          password: this.password,
        });

        const token = response.data.auth_token;
        // Save the token in localStorage (or any other storage method)
        localStorage.setItem('auth_token', token);

        // Redirect or perform further actions after successful login
        this.$router.push('/');
      } catch (error) {
        this.errorMessage = 'Invalid username or password';
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>