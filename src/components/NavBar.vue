<script setup>
import { RouterLink, RouterView, useRouter} from 'vue-router'
import { useUserStore } from '../stores/user'
const user = useUserStore()
const router = useRouter();

const resetear = () => {
  user.estaLogueado = false
  user.$reset
  router.push("/")
}
</script>

<template>
  <div class="wrapper">
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <RouterLink v-if="!user.estaLogueado" to="/">Turnerapp</RouterLink>
            <RouterLink v-if="user.estaLogueado && user.esPaciente" to="/homePaciente">Turnerapp</RouterLink>
            <RouterLink v-if="user.estaLogueado && !user.esPaciente" to="/homeMedico">Turnerapp</RouterLink>
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
            </ul>

            <RouterLink v-if="!user.estaLogueado" to="/login"><button class="btn btn-outline-success">Login</button></RouterLink>
            <h4 v-if="user.estaLogueado">{{ user.nombreUsuario }}</h4>
            <button @click="resetear()" v-if="user.estaLogueado" id="btn-logout" class="btn btn-outline-danger">Logout</button>
          </div>
        </div>
      </nav>
    </div>
</template>

<style>

a {
  display: block;
  text-align: center;
  margin-top: 20px;
  color: #496c74;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>