<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user'
const user = useUserStore()
let mail = ref("")
let contrasena = ref("")

const validarInfo = () => {
  if (mail.value == "" && contrasena.value == "") {
    alert("Usuario y Contraseña deben estar completos!")
    mail = ""
    contrasena = ""
  } else {
    user.login(mail.value, contrasena.value)
  }
}

</script>

<template>
  <main>
    <form @submit.prevent="validarInfo()">
      <div class="col-md-6">
        <label for="inputEmail4" class="form-label">Email</label>
        <input type="email" class="form-control" id="inputEmail4" v-model="mail">
      </div>
      <div class="col-md-6">
        <label for="inputPassword4" class="form-label">Contraseña</label>
        <input type="password" class="form-control" id="inputPassword4" v-model="contrasena">
      </div>
      <div class="col-12">
        <button class="btn btn-primary">Ingresar</button>
      </div>
    </form>
  </main>
</template>
