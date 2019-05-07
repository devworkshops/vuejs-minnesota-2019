<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <a class="navbar-brand" href="#">{{appTitle}}</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarCollapse"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav mr-auto">
          <template v-if="isLoggedIn">
            <li class="nav-item active">
              <router-link to="/" :exact="true" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/about" :exact="true" class="nav-link">About</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/suppliers" :exact="true" class="nav-link">Suppliers</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/categories" :exact="true" class="nav-link">Categories</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/products" :exact="true" class="nav-link">Products</router-link>
            </li>
            <li class="nav-item">
              <a @click="logout" class="nav-link">Logout</a>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <router-link to="/login" :exact="true" class="nav-link">Login</router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import { AuthService } from '@/services/NorthwindService.js'

export default {
  props: {
    user: Object
  },
  computed: {
    isLoggedIn() {
      return !!this.user
    },
    appTitle() {
      return process.env.VUE_APP_TITLE
    }
  },
  methods: {
    logout() {
      AuthService.logout()
      this.$router.push('/')
    }
  }
}
</script>


<style scoped>
.nav > .container {
  min-height: 56px;
}
</style>