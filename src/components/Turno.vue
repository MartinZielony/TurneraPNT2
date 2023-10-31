<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from '../stores/user'
const user = useUserStore()
</script>

<template>
  <div class="wrapper">
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <RouterLink to="/">Turnerapp</RouterLink>
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li v-if="user.estaLogueado" class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">
                  <RouterLink to="/about">About</RouterLink>
                </a>
              </li>
              <li v-if="user.estaLogueado" class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                  aria-expanded="false">
                  Dropdown
                </a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Action</a></li>
                  <li><a class="dropdown-item" href="#">Another action</a></li>
                  <li>
                    <hr class="dropdown-divider">
                  </li>
                  <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li>
              <li v-if="user.estaLogueado" class="nav-item">
                <a class="nav-link disabled" aria-disabled="true">Disabled</a>
              </li>
            </ul>

            <RouterLink v-if="!user.estaLogueado" to="/login"><button class="btn btn-outline-success">Login</button></RouterLink>
            <h4 v-if="user.estaLogueado">{{ user.nombreUsuario }}</h4>
            <button @click="user.reset()" v-if="user.estaLogueado" class="btn btn-outline-danger">Logout</button>
          </div>
        </div>
      </nav>
    </div>
</template>
