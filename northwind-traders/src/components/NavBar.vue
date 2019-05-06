<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <a class="navbar-brand" href="#">Northwind Traders</a>
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
          <li class="nav-item active">
            <router-link to="/" :exact="true" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" :exact="true" class="nav-link">About</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/suppliers" :exact="true" class="nav-link">Suppliers</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.nav > .container {
  min-height: 56px;
}
</style>